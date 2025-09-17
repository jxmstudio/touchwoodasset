import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  containerClassName?: string
}

export function Section({ 
  children, 
  title, 
  subtitle, 
  className, 
  containerClassName 
}: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className={cn("container mx-auto max-w-7xl px-4 md:px-6", containerClassName)}>
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}