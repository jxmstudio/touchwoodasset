'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Bed, Bath, Car, MapPin, ArrowRight } from 'lucide-react'
import { StaggerContainer } from '@/components/ui/stagger-container'
import { PropertyCardHover } from '@/components/ui/hover-card'
import { PropertyCardSkeleton } from '@/components/ui/loading-animations'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { listings as mockListings } from '@/data/listings'

interface ListingsGridProps {
  category?: string
}

export function ListingsGrid({ category }: ListingsGridProps) {
  const [allListings, setAllListings] = useState(mockListings)
  const [loading] = useState(false)

  // Filter listings based on category
  const filteredListings = category
    ? allListings.filter((listing) => listing.category === category)
    : allListings

  // TODO: Replace with real API call
  useEffect(() => {
    setAllListings(mockListings)
  }, [])

  // status colors handled by top bar currently

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'RESIDENTIAL':
        return 'outline'
      case 'COMMERCIAL':
        return 'secondary'
      case 'ANCILLARY':
        return 'default'
      default:
        return 'outline'
    }
  }

  const formatPrice = (price?: number, period?: string) => {
    if (!price) return 'POA'
    const value = `$${price.toLocaleString()}`
    switch (period) {
      case 'per_month':
        return `${value} / month`
      case 'per_week':
        return `${value} / week`
      case 'per_day':
        return `${value} / day`
      default:
        return value
    }
  }

  if (loading) {
    return (
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8"
        staggerChildren={0.1}
      >
        {[...Array(6)].map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </StaggerContainer>
    )
  }

  if (filteredListings.length === 0) {
    const categoryLabels = {
      properties: 'Properties',
      'car-park': 'Car Parks',
      'storage-cage': 'Storage Cages',
    }

    return (
      <div className="text-center py-12">
        <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No{' '}
          {category
            ? categoryLabels[category as keyof typeof categoryLabels] ||
              'properties'
            : 'properties'}{' '}
          found
        </h3>
        <p className="text-gray-600">
          {category
            ? `We don't have any ${categoryLabels[category as keyof typeof categoryLabels]?.toLowerCase() || 'properties'} available at the moment.`
            : 'Try adjusting your search criteria or check back later.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredListings.length}{' '}
            {category
              ? category === 'properties'
                ? 'Properties'
                : category === 'car-park'
                  ? 'Car Parks'
                  : category === 'storage-cage'
                    ? 'Storage Cages'
                    : 'Properties'
              : 'Properties'}{' '}
            Found
          </h2>
          <p className="text-gray-600">
            {category
              ? `Showing all available ${category === 'properties' ? 'properties' : category === 'car-park' ? 'car parks' : 'storage cages'}`
              : 'Showing all available properties'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select defaultValue="price-low-high">
            <SelectTrigger className="bg-gray-100 hover:bg-gray-200">
              <SelectValue placeholder="Choose sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next-inspection">Next inspection</SelectItem>
              <SelectItem value="date-new-old">
                Date (Newest - Oldest)
              </SelectItem>
              <SelectItem value="date-old-new">
                Date (Oldest - Newest)
              </SelectItem>
              <SelectItem value="price-low-high">
                Price (Lowest - Highest)
              </SelectItem>
              <SelectItem value="price-high-low">
                Price (Highest - Lowest)
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="archive-sale">
                Archive listing (Sale)
              </SelectItem>
              <SelectItem value="archive-rentals">
                Archive listing (Rentals)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Listings Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8"
        staggerChildren={0.1}
        delayChildren={0.2}
      >
        {filteredListings.map((listing) => (
          <PropertyCardHover key={listing.id}>
            <Card className="overflow-hidden bg-white border border-gray-100 min-w-[300px] shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                {listing.gallery && listing.gallery.length > 0 ? (
                  <Carousel
                    className="h-full w-full"
                    opts={{ align: 'start', loop: true }}
                  >
                    <CarouselContent className="h-full">
                      {listing.gallery.map((img, idx) => (
                        <CarouselItem key={idx} className="h-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.url}
                            alt={img.alt || listing.title}
                            className="w-full h-full object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
                    <CarouselNext className="right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
                  </Carousel>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={listing.heroImageUrl}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {(() => {
                  const saleOrRentLabel =
                    listing.status === 'FOR_RENT'
                      ? 'FOR RENT'
                      : listing.status === 'AVAILABLE'
                        ? 'FOR SALE'
                        : null
                  if (!saleOrRentLabel) return null
                  return (
                    <div className="absolute top-0 left-0 right-0">
                      <div className="bg-red-600 text-white text-xs md:text-sm font-extrabold uppercase tracking-wide px-4 py-1 shadow">
                        {saleOrRentLabel}
                      </div>
                    </div>
                  )
                })()}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-red-600 text-white font-bold border-transparent">
                    {listing.type}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4 px-6">
                <CardTitle className="line-clamp-2 text-lg font-semibold leading-tight">
                  {listing.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm text-gray-600 mt-2">
                  {listing.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 px-6 pb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {listing.address}, {listing.suburb}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold text-primary">
                    {formatPrice(listing.price, listing.pricePeriod)}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {listing.type === 'ANCILLARY' &&
                    listing.category === 'car-park'
                      ? null
                      : listing.type === 'ANCILLARY' &&
                          listing.category === 'storage-cage'
                        ? listing.floorAreaSqm
                          ? `${listing.floorAreaSqm}m²`
                          : null
                        : listing.type === 'RESIDENTIAL'
                          ? null
                          : listing.floorAreaSqm
                            ? `${listing.floorAreaSqm}m²`
                            : null}
                  </div>
                </div>

                {/* Property Features */}
                <div className="flex items-center justify-start space-x-4 text-sm text-gray-600 mb-4">
                  {listing.type === 'RESIDENTIAL' && (
                    <>
                      {typeof listing.bedrooms === 'number' && (
                        <div className="flex items-center space-x-1">
                          <Bed className="h-4 w-4" />
                          <span>{listing.bedrooms} brm</span>
                        </div>
                      )}
                      {typeof listing.bathrooms === 'number' && (
                        <div className="flex items-center space-x-1">
                          <Bath className="h-4 w-4" />
                          <span>{listing.bathrooms} bath</span>
                        </div>
                      )}
                      {typeof listing.carSpaces === 'number' && (
                        <div className="flex items-center space-x-1">
                          <Car className="h-4 w-4" />
                          <span>{listing.carSpaces} car</span>
                        </div>
                      )}
                    </>
                  )}
                  {listing.type === 'ANCILLARY' &&
                    listing.category === 'car-park' && (
                      <span>2.1m clearance</span>
                    )}
                  {listing.type === 'ANCILLARY' &&
                    listing.category === 'storage-cage' &&
                    listing.floorAreaSqm && (
                      <span>{listing.floorAreaSqm}m²</span>
                    )}
                </div>

                <Link href={`/listings/${listing.slug}`} className="block">
                  <Button className="w-full">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </PropertyCardHover>
        ))}
      </StaggerContainer>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-12">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  )
}
