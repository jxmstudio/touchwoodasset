'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Spinner component
export function Spinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  if (shouldReduceMotion) {
    return <div className={`${sizes[size]} border-2 border-current border-t-transparent rounded-full ${className}`} />
  }

  return (
    <motion.div
      className={`${sizes[size]} border-2 border-current border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}

// Skeleton loaders
export function Skeleton({ className = '', width, height }: { className?: string, width?: string, height?: string }) {
  const shouldReduceMotion = useReducedMotion()

  const style = {
    width: width || '100%',
    height: height || '1rem'
  }

  if (shouldReduceMotion) {
    return <div className={`bg-gray-200 rounded ${className}`} style={style} />
  }

  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      style={style}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Property card skeleton
export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 min-w-[300px] shadow-lg rounded-lg">
      <Skeleton height="200px" className="rounded-t-lg rounded-b-none" />
      <div className="p-6">
        <Skeleton height="1.5rem" className="mb-4" width="80%" />
        <Skeleton height="1rem" className="mb-2" width="60%" />
        <Skeleton height="1rem" className="mb-4" width="40%" />
        <div className="flex justify-between items-center mb-4">
          <Skeleton height="2rem" width="60%" />
          <Skeleton height="1rem" width="20%" />
        </div>
        <div className="flex space-x-4 mb-4">
          <Skeleton height="1rem" width="15%" />
          <Skeleton height="1rem" width="15%" />
          <Skeleton height="1rem" width="15%" />
        </div>
        <Skeleton height="2.5rem" />
      </div>
    </div>
  )
}

// Dots animation
export function LoadingDots({ className = '' }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className={`flex space-x-1 ${className}`}>
        <div className="w-2 h-2 bg-current rounded-full" />
        <div className="w-2 h-2 bg-current rounded-full" />
        <div className="w-2 h-2 bg-current rounded-full" />
      </div>
    )
  }

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-current rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Page loading overlay
export function PageLoader() {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Spinner size="lg" className="text-primary mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </motion.div>
    </motion.div>
  )
}
