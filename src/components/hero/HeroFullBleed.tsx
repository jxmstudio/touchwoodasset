'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface CTAButton {
  text: string
  href: string
  icon?: React.ReactNode
}

interface HeroFullBleedProps {
  imageSrc: string
  imageAlt: string
  headline: string
  subhead: string
  primaryCta: CTAButton
  secondaryCta: CTAButton
  className?: string
}

export function HeroFullBleed({
  imageSrc,
  imageAlt,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  className = ''
}: HeroFullBleedProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className={`relative w-full min-h-[56vh] md:min-h-[68vh] overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          suppressHydrationWarning
        />
      </div>

      {/* Subtle dark overlay for text legibility - much lighter like Ray White */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[56vh] md:min-h-[68vh]">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            variants={containerVariants}
            initial="visible"
            animate="visible"
          >
            {/* Headline - Ray White style */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight tracking-wide text-white"
              variants={itemVariants}
              style={{ fontFamily: 'serif' }}
            >
              {headline}
            </motion.h1>

            {/* Subheading - Ray White style */}
            <motion.p
              className="text-sm md:text-base lg:text-lg mb-16 text-white/95 max-w-4xl mx-auto leading-relaxed font-normal uppercase tracking-widest"
              variants={itemVariants}
            >
              {subhead}
            </motion.p>

            {/* CTA Buttons - Hidden for Ray White minimal style */}
            {/* <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-brand-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg px-8 py-4 h-auto"
              >
                <a href={primaryCta.href}>
                  {primaryCta.icon}
                  {primaryCta.text}
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white hover:text-foreground border-2 border-white/70 hover:border-white text-base md:text-lg px-8 py-4 h-auto backdrop-blur-sm"
              >
                <a href={secondaryCta.href}>
                  {secondaryCta.icon}
                  {secondaryCta.text}
                </a>
              </Button>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
