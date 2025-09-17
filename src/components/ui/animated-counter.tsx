'use client'

import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  formatNumber?: (num: number) => string
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  className,
  prefix = '',
  suffix = '',
  formatNumber = (num) => Math.round(num).toLocaleString()
}: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion()
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => formatNumber(latest))

  useEffect(() => {
    if (shouldReduceMotion) {
      count.set(to)
      return
    }

    const controls = animate(count, to, {
      duration,
      ease: "easeOut"
    })

    return controls.stop
  }, [count, to, duration, shouldReduceMotion])

  return (
    <motion.span className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  )
}
