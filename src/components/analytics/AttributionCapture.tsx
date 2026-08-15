'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { captureAttribution } from '@/lib/tracking'

/**
 * Records utm_* / fbclid / gclid on first landing so a lead submitted several
 * pages later still carries the campaign that produced it.
 */
export function AttributionCapture() {
  const searchParams = useSearchParams()

  useEffect(() => {
    captureAttribution(searchParams.toString())
  }, [searchParams])

  return null
}
