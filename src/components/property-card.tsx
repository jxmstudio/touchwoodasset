'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/fade-in'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Square, 
  Heart,
  Calendar,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type PropertyStatus = 'AVAILABLE' | 'UNDER_OFFER' | 'SOLD' | 'LEASED'
export type PropertyType = 'RESIDENTIAL_SALE' | 'RESIDENTIAL_RENTAL' | 'COMMERCIAL_RENTAL'

interface PropertyCardProps {
  id: string
  title: string
  address: string
  price: string
  priceType?: 'per_week' | 'per_month' | 'total'
  status: PropertyStatus
  type: PropertyType
  bedrooms?: number
  bathrooms?: number
  parking?: number
  landSize?: number
  images: string[]
  availableDate?: string
  className?: string
  href?: string
  onFavorite?: (id: string) => void
  isFavorited?: boolean
}

const statusConfig = {
  AVAILABLE: {
    className: 'bg-available text-white',
    label: 'Available'
  },
  UNDER_OFFER: {
    className: 'bg-under-offer text-white',
    label: 'Under Offer'
  },
  SOLD: {
    className: 'bg-sold text-white',
    label: 'Sold'
  },
  LEASED: {
    className: 'bg-leased text-white',
    label: 'Leased'
  }
}

export function PropertyCard({
  id,
  title,
  address,
  price,
  priceType = 'total',
  status,
  type,
  bedrooms,
  bathrooms,
  parking,
  landSize,
  images,
  availableDate,
  className,
  href = `/listings/${id}`,
  onFavorite,
  isFavorited = false
}: PropertyCardProps) {
  const statusStyle = statusConfig[status]
  const mainImage = (images && images[0]) || '/placeholder-property.svg'
  
  const formatPrice = () => {
    if (priceType === 'per_week') return `${price}/week`
    if (priceType === 'per_month') return `${price}/month`
    return price
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFavorite?.(id)
  }

  return (
    <FadeIn>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card">
          <div className="relative">
            {/* Property Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={mainImage}
                alt={title}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                suppressHydrationWarning
              />
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <Badge className={statusStyle.className}>
                {statusStyle.label}
              </Badge>
            </div>
            
            {/* Favorite Button */}
            {onFavorite && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={handleFavorite}
              >
                <Heart 
                  className={cn(
                    "h-4 w-4",
                    isFavorited ? "fill-primary text-primary" : "text-muted-foreground"
                  )} 
                />
              </Button>
            )}
            
            {/* Image Count */}
            {images && images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium">
                +{images.length - 1} photos
              </div>
            )}
          </div>
          
          <CardContent className="p-6">
            {/* Price */}
            <div className="mb-3">
              <div className="text-2xl font-bold text-foreground">
                {formatPrice()}
              </div>
              {availableDate && (
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Available {availableDate}
                </div>
              )}
            </div>
            
            {/* Title */}
            <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
              {title}
            </h3>
            
            {/* Address */}
            <div className="flex items-start text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm line-clamp-2">{address}</span>
            </div>
            
            {/* Property Features */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {bedrooms !== undefined && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {bedrooms}
                </div>
              )}
              {bathrooms !== undefined && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {bathrooms}
                </div>
              )}
              {parking !== undefined && (
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-1" />
                  {parking}
                </div>
              )}
              {landSize && (
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  {landSize}m²
                </div>
              )}
            </div>
            
            {/* View Details Button */}
            <Link href={href}>
              <Button 
                className="w-full group/btn" 
                variant="outline"
              >
                View Details
                <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </FadeIn>
  )
}
