'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface HeroCardProps {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  ctaText: string
  ctaLink: string
  className?: string
  priority?: boolean
}

export function HeroCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  ctaText,
  ctaLink,
  className = '',
  priority = false
}: HeroCardProps) {
  return (
    <motion.div
      className={`relative group overflow-hidden rounded-lg ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        
        {/* High Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-white/90 mb-6 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
            
            <Button
              asChild
              size="sm"
              className="bg-white text-black hover:bg-white/90 font-medium px-6 py-2 h-auto group/btn transition-all duration-300"
            >
              <Link href={ctaLink} className="flex items-center gap-2">
                {ctaText}
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
