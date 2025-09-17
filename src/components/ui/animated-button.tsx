'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Button, buttonVariants } from '@/components/ui/button'
import { ReactNode } from 'react'
import { VariantProps } from 'class-variance-authority'

interface AnimatedButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: ReactNode
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  whileHover?: object
  whileTap?: object
}

export function AnimatedButton({
  children,
  loading = false,
  loadingText = 'Loading...',
  whileHover,
  whileTap,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <Button disabled={disabled || loading} {...props}>
        {loading ? loadingText : children}
      </Button>
    )
  }

  const defaultHover = {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  }

  const defaultTap = {
    scale: 0.98,
    transition: { duration: 0.1 }
  }

  return (
    <motion.div
      whileHover={disabled || loading ? undefined : (whileHover || defaultHover)}
      whileTap={disabled || loading ? undefined : (whileTap || defaultTap)}
    >
      <Button disabled={disabled || loading} {...props}>
        {loading && (
          <motion.div
            className="mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          </motion.div>
        )}
        {loading ? loadingText : children}
      </Button>
    </motion.div>
  )
}

// Pulse animation for CTA buttons  
export function PulseButton({ children, ...props }: AnimatedButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <Button {...props}>{children}</Button>
  }

  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <AnimatedButton {...props}>
        {children}
      </AnimatedButton>
    </motion.div>
  )
}
