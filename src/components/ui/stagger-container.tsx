'use client'

import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerChildren?: number
  delayChildren?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function StaggerContainer({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
  direction = 'up',
  distance = 30
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  // During SSR or before mount, render without animation but still visible
  if (!isMounted) {
    return (
      <div className={className} style={{ opacity: 1 }}>
        {React.Children.map(children, (child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    )
  }

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  }

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
        duration: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction]
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0
    }
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="visible"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div 
          key={index} 
          variants={itemVariants}
          initial="visible"
          animate="visible"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
