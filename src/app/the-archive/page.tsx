'use client'

import { useState, useMemo, useEffect } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/fade-in'
import { ArchiveFilters } from '@/components/listings/ArchiveFilters'
import { ArchiveGrid } from '@/components/listings/ArchiveGrid'
import {
  storageUnits,
  archiveFacility,
  getAvailableUnits,
} from '@/data/storage-units'
import {
  MapPin,
  Shield,
  Clock,
  ArrowUpDown,
  Lock,
  Building2,
  Phone,
  Mail,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Convert YouTube URLs to embed format
function getYouTubeEmbedUrl(url: string): string {
  // Handle youtu.be short URLs
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }
  
  // Handle youtube.com/watch URLs
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }
  
  // Already embed format or other format, return as-is
  return url
}

export default function TheArchivePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [filters, setFilters] = useState({
    storageSize: 'all',
    leaseDuration: 'all',
    minPrice: '',
    maxPrice: '',
    availabilityDate: '',
  })

  const [activeFilters, setActiveFilters] = useState(filters)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    setActiveFilters(filters)
  }

  const clearFilters = () => {
    const defaultFilters = {
      storageSize: 'all',
      leaseDuration: 'all',
      minPrice: '',
      maxPrice: '',
      availabilityDate: '',
    }
    setFilters(defaultFilters)
    setActiveFilters(defaultFilters)
  }

  // Filter units based on active filters
  const filteredUnits = useMemo(() => {
    let filtered = [...storageUnits]

    // Filter by size
    if (activeFilters.storageSize !== 'all') {
      filtered = filtered.filter(
        (unit) => unit.sizeCategory === activeFilters.storageSize
      )
    }

    // Filter by price range
    const minPrice = activeFilters.minPrice
      ? parseInt(activeFilters.minPrice)
      : 0
    const maxPrice = activeFilters.maxPrice
      ? parseInt(activeFilters.maxPrice)
      : Infinity

    filtered = filtered.filter(
      (unit) => unit.price >= minPrice && unit.price <= maxPrice
    )

    // Filter by status (only show available for now)
    // Can be customized based on lease duration logic
    // filtered = filtered.filter((unit) => unit.status === 'AVAILABLE')

    return filtered
  }, [activeFilters])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          {isMounted ? (
          <Image
            src={archiveFacility.buildingImage}
            alt="The Archive - 601 Little Collins Street"
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={archiveFacility.buildingImage}
              alt="The Archive - 601 Little Collins Street"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 h-full flex flex-col justify-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Storage Facility
            </h1>
            <div className="flex items-center text-xl md:text-2xl text-white/90 mb-6">
              <MapPin className="h-6 w-6 mr-2" />
              <span>601 Lt. Collins St, MELBOURNE</span>
            </div>
            <p className="text-lg text-white/80 max-w-2xl">
              Secure 24/7 storage solutions in the heart of Melbourne&apos;s CBD
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Video Section - Placeholder */}
      {archiveFacility.videoUrl && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <FadeIn>
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={getYouTubeEmbedUrl(archiveFacility.videoUrl)}
                  title="The Archive Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Description */}
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About The Archive
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                  {archiveFacility.description}
                </div>
              </FadeIn>

              {/* Features Grid */}
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                    { icon: Shield, label: '24/7 Security' },
                    { icon: Clock, label: '7-Day Access' },
                    { icon: ArrowUpDown, label: 'Goods Lift' },
                    { icon: Lock, label: 'Individual Locks' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                        <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">
                          {feature.label}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.3}>
                <Card className="p-6 sticky top-6 bg-gradient-to-br from-primary/5 to-brand-50/30">
                  <div className="flex items-center mb-4">
                    <Building2 className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Get in Touch
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Have questions about our storage units? Our team is here to
                    help you find the perfect solution.
                  </p>
                  <div className="space-y-4">
                    <a
                      href={`tel:${archiveFacility.contact.phone}`}
                      className="flex items-center text-gray-900 hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      <span className="font-medium">
                        {archiveFacility.contact.phone}
                      </span>
                    </a>
                    <a
                      href={`mailto:${archiveFacility.contact.email}`}
                      className="flex items-center text-gray-900 hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3" />
                      <span className="font-medium">
                        {archiveFacility.contact.email}
                      </span>
                    </a>
                  </div>
                  <Button asChild className="w-full mt-6" size="lg">
                    <a href="/contact">Contact Us</a>
                  </Button>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Available Units Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Available Storage Units
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our selection of secure storage units. All units come
                with 24/7 access and individual security.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Filters Sidebar */}
            <FadeIn direction="left" distance={40} duration={0.6}>
              <div className="w-full lg:w-80 flex-shrink-0">
                <ArchiveFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onApplyFilters={applyFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </FadeIn>

            {/* Units Grid */}
            <FadeIn direction="right" distance={40} delay={0.3} duration={0.6}>
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    Showing {filteredUnits.length} of {storageUnits.length}{' '}
                    units
                  </p>
                </div>
                <ArchiveGrid units={filteredUnits} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Note: Client will provide 70+ unit photos/videos tomorrow */}
      {/* TODO: Replace placeholder images with actual unit photos */}
      {/* TODO: Add facility tour video URL when available */}
    </div>
  )
}
