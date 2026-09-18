/**
 * Best-effort in-memory rate limiter for the SMS verification endpoints.
 *
 * On Vercel each serverless instance has its own memory, so this is a
 * per-instance limit — it stops a single hot loop hammering one instance,
 * not a distributed attack. The hard limits live at Twilio: Verify caps sends
 * at 5 per number per 10 minutes and checks at 5 per verification, and Fraud
 * Guard blocks SMS-pumping patterns account-wide. This layer exists so a
 * misbehaving client burns as little Twilio credit as possible before Twilio
 * itself says no.
 */

const buckets = new Map<string, number[]>()

// Keep the map from growing without bound on long-lived instances.
const MAX_KEYS = 5000

export function rateLimitAllow(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now()
  const cutoff = now - windowMs
  const hits = (buckets.get(key) ?? []).filter((t) => t > cutoff)
  if (hits.length >= limit) {
    buckets.set(key, hits)
    return false
  }
  hits.push(now)
  buckets.set(key, hits)
  if (buckets.size > MAX_KEYS) {
    // Drop the oldest-inserted entry; Map preserves insertion order.
    const first = buckets.keys().next().value
    if (first !== undefined) buckets.delete(first)
  }
  return true
}

/** Client IP as seen behind Vercel's proxy, or 'unknown'. */
export function clientIpFrom(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  )
}
