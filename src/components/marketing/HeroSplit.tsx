'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HeroCard } from './HeroCard'

interface HeroSplitProps {
  className?: string
}

const heroData = [
  {
    title: 'Parking',
    subtitle: 'Secure car park spaces in prime locations across Melbourne',
    imageSrc: '/hero/parking.jpg',
    imageAlt: 'Secure car park space with orange roller door',
    ctaText: 'View Parking',
    ctaLink: '/listings?category=car-park',
  },
  {
    title: 'Storage',
    subtitle: 'Convenient storage solutions for your belongings',
    imageSrc: '/storagerent.png',
    imageAlt: 'Clean storage unit facility',
    ctaText: 'View Storage',
    ctaLink: '/listings?category=storage-cage',
  },
  {
    title: 'Residential',
    subtitle: 'Houses, flats, and apartments for rent and sale',
    imageSrc: '/hero/residential.jpg',
    imageAlt: 'Modern residential property',
    ctaText: 'View Properties',
    ctaLink: '/listings?category=properties',
  },
]

export function HeroSplit({ className = '' }: HeroSplitProps) {
  return (
    <section className={`py-16 md:py-20 lg:py-24 bg-gray-50/50 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From residential rentals to commercial properties, storage, and
            carparks, we provide end-to-end management designed to maximise your
            returns and minimise your stress.
          </p>
        </motion.div>

        {/* Desktop: 3 equal columns */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {heroData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <HeroCard
                title={item.title}
                subtitle={item.subtitle}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                ctaText={item.ctaText}
                ctaLink={item.ctaLink}
                priority={index === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Tablet: 2 columns (Parking + Storage), Residential full-width below */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
          {heroData.slice(0, 2).map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <HeroCard
                title={item.title}
                subtitle={item.subtitle}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                ctaText={item.ctaText}
                ctaLink={item.ctaLink}
                priority={index === 0}
              />
            </motion.div>
          ))}

          {/* Residential full-width below */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <HeroCard
              title={heroData[2].title}
              subtitle={heroData[2].subtitle}
              imageSrc={heroData[2].imageSrc}
              imageAlt={heroData[2].imageAlt}
              ctaText={heroData[2].ctaText}
              ctaLink={heroData[2].ctaLink}
            />
          </motion.div>
        </div>

        {/* Mobile: Stacked single cards */}
        <div className="grid grid-cols-1 md:hidden gap-6">
          {heroData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <HeroCard
                title={item.title}
                subtitle={item.subtitle}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                ctaText={item.ctaText}
                ctaLink={item.ctaLink}
                priority={index === 0}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
