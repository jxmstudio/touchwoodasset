'use client'

import { usePathname } from 'next/navigation'

/**
 * Standalone landing pages deliberately drop the site nav and footer so the
 * only exit from the page is the lead form. Wrap shared chrome in this.
 */
const FUNNEL_ROUTES = ['/property-review', '/switch']

export function isFunnelRoute(pathname: string | null): boolean {
  return FUNNEL_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  )
}

export function HideOnFunnel({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFunnel = isFunnelRoute(pathname)

  if (isFunnel) return null
  return <>{children}</>
}
