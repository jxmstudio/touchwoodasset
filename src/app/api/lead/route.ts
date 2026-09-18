import { NextRequest, NextResponse } from 'next/server'
import { submitToJxmForms } from '@/lib/jxm-forms'
import { forwardToSheets } from '@/lib/sheets-server'
import { auMobileToE164, formatAuMobile, isFullName } from '@/lib/phone'
import {
  checkVerification,
  isDevCodeMode,
  isVerifyConfigured,
  type VerifyErrorCode,
} from '@/lib/phone-verify'
import { clientIpFrom, rateLimitAllow } from '@/lib/rate-limit'

/**
 * Step 2 of the verified-lead flow: confirm the SMS code, then record the
 * lead in JXM Forms (lead of record) and the Google Sheet (ops view), stamped
 * with the verification outcome.
 *
 * The stamp is written HERE, on the server, in the same request that checked
 * the code with Twilio. The browser never gets to claim a number is verified,
 * which is what makes "Phone verified: YES" on a lead defensible when the
 * client questions it.
 *
 * Body: { variant, name, phone, suburb, code, attribution?, _gotcha? }
 * 200 { ok: true }
 * 4xx/5xx { ok: false, code: VerifyErrorCode | 'invalid_input' | 'lead_failed' }
 */

type Variant = 'appraisal' | 'switch'

// Labels live server-side so a client can't relabel a lead. Mirrors the
// COPY table in ReviewForm.tsx.
const FORMS: Record<
  Variant,
  { jxmForm: string; sheetType: string; describe: (suburb: string) => string }
> = {
  appraisal: {
    jxmForm: 'property-review',
    sheetType: 'property-review',
    describe: (suburb) =>
      `Free rental appraisal requested via /property-review. Suburb: ${suburb}.`,
  },
  switch: {
    jxmForm: 'switch-500',
    sheetType: 'property-review',
    describe: (suburb) =>
      `$500 switch offer claimed via /switch. Suburb: ${suburb}.`,
  },
}

const HTTP_STATUS: Record<VerifyErrorCode, number> = {
  invalid_number: 400,
  not_sms_capable: 400,
  wrong_code: 400,
  expired: 400,
  too_many_sends: 429,
  too_many_attempts: 429,
  blocked: 403,
  provider_error: 502,
}

const TEN_MINUTES = 10 * 60 * 1000

function melbourneTime(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Melbourne',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(date)
}

function clean(value: unknown, max = 200): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_input' },
      { status: 400 }
    )
  }

  // Honeypot filled → a bot. Pretend it worked.
  if (clean(body._gotcha) !== '') {
    return NextResponse.json({ ok: true })
  }

  const variant = body.variant as Variant
  const form = FORMS[variant]
  const name = clean(body.name, 120)
  const suburb = clean(body.suburb, 80)
  const code = clean(body.code, 10)
  const attribution = clean(body.attribution, 500) || 'direct/organic'
  const phoneDisplay = formatAuMobile(clean(body.phone, 40))
  const e164 = auMobileToE164(clean(body.phone, 40))

  if (!form || !isFullName(name) || suburb.length < 2 || !phoneDisplay || !e164) {
    return NextResponse.json(
      { ok: false, code: 'invalid_input' },
      { status: 400 }
    )
  }

  const ip = clientIpFrom(request.headers)
  if (!rateLimitAllow(`lead:ip:${ip}`, 20, TEN_MINUTES)) {
    return NextResponse.json(
      { ok: false, code: 'too_many_attempts' },
      { status: 429 }
    )
  }

  // ---- 1. Confirm the code -------------------------------------------------
  let phoneVerified: string
  let verificationId = ''
  const now = new Date()

  if (isVerifyConfigured() || isDevCodeMode()) {
    if (!code) {
      return NextResponse.json(
        { ok: false, code: 'wrong_code' },
        { status: 400 }
      )
    }
    const check = await checkVerification(e164, code)
    if (!check.ok) {
      return NextResponse.json(
        { ok: false, code: check.code },
        { status: HTTP_STATUS[check.code] }
      )
    }
    verificationId = check.sid
    phoneVerified = check.dev
      ? `YES — DEV CODE, no real SMS was sent (${melbourneTime(now)})`
      : `YES — SMS code confirmed ${melbourneTime(now)} (Twilio ${check.sid})`
  } else {
    // Production without Twilio credentials. Take the lead rather than lose
    // it, but say loudly on the record that the number was NOT verified.
    console.error(
      '[lead] TWILIO_* env vars missing in production — lead recorded UNVERIFIED'
    )
    phoneVerified = 'NO — SMS verification is not configured on the server'
  }

  // ---- 2. Record the lead ----------------------------------------------------
  const message = `${form.describe(suburb)} Source: ${attribution}. Phone verified: ${phoneVerified}`
  const timestamp = now.toISOString()

  const dryRun =
    process.env.NODE_ENV !== 'production' && process.env.LEAD_DRY_RUN === '1'

  const [jxm, sheet] = await Promise.all([
    dryRun
      ? Promise.resolve({ success: true as const })
      : submitToJxmForms({
          _form: form.jxmForm,
          name,
          phone: phoneDisplay,
          suburb,
          message,
          phone_verified: phoneVerified,
          verified_at: verificationId ? timestamp : '',
          verification_id: verificationId,
          _gotcha: '',
        }),
    forwardToSheets({
      type: form.sheetType,
      timestamp,
      name,
      phone: phoneDisplay,
      message,
      phoneVerified,
      verifiedAt: verificationId ? timestamp : '',
      verificationId,
    }).catch((error: unknown) => {
      console.error('Sheets forward threw:', error)
      return { success: false as const }
    }),
  ])

  if (dryRun) {
    console.warn('[lead] LEAD_DRY_RUN=1 — not forwarded to JXM Forms:', {
      form: form.jxmForm,
      name,
      phone: phoneDisplay,
      suburb,
      message,
    })
  }

  // JXM is the lead of record and decides success; a sheet hiccup is logged
  // but must never cost the lead or show the visitor an error.
  if (!jxm.success) {
    console.error('JXM Forms rejected verified lead:', jxm.error)
    return NextResponse.json(
      { ok: false, code: 'lead_failed' },
      { status: 502 }
    )
  }
  if (!sheet.success) {
    console.error('Lead saved to JXM Forms but the Google Sheet row failed')
  }

  return NextResponse.json({ ok: true })
}
