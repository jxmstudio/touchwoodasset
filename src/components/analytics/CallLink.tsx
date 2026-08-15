'use client'

import { CONTACT } from '@/lib/site'
import { trackCall } from '@/lib/tracking'

/**
 * Phone link that reports a `Contact` conversion. For a service business,
 * click-to-call is a real lead and needs to be optimisable in Meta alongside
 * form submissions.
 */
export function CallLink({
  location,
  className,
  children,
}: {
  location: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={`tel:${CONTACT.phone}`}
      className={className}
      onClick={() => trackCall(location)}
    >
      {children}
    </a>
  )
}
