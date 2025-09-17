'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverCardProps {
  children: ReactNode
  className?: string
  scale?: number
  y?: number
  duration?: number
  rotateOnHover?: boolean
}

export function HoverCard({
  children,
  className,
  scale = 1.03,
  y = -8,
  duration = 0.2,
  rotateOnHover = false
}: HoverCardProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        y,
        rotate: rotateOnHover ? 1 : 0,
        transition: { duration, ease: "easeOut" }
      }}
      whileTap={{
        scale: scale * 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  )
}

// Specialized version for property cards
export function PropertyCardHover({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileHover={{
        y: -8,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  )
}
