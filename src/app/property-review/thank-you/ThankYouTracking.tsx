'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackLead } from '@/lib/tracking'

/**
 * Fires the lead conversion once the confirmation page is actually reached.
 *
 * Firing here rather than on form submit means the event only counts a
 * genuinely completed submission, and gives you a URL-based conversion to
 * configure in Meta Ads Manager and GA4 without touching code again.
 */
export function ThankYouTracking() {
  const searchParams = useSearchParams()
  const fired = useRef(false)

  useEffect(() => {
    // React 18 Strict Mode double-invokes effects in development; without this
    // guard the conversion would be counted twice.
    if (fired.current) return
    fired.current = true

    trackLead({
      formName: 'property_review',
      suburb: searchParams.get('suburb') ?? undefined,
      portfolioSize: searchParams.get('size') ?? undefined,
    })
  }, [searchParams])

  return null
}
