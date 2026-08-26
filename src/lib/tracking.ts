/**
 * One place to fire conversions, so Meta and GA4 can never drift apart.
 *
 * Every call is a no-op when the corresponding tag is absent, which is the
 * normal state locally and on preview deploys.
 */

type Fbq = (...args: unknown[]) => void
type Gtag = (...args: unknown[]) => void

// The pixel/tag scripts load `afterInteractive`, so on a fresh page load they
// are usually NOT there yet when a mount-time conversion fires (e.g. the
// thank-you page's Lead). Retry briefly instead of silently dropping the
// event; give up after ~5s, which means the tag genuinely isn't installed.
function withRetry(getFn: () => Fbq | undefined, args: unknown[]): void {
  if (typeof window === 'undefined') return
  let attempts = 0
  const attempt = () => {
    const fn = getFn()
    if (fn) {
      fn(...args)
      return
    }
    if (attempts++ < 20) setTimeout(attempt, 250)
  }
  attempt()
}

function fbq(...args: unknown[]): void {
  withRetry(() => {
    const fn = (window as unknown as { fbq?: Fbq }).fbq
    return typeof fn === 'function' ? fn : undefined
  }, args)
}

function gtag(...args: unknown[]): void {
  withRetry(() => {
    const fn = (window as unknown as { gtag?: Gtag }).gtag
    return typeof fn === 'function' ? fn : undefined
  }, args)
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

const MATCH_KEY = 'tw_match'

/**
 * Manual advanced matching: attach the visitor's contact details to the
 * pixel so Meta can match events to accounts (this is what lifts Event Match
 * Quality). Meta's automatic matching only scrapes fields present on the page
 * when an event fires — useless for conversions fired on the thank-you page —
 * so forms call this at submit time. fbevents.js normalises and SHA-256
 * hashes the values in the browser; plain text never leaves the page.
 *
 * Persisted for the session so a full page load between submit and the
 * conversion firing (e.g. the thank-you page) re-initialises with the same
 * match data — see MetaPixel's init.
 */
export function setAdvancedMatching(detail: {
  name?: string
  email?: string
  phone?: string
}): void {
  if (!PIXEL_ID || typeof window === 'undefined') return

  const match: Record<string, string> = {}
  const email = detail.email?.trim().toLowerCase()
  if (email) match.em = email
  const digits = (detail.phone ?? '').replace(/\D/g, '')
  if (digits) {
    // Meta expects digits with country code: 0413… → 61413…
    match.ph = digits.startsWith('0') ? `61${digits.slice(1)}` : digits
  }
  const nameParts = (detail.name ?? '').trim().toLowerCase().split(/\s+/)
  if (nameParts[0]) match.fn = nameParts[0]
  if (nameParts.length > 1) match.ln = nameParts[nameParts.length - 1]
  if (Object.keys(match).length === 0) return

  try {
    window.sessionStorage.setItem(MATCH_KEY, JSON.stringify(match))
  } catch {
    // sessionStorage can throw in private modes — matching is best-effort.
  }

  // Re-init with user data is Meta's documented way to add matching after
  // the pixel has loaded; the "duplicate pixel ID" console warning is benign.
  fbq('init', PIXEL_ID, match)
}

/** UTM / click-id keys worth persisting so a lead can be traced to its ad. */
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const

const STORAGE_KEY = 'tw_attribution'

/**
 * Capture attribution params on first landing and keep them for the session.
 * Without this, a visitor who lands on an ad URL then navigates before
 * converting arrives at the form with no campaign data attached.
 */
export function captureAttribution(search: string): void {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(search)
    const found: Record<string, string> = {}
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key)
      if (value) found[key] = value
    }
    if (Object.keys(found).length === 0) return

    const existing = readAttribution()
    // First touch wins — don't let an internal navigation overwrite the ad
    // that actually brought this person in.
    if (Object.keys(existing).length > 0) return

    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...found, landing_page: window.location.pathname })
    )
  } catch {
    // sessionStorage can throw in private modes — attribution is best-effort.
  }
}

export function readAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

/** Flatten attribution into a single field for the Google Sheets lead row. */
export function attributionSummary(): string {
  const data = readAttribution()
  const entries = Object.entries(data)
  if (entries.length === 0) return 'direct/organic'
  return entries.map(([k, v]) => `${k}=${v}`).join(' | ')
}

/**
 * A funnel landing page was viewed. Meta's standard `ViewContent` gives the
 * campaign a mid-funnel signal between `PageView` and `Lead` — enough volume
 * to sanity-check that traffic is reaching the page even while leads are rare.
 */
export function trackViewContent(detail: {
  contentName: string
  contentCategory?: string
}): void {
  fbq('track', 'ViewContent', {
    content_name: detail.contentName,
    ...(detail.contentCategory
      ? { content_category: detail.contentCategory }
      : {}),
  })

  gtag('event', 'view_item', { item_name: detail.contentName })
}

/**
 * A completed lead form. Fires Meta's standard `Lead` event and GA4's
 * `generate_lead` so both platforms can optimise against the same action.
 */
export function trackLead(detail: {
  formName: string
  suburb?: string
  portfolioSize?: string
  /** Landing-page variant, e.g. 'switch-500'. Defaults to the vertical. */
  variant?: string
}): void {
  fbq('track', 'Lead', {
    content_name: detail.formName,
    content_category: detail.variant ?? 'property_management',
    ...(detail.suburb ? { suburb: detail.suburb } : {}),
  })

  gtag('event', 'generate_lead', {
    form_name: detail.formName,
    suburb: detail.suburb,
    portfolio_size: detail.portfolioSize,
  })
}

/**
 * A confirmed appointment/inspection booking. Meta's standard `Schedule`
 * event — kept separate from `Lead` so campaigns can optimise on either.
 */
export function trackSchedule(detail: {
  formName: string
  appointmentType?: string
}): void {
  fbq('track', 'Schedule', {
    content_name: detail.formName,
    ...(detail.appointmentType
      ? { content_category: detail.appointmentType }
      : {}),
  })

  gtag('event', 'schedule_appointment', {
    form_name: detail.formName,
    appointment_type: detail.appointmentType,
  })
}

/** Someone started filling the form — the top of the conversion funnel. */
export function trackLeadStart(formName: string): void {
  fbq('trackCustom', 'LeadFormStart', { content_name: formName })
  gtag('event', 'form_start', { form_name: formName })
}

/** A click on a phone number. For a service business these are real leads. */
export function trackCall(location: string): void {
  fbq('track', 'Contact', { content_name: location })
  gtag('event', 'click_to_call', { location })
}
