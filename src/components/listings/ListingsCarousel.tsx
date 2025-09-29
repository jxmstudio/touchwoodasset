'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Eye, Heart, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Listing {
  id: string
  slug: string
  title: string
  summary: string
  type: 'RESIDENTIAL' | 'COMMERCIAL' | 'ANCILLARY'
  status:
    | 'AVAILABLE'
    | 'UNDER_OFFER'
    | 'SOLD'
    | 'LEASED'
    | 'COMING_SOON'
    | 'FOR_RENT'
  price?: number
  pricePeriod?: 'per_month' | 'per_week' | 'per_day' | 'total'
  address: string
  suburb: string
  state: string
  bedrooms?: number
  bathrooms?: number
  carSpaces?: number
  floorAreaSqm?: number
  heroImageUrl: string
}

interface ListingsCarouselProps {
  listings: Listing[]
  title?: string
  subtitle?: string
  className?: string
  autoPlay?: boolean
  showViewAll?: boolean
}

export function ListingsCarousel({
  listings,
  title = 'Current Properties',
  subtitle = 'Discover our latest listings',
  className = '',
  autoPlay = false,
  showViewAll = true,
}: ListingsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    duration: 25, // Smoother transitions
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Custom easing
  })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  // Auto play functionality with pause on hover
  useEffect(() => {
    if (!emblaApi || !autoPlay) return

    let interval: NodeJS.Timeout

    const startAutoplay = () => {
      interval = setInterval(() => {
        emblaApi.scrollNext()
      }, 6000) // Increased to 6 seconds for better UX
    }

    const stopAutoplay = () => {
      clearInterval(interval)
    }

    startAutoplay()

    // Pause on hover
    const emblaNode = emblaRef.current
    if (emblaNode) {
      emblaNode.addEventListener('mouseenter', stopAutoplay)
      emblaNode.addEventListener('mouseleave', startAutoplay)
    }

    return () => {
      clearInterval(interval)
      if (emblaNode) {
        emblaNode.removeEventListener('mouseenter', stopAutoplay)
        emblaNode.removeEventListener('mouseleave', startAutoplay)
      }
    }
  }, [emblaApi, autoPlay, emblaRef])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-500 text-white'
      case 'UNDER_OFFER':
        return 'bg-orange-500 text-white'
      case 'SOLD':
        return 'bg-red-500 text-white'
      case 'LEASED':
        return 'bg-purple-500 text-white'
      case 'COMING_SOON':
        return 'bg-blue-500 text-white'
      case 'FOR_RENT':
        return 'bg-indigo-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'RESIDENTIAL':
        return 'bg-blue-100 text-blue-800'
      case 'COMMERCIAL':
        return 'bg-green-100 text-green-800'
      case 'ANCILLARY':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!listings || listings.length === 0) {
    return null
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative px-12">
          <div
            className="overflow-hidden"
            ref={emblaRef}
            id="carousel-content"
            role="region"
            aria-label={`${title} carousel`}
          >
            <div className="flex">
              {listings.map((listing, index) => (
                <div
                  key={listing.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 px-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={listing.heroImageUrl}
                          alt={listing.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={false}
                        />

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className={getStatusColor(listing.status)}>
                            {listing.status.replace('_', ' ')}
                          </Badge>
                        </div>

                        {/* Type Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge className={getTypeColor(listing.type)}>
                            {listing.type}
                          </Badge>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={`/listings/${listing.slug}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:text-black"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                            {listing.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span className="truncate">
                              {listing.address}, {listing.suburb}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xl font-bold text-primary">
                            {listing.price ? (
                              <>
                                ${listing.price.toLocaleString()}
                                {listing.pricePeriod && (
                                  <span className="text-sm font-normal text-gray-600 ml-1">
                                    /{listing.pricePeriod.replace('_', ' ')}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-500">
                                Price on request
                              </span>
                            )}
                          </div>
                          {listing.floorAreaSqm && (
                            <div className="text-sm text-gray-500">
                              {listing.floorAreaSqm}m²
                            </div>
                          )}
                        </div>

                        {/* Property Features */}
                        {(listing.bedrooms ||
                          listing.bathrooms ||
                          listing.carSpaces) && (
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            {listing.bedrooms && (
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {listing.bedrooms}
                                </span>
                                <span className="ml-1">bed</span>
                              </div>
                            )}
                            {listing.bathrooms && (
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {listing.bathrooms}
                                </span>
                                <span className="ml-1">bath</span>
                              </div>
                            )}
                            {listing.carSpaces && (
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {listing.carSpaces}
                                </span>
                                <span className="ml-1">car</span>
                              </div>
                            )}
                          </div>
                        )}

                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {listing.summary}
                        </p>

                        <Button className="w-full" asChild>
                          <Link href={`/listings/${listing.slug}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 w-10 h-10 p-0"
            variant="outline"
            size="sm"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Previous properties"
            aria-controls="carousel-content"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 w-10 h-10 p-0"
            variant="outline"
            size="sm"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Next properties"
            aria-controls="carousel-content"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" asChild>
              <Link href="/listings">View All Properties</Link>
            </Button>
          </motion.div>
        )}

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {listings.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === selectedIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
