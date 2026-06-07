'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { listings } from '@/data/listings'
import type { ListingItem } from '@/data/listings'
import { Bed, Bath, Car, Ruler, MapPin, ArrowRight } from 'lucide-react'

interface SimilarListingsProps {
  currentId: string
  category: string
}

function SimilarCard({ listing }: { listing: ListingItem }) {
  const imageUrl = listing.gallery?.[0]?.url ?? listing.heroImageUrl

  const formatPrice = () => {
    if (!listing.price) return null
    const formatted = `$${listing.price.toLocaleString()}`
    const periods: Record<string, string> = {
      per_month: ' pcm',
      per_week: ' pw',
      per_day: ' / day',
      total: '',
    }
    const suffix = listing.pricePeriod ? (periods[listing.pricePeriod] ?? '') : ''
    return `${formatted}${suffix}`
  }

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={listing.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary text-white">
            {listing.status === 'FOR_RENT' ? 'For Lease' : listing.status === 'AVAILABLE' ? 'For Sale' : listing.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        {formatPrice() && (
          <p className="text-xl font-bold text-gray-900 mb-1">{formatPrice()}</p>
        )}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-1">{listing.address}, {listing.suburb}</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 pt-3 border-t border-gray-100">
          {listing.bedrooms != null && (
            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{listing.bedrooms}</span>
          )}
          {listing.bathrooms != null && (
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{listing.bathrooms}</span>
          )}
          {listing.carSpaces != null && (
            <span className="flex items-center gap-1"><Car className="h-3.5 w-3.5" />{listing.carSpaces}</span>
          )}
          {listing.floorAreaSqm && (
            <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{listing.floorAreaSqm}m²</span>
          )}
          <span className="ml-auto text-primary font-semibold flex items-center gap-1">
            View <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function SimilarListings({ currentId, category }: SimilarListingsProps) {
  const similar = useMemo(() => {
    return listings
      .filter(l => l.id !== currentId && l.category === category)
      .slice(0, 3)
  }, [currentId, category])

  if (similar.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map(listing => (
          <SimilarCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  )
}
