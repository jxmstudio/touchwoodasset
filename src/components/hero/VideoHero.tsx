'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface VideoHeroProps {
  videoSrc: string
  posterImage?: string
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  overlay?: boolean
  className?: string
}

export function VideoHero({
  videoSrc,
  posterImage,
  title,
  subtitle,
  description,
  ctaText = "Learn More",
  ctaLink = "#",
  autoPlay = true,
  loop = true,
  muted = true,
  overlay = true,
  className = ""
}: VideoHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Ensure we're on the client side before setting initial state
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleVideoLoad = () => {
    setIsLoaded(true)
  }

  // Don't render video until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <section className={`relative w-full min-h-screen overflow-hidden ${className}`} suppressHydrationWarning>
        {/* Fallback poster image */}
        {posterImage && (
          <div className="absolute inset-0">
            <img
              src={posterImage}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        )}
        
        {/* Overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-black/40" />
        )}

        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              {subtitle && (
                <p className="text-lg md:text-xl text-white/90 mb-4 uppercase tracking-wider font-medium">
                  {subtitle}
                </p>
              )}

              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-wide"
                style={{ fontFamily: 'serif' }}
              >
                {title}
              </h1>

              {description && (
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium"
                  asChild
                >
                  <a href={ctaLink}>{ctaText}</a>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium"
                  asChild
                >
                  <a href="/contact">Get In Touch</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`relative w-full min-h-screen overflow-hidden ${className}`} suppressHydrationWarning>
      {/* Background Video or Poster Image */}
      <div className="absolute inset-0">
        {!prefersReducedMotion && isClient ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={autoPlay && !prefersReducedMotion}
            loop={loop}
            muted={true}
            playsInline
            preload="metadata"
            aria-hidden="true"
            poster={posterImage}
            onLoadedData={handleVideoLoad}
            onError={() => {
              console.warn('Video failed to load, falling back to poster image')
              setIsLoaded(false)
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          /* Fallback to poster image for reduced motion or when video fails */
          posterImage && (
            <img
              src={posterImage}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )
        )}
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Controls removed per requirement: no pause or volume UI */}

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.5 }}
          >
            {subtitle && (
              <motion.p
                className="text-lg md:text-xl text-white/90 mb-4 uppercase tracking-wider font-medium"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.7 }}
              >
                {subtitle}
              </motion.p>
            )}

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-wide"
              style={{ fontFamily: 'serif' }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.9 }}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 1.1 }}
              >
                {description}
              </motion.p>
            )}

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 1.3 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium"
                asChild
              >
                <a href={ctaLink}>{ctaText}</a>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium"
                asChild
              >
                <a href="/contact">Get In Touch</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={shouldReduceMotion ? false : { y: [0, 10, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={shouldReduceMotion ? false : { y: [0, 6, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
