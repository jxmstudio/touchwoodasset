'use client'

import { useEffect, useRef } from 'react'
import { trackViewContent } from '@/lib/tracking'

/**
 * Fires Meta `ViewContent` once when a funnel landing page mounts. Rendered
 * by the page itself (not the layout) so only designated funnel routes emit
 * the event.
 */
export function ViewContentTracker({
  contentName,
  contentCategory,
}: {
  contentName: string
  contentCategory?: string
}) {
  const fired = useRef(false)

  useEffect(() => {
    // Strict Mode double-invokes effects in development; fire only once.
    if (fired.current) return
    fired.current = true
    trackViewContent({ contentName, contentCategory })
  }, [contentName, contentCategory])

  return null
}
