'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Bed, Bath, Car, MapPin, ArrowRight } from 'lucide-react'
import { StaggerContainer } from '@/components/ui/stagger-container'
import { PropertyCardHover } from '@/components/ui/hover-card'
import { PropertyCardSkeleton } from '@/components/ui/loading-animations'

import { listings as mockListings } from '@/data/listings'

interface ListingsGridProps {
  category?: string
}

export function ListingsGrid({ category }: ListingsGridProps) {
  const [allListings, setAllListings] = useState(mockListings)
  const [loading, setLoading] = useState(false)
  
  // Filter listings based on category
  const filteredListings = category 
    ? allListings.filter(listing => listing.category === category)
    : allListings

  // TODO: Replace with real API call
  useEffect(() => {
    setAllListings(mockListings)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'default'
      case 'UNDER_OFFER':
        return 'secondary'
      case 'SOLD':
        return 'destructive'
      case 'LEASED':
        return 'outline'
      default:
        return 'secondary'
    }
  }

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
      'properties': 'Properties',
      'car-park': 'Car Parks',
      'storage-cage': 'Storage Cages'
    }
    
    return (
      <div className="text-center py-12">
        <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No {category ? categoryLabels[category as keyof typeof categoryLabels] || 'properties' : 'properties'} found
        </h3>
        <p className="text-gray-600">
          {category 
            ? `We don't have any ${categoryLabels[category as keyof typeof categoryLabels]?.toLowerCase() || 'properties'} available at the moment.`
            : 'Try adjusting your search criteria or check back later.'
          }
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
            {filteredListings.length} {category ? 
              category === 'properties' ? 'Properties' : 
              category === 'car-park' ? 'Car Parks' : 
              category === 'storage-cage' ? 'Storage Cages' : 'Properties'
              : 'Properties'} Found
          </h2>
          <p className="text-gray-600">
            {category ? `Showing all available ${category === 'properties' ? 'properties' : category === 'car-park' ? 'car parks' : 'storage cages'}` : 'Showing all available properties'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={listing.heroImageUrl} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant={getStatusColor(listing.status)}>
                  {listing.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant={getTypeColor(listing.type)}>
                  {listing.type}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-4 px-6">
              <CardTitle className="line-clamp-2 text-lg font-semibold leading-tight">{listing.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-sm text-gray-600 mt-2">{listing.summary}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 px-6 pb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{listing.address}, {listing.suburb}</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-primary">
                  ${listing.price?.toLocaleString() || 'POA'}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {listing.floorAreaSqm && `${listing.floorAreaSqm}m²`}
                </div>
              </div>
              
              {/* Property Features */}
              <div className="flex items-center justify-start space-x-4 text-sm text-gray-600 mb-4">
                {listing.bedrooms && (
                  <div className="flex items-center space-x-1">
                    <Bed className="h-4 w-4" />
                    <span>{listing.bedrooms}</span>
                  </div>
                )}
                {listing.bathrooms && (
                  <div className="flex items-center space-x-1">
                    <Bath className="h-4 w-4" />
                    <span>{listing.bathrooms}</span>
                  </div>
                )}
                {listing.carSpaces && (
                  <div className="flex items-center space-x-1">
                    <Car className="h-4 w-4" />
                    <span>{listing.carSpaces}</span>
                  </div>
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
        <Button variant="outline">
          Next
        </Button>
      </div>
    </div>
  )
}
