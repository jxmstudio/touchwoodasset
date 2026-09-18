/**
 * SMS one-time-code verification via Twilio Verify. Server-only.
 *
 * Why Twilio Verify rather than sending our own codes: it generates, stores
 * and expires the code (10 minutes), rate-limits per number (5 sends / 10
 * min, 5 wrong guesses per code), runs Fraud Guard against SMS-pumping
 * attacks, and handles Australian sender-ID compliance from a shared pool —
 * no sender registration, no database table of codes on our side.
 *
 * Talks to the REST API directly with fetch: the `twilio` npm package is
 * large and this needs exactly two endpoints.
 *
 * Configuration (all three required, see .env.example):
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID
 *
 * Without them, development accepts PHONE_VERIFY_DEV_CODE (default 000000)
 * and logs the fact; production skips verification and stamps the lead as
 * UNVERIFIED so a missing env var costs verification, never the lead itself
 * — the lead email and sheet row make the gap impossible to miss.
 */

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID
const DEV_CODE = process.env.PHONE_VERIFY_DEV_CODE || '000000'

const VERIFY_URL = `https://verify.twilio.com/v2/Services/${SERVICE_SID}`

export function isVerifyConfigured(): boolean {
  return Boolean(ACCOUNT_SID && AUTH_TOKEN && SERVICE_SID)
}

/** Dev fallback is only ever active outside production. */
export function isDevCodeMode(): boolean {
  return !isVerifyConfigured() && process.env.NODE_ENV !== 'production'
}

/**
 * Stable, user-safe error codes. The form maps these to copy; the raw Twilio
 * message is logged server-side only.
 */
export type VerifyErrorCode =
  | 'invalid_number' // Twilio rejected the number itself
  | 'not_sms_capable' // landline / VoIP that cannot receive SMS
  | 'too_many_sends' // 5 codes to this number inside 10 minutes
  | 'too_many_attempts' // 5 wrong guesses — must request a new code
  | 'expired' // code older than 10 minutes, or never sent
  | 'wrong_code'
  | 'blocked' // Fraud Guard / geo permissions
  | 'provider_error' // Twilio 5xx, network, unexpected shape

export type StartResult =
  | { ok: true; sid: string; dev?: true }
  | { ok: false; code: VerifyErrorCode }

export type CheckResult =
  | { ok: true; sid: string; dev?: true }
  | { ok: false; code: VerifyErrorCode }

async function twilioPost(
  path: 'Verifications' | 'VerificationCheck',
  params: Record<string, string>
): Promise<{ status: number; body: Record<string, unknown> }> {
  const auth = Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64')
  const response = await fetch(`${VERIFY_URL}/${path}`, {
    method: 'POST',
    headers: {
      authorization: `Basic ${auth}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params).toString(),
  })
  const body = (await response.json().catch(() => ({}))) as Record<
    string,
    unknown
  >
  return { status: response.status, body }
}

/** Map Twilio's numeric error codes to ours. Unknown codes → provider_error. */
function mapTwilioError(
  status: number,
  body: Record<string, unknown>
): VerifyErrorCode {
  const code = typeof body.code === 'number' ? body.code : undefined
  switch (code) {
    case 60200: // Invalid parameter (almost always `To`)
    case 21211: // Invalid 'To' phone number
      return 'invalid_number'
    case 60205: // SMS is not supported by landline phone number
      return 'not_sms_capable'
    case 60203: // Max send attempts reached
      return 'too_many_sends'
    case 60202: // Max check attempts reached
      return 'too_many_attempts'
    case 20404: // Resource not found — verification expired or never started
      return 'expired'
    case 60410: // Verification delivery attempt blocked (Fraud Guard)
    case 60605: // Verification delivery attempt blocked (geo permissions)
    case 60220: // Phone number blocked
      return 'blocked'
    default:
      console.error('Twilio Verify unexpected response', status, body)
      return 'provider_error'
  }
}

/** Send a 6-digit code by SMS to an E.164 number (+614…). */
export async function startVerification(e164: string): Promise<StartResult> {
  if (isDevCodeMode()) {
    console.warn(
      `[phone-verify] Twilio not configured — DEV MODE. Code for ${e164} is ${DEV_CODE}`
    )
    return { ok: true, sid: 'VE_dev', dev: true }
  }
  if (!isVerifyConfigured()) {
    return { ok: false, code: 'provider_error' }
  }

  try {
    const { status, body } = await twilioPost('Verifications', {
      To: e164,
      Channel: 'sms',
    })
    if (status === 201 && typeof body.sid === 'string') {
      return { ok: true, sid: body.sid }
    }
    return { ok: false, code: mapTwilioError(status, body) }
  } catch (error) {
    console.error('Twilio Verify start failed:', error)
    return { ok: false, code: 'provider_error' }
  }
}

/** Check the code the visitor typed against the pending verification. */
export async function checkVerification(
  e164: string,
  code: string
): Promise<CheckResult> {
  if (!/^\d{4,10}$/.test(code)) return { ok: false, code: 'wrong_code' }

  if (isDevCodeMode()) {
    return code === DEV_CODE
      ? { ok: true, sid: 'VE_dev', dev: true }
      : { ok: false, code: 'wrong_code' }
  }
  if (!isVerifyConfigured()) {
    return { ok: false, code: 'provider_error' }
  }

  try {
    const { status, body } = await twilioPost('VerificationCheck', {
      To: e164,
      Code: code,
    })
    if (status === 200) {
      // A wrong code is NOT an error to Twilio: it answers 200 with
      // status 'pending'. Only 'approved' counts.
      if (body.status === 'approved' && typeof body.sid === 'string') {
        return { ok: true, sid: body.sid }
      }
      return { ok: false, code: 'wrong_code' }
    }
    return { ok: false, code: mapTwilioError(status, body) }
  } catch (error) {
    console.error('Twilio Verify check failed:', error)
    return { ok: false, code: 'provider_error' }
  }
}
