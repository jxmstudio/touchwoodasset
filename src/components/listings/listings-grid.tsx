'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bed, Bath, Car, Ruler, MapPin, ArrowRight } from 'lucide-react'
import type { ListingItem } from '@/data/listings'

interface ListingCardProps {
  listing: ListingItem
  /** Visually de-emphasise — used for leased/sold rows */
  muted?: boolean
}

export function ListingCard({ listing, muted = false }: ListingCardProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])

  const statusConfig: Record<string, { label: string; className: string }> = {
    FOR_RENT:    { label: 'For Lease',   className: 'bg-primary text-white' },
    AVAILABLE:   { label: 'For Sale',    className: 'bg-primary text-white' },
    LEASED:      { label: 'Leased',      className: 'bg-gray-500 text-white' },
    SOLD:        { label: 'Sold',        className: 'bg-gray-500 text-white' },
    UNDER_OFFER: { label: 'Under Offer', className: 'bg-amber-500 text-white' },
    COMING_SOON: { label: 'Coming Soon', className: 'bg-gray-700 text-white' },
  }

  const { label, className: badgeClass } = statusConfig[listing.status] ?? {
    label: listing.status,
    className: 'bg-gray-500 text-white',
  }

  const formatPrice = () => {
    if (!listing.price) return null
    const formatted = `$${listing.price.toLocaleString()}`
    const periods: Record<string, string> = {
      per_month: ' pcm',
      per_week:  ' pw',
      per_day:   ' / day',
      total:     '',
    }
    const suffix = listing.pricePeriod ? (periods[listing.pricePeriod] ?? '') : ''
    return `${formatted}${suffix}`
  }

  const imageUrl = listing.gallery?.[0]?.url ?? listing.heroImageUrl
  const price = formatPrice()

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={`group block rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${
        muted ? 'opacity-60' : ''
      }`}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {isMounted ? (
          <img
            src={imageUrl}
            alt={listing.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              muted ? 'grayscale-[20%]' : ''
            }`}
          />
        ) : (
          /* SSR fallback — no hydration mismatch */
          <img
            src={imageUrl}
            alt={listing.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${badgeClass}`}>
            {label}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5">
        {/* Price */}
        {price && (
          <p className="text-2xl font-bold text-gray-900 mb-2">{price}</p>
        )}

        {/* Address */}
        <div className="flex items-start gap-1.5 mb-4">
          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{listing.address}</p>
            <p className="text-sm text-gray-500">{listing.suburb}, {listing.state}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-sm text-gray-600 pt-3 border-t border-gray-100">
          {listing.bedrooms != null && (
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-gray-400" />
              {listing.bedrooms}
            </span>
          )}
          {listing.bathrooms != null && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-gray-400" />
              {listing.bathrooms}
            </span>
          )}
          {listing.carSpaces != null && (
            <span className="flex items-center gap-1.5">
              <Car className="h-4 w-4 text-gray-400" />
              {listing.carSpaces}
            </span>
          )}
          {listing.floorAreaSqm && (
            <span className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-gray-400" />
              {listing.floorAreaSqm}m²
            </span>
          )}
          <span className="ml-auto text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            View <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/**
 * @deprecated — use ListingsPageContent which renders ListingCard directly.
 * Kept as an empty stub so any remaining imports don't break.
 */
export function ListingsGrid(_props: { category?: string; filters?: Record<string, string> }) {
  return null
}
