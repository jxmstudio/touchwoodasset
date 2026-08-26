import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

/**
 * Meta Conversions API relay.
 *
 * The browser fires each conversion twice: once through the pixel (with
 * `eventID`) and once through this route (with the same `event_id`), and Meta
 * deduplicates the pair. The server copy survives ad blockers and iOS
 * tracking prevention, which is the whole point of CAPI.
 *
 * Contact details arrive raw and are SHA-256 hashed here, per Meta's spec —
 * plain text never reaches Meta. Requires META_CAPI_ACCESS_TOKEN (a system
 * user token generated in Events Manager → Settings → Conversions API);
 * without it the route no-ops so local/preview environments send nothing.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const GRAPH_URL = 'https://graph.facebook.com/v21.0'

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** Normalise + hash per Meta's customer-information-parameter rules. */
function hashUserData(user: {
  name?: string
  email?: string
  phone?: string
}): Record<string, string[]> {
  const out: Record<string, string[]> = {}

  const email = user.email?.trim().toLowerCase()
  if (email) out.em = [sha256(email)]

  const digits = (user.phone ?? '').replace(/\D/g, '')
  if (digits) {
    // Meta expects digits with country code: 0413… → 61413…
    out.ph = [sha256(digits.startsWith('0') ? `61${digits.slice(1)}` : digits)]
  }

  const nameParts = (user.name ?? '').trim().toLowerCase().split(/\s+/)
  if (nameParts[0]) out.fn = [sha256(nameParts[0])]
  if (nameParts.length > 1) out.ln = [sha256(nameParts[nameParts.length - 1])]

  return out
}

export async function POST(request: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    // Not an error: CAPI simply isn't configured in this environment.
    return NextResponse.json({ disabled: true })
  }

  try {
    const body = await request.json()
    const { event_name, event_id, event_source_url, custom_data } = body
    if (typeof event_name !== 'string' || typeof event_id !== 'string') {
      return NextResponse.json(
        { error: 'event_name and event_id are required' },
        { status: 400 }
      )
    }

    // IP + UA are required for server events to count toward matching, and
    // only the server sees them reliably.
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      undefined
    const userAgent = request.headers.get('user-agent') ?? undefined

    const userData: Record<string, unknown> = {
      ...hashUserData(body.user ?? {}),
      ...(clientIp ? { client_ip_address: clientIp } : {}),
      ...(userAgent ? { client_user_agent: userAgent } : {}),
      // Browser cookies for matching — sent unhashed per spec.
      ...(typeof body.fbp === 'string' && body.fbp ? { fbp: body.fbp } : {}),
      ...(typeof body.fbc === 'string' && body.fbc ? { fbc: body.fbc } : {}),
    }

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          action_source: 'website',
          ...(typeof event_source_url === 'string' && event_source_url
            ? { event_source_url }
            : {}),
          user_data: userData,
          ...(custom_data && typeof custom_data === 'object'
            ? { custom_data }
            : {}),
        },
      ],
    }
    // Tags the event into Events Manager's Test Events stream. Browser sets
    // it from a ?test_event_code= URL param; never present in normal traffic.
    if (typeof body.test_event_code === 'string' && body.test_event_code) {
      payload.test_event_code = body.test_event_code
    }

    const response = await fetch(
      `${GRAPH_URL}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )
    const result = await response.json().catch(() => null)

    if (!response.ok) {
      // Log the real reason server-side; don't leak token/config details.
      console.error('Meta CAPI rejected event:', response.status, result)
      return NextResponse.json({ error: 'CAPI rejected event' }, { status: 502 })
    }

    return NextResponse.json({ success: true, events_received: result?.events_received })
  } catch (error) {
    console.error('Meta CAPI relay failed:', error)
    return NextResponse.json({ error: 'CAPI relay failed' }, { status: 500 })
  }
}
