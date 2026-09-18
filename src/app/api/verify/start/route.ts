import { NextRequest, NextResponse } from 'next/server'
import { auMobileToE164 } from '@/lib/phone'
import { startVerification, type VerifyErrorCode } from '@/lib/phone-verify'
import { clientIpFrom, rateLimitAllow } from '@/lib/rate-limit'

/**
 * Step 1 of the verified-lead flow: text a one-time code to the visitor's
 * mobile. Nothing is recorded yet — the lead only exists once /api/lead
 * confirms the code.
 *
 * Body: { phone: string, _gotcha?: string }
 * 200 { ok: true, dev?: true }
 * 4xx/5xx { ok: false, code: VerifyErrorCode }
 */

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

export async function POST(request: NextRequest) {
  let body: { phone?: unknown; _gotcha?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_number' },
      { status: 400 }
    )
  }

  // Honeypot filled → a bot. Pretend it worked; never spend an SMS on it.
  if (typeof body._gotcha === 'string' && body._gotcha.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const e164 =
    typeof body.phone === 'string' ? auMobileToE164(body.phone) : null
  if (!e164) {
    return NextResponse.json(
      { ok: false, code: 'invalid_number' },
      { status: 400 }
    )
  }

  // Twilio enforces 5 sends per number per 10 minutes; these local limits
  // just stop a hot loop reaching Twilio at all. See src/lib/rate-limit.ts
  // for why they are per-instance, not global.
  const ip = clientIpFrom(request.headers)
  if (
    !rateLimitAllow(`start:ip:${ip}`, 8, TEN_MINUTES) ||
    !rateLimitAllow(`start:phone:${e164}`, 5, TEN_MINUTES)
  ) {
    return NextResponse.json(
      { ok: false, code: 'too_many_sends' },
      { status: 429 }
    )
  }

  const result = await startVerification(e164)
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: result.code },
      { status: HTTP_STATUS[result.code] }
    )
  }
  return NextResponse.json({ ok: true, ...(result.dev ? { dev: true } : {}) })
}
