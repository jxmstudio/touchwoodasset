'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'

interface OwnerPromoProps {
  className?: string
  variant?: 'card' | 'strip'
}

export function OwnerPromo({
  className = '',
  variant = 'card',
}: OwnerPromoProps) {
  if (variant === 'strip') {
    return (
      <FadeIn>
        <section
          className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-50 to-white border border-brand-50/50 ${className}`}
        >
          {/* Subtle brand pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(225,38,43)_1px,transparent_0)] bg-[length:20px_20px]" />
          </div>

          <div className="relative px-6 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                  Have an additional property? Speak to us today.
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  $500 for new management transfers, plus $100 for storage and
                  carpark rentals.*
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide"
                >
                  <a
                    href="/landlords"
                    aria-label="Learn more about property management services"
                  >
                    Learn more
                  </a>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-primary/20 text-foreground hover:bg-primary/5 font-semibold tracking-wide"
                >
                  <a
                    href="/book"
                    aria-label="Book a consultation for property management"
                  >
                    Book consultation
                  </a>
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              *Terms apply. Limited-time offer.
            </p>
          </div>
        </section>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <Card
        className={`relative overflow-hidden shadow-soft-lg border-0 bg-white ${className}`}
      >
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0">
            {/* Content - Left Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
                  Have an additional property? Speak to us today.
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  $500 for new management transfers, plus $100 for storage and
                  carpark rentals.*
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide px-8 py-4 h-auto"
                  >
                    <a
                      href="/landlords"
                      aria-label="Learn more about property management services"
                    >
                      Learn more
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary/20 text-foreground hover:bg-primary/5 font-semibold tracking-wide px-8 py-4 h-auto"
                  >
                    <a
                      href="/book"
                      aria-label="Book a consultation for property management"
                    >
                      Book a consultation
                    </a>
                  </Button>
                </div>

                {/* Terms Note */}
                <p className="text-sm text-muted-foreground">
                  *Terms apply. Limited-time offer.
                </p>
              </motion.div>
            </div>

            {/* Image - Right Side (thumbnail accent) */}
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-brand-50/30 to-white/90">
              <div className="absolute inset-0 p-4 lg:p-8 hidden md:flex items-center justify-center">
                <div className="relative w-full h-full max-w-sm max-h-96 rounded-xl overflow-hidden bg-white ring-1 ring-gray-200 shadow-sm">
                  <Image
                    src="/lol.png"
                    alt="Touchwood mascot thumbnail"
                    fill
                    className="object-contain saturate-80 contrast-95 brightness-100"
                    sizes="(max-width: 1024px) 40vw, 24vw"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Brand accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-brand-600" />
        </CardContent>
      </Card>
    </FadeIn>
  )
}
