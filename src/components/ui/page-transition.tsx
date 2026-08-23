'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { isFunnelRoute } from '@/components/layout/HideOnFunnel'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  // Paid-traffic funnel pages skip the animation wrapper entirely: the
  // motion div re-styles itself at hydration, which repaints the hero and
  // pushes LCP out to whenever the JS bundle finishes on a 4G phone.
  if (shouldReduceMotion || isFunnelRoute(pathname)) {
    return <>{children}</>
  }

  return (
    // initial={false}: without it the server-rendered HTML carries
    // opacity:0 and the entire page stays invisible until the JS bundle
    // hydrates — ~4s of blank page on 4G mobile, fatal for ad traffic.
    // First paint renders visible; client-side navigations still animate.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Separate component for hero sections with more dramatic transitions
export function HeroTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      {children}
    </motion.div>
  )
}
