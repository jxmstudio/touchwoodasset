/**
 * One place to fire conversions, so Meta and GA4 can never drift apart.
 *
 * Every call is a no-op when the corresponding tag is absent, which is the
 * normal state locally and on preview deploys.
 */

type Fbq = (...args: unknown[]) => void
type Gtag = (...args: unknown[]) => void

function fbq(): Fbq | undefined {
  if (typeof window === 'undefined') return undefined
  const fn = (window as unknown as { fbq?: Fbq }).fbq
  return typeof fn === 'function' ? fn : undefined
}

function gtag(): Gtag | undefined {
  if (typeof window === 'undefined') return undefined
  const fn = (window as unknown as { gtag?: Gtag }).gtag
  return typeof fn === 'function' ? fn : undefined
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
 * A completed lead form. Fires Meta's standard `Lead` event and GA4's
 * `generate_lead` so both platforms can optimise against the same action.
 */
export function trackLead(detail: {
  formName: string
  suburb?: string
  portfolioSize?: string
}): void {
  fbq()?.('track', 'Lead', {
    content_name: detail.formName,
    content_category: 'property_management',
    ...(detail.suburb ? { suburb: detail.suburb } : {}),
  })

  gtag()?.('event', 'generate_lead', {
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
  fbq()?.('track', 'Schedule', {
    content_name: detail.formName,
    ...(detail.appointmentType
      ? { content_category: detail.appointmentType }
      : {}),
  })

  gtag()?.('event', 'schedule_appointment', {
    form_name: detail.formName,
    appointment_type: detail.appointmentType,
  })
}

/** Someone started filling the form — the top of the conversion funnel. */
export function trackLeadStart(formName: string): void {
  fbq()?.('trackCustom', 'LeadFormStart', { content_name: formName })
  gtag()?.('event', 'form_start', { form_name: formName })
}

/** A click on a phone number. For a service business these are real leads. */
export function trackCall(location: string): void {
  fbq()?.('track', 'Contact', { content_name: location })
  gtag()?.('event', 'click_to_call', { location })
}
