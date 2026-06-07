'use client'

import { useState, useCallback, useEffect } from 'react'
import { ApplyModal } from '@/components/common/ApplyModal'
import { ListingEnquiryForm } from '@/components/listings/ListingEnquiryForm'
import { SimilarListings } from '@/components/listings/SimilarListings'
import { FadeIn } from '@/components/ui/fade-in'
import {
  Bed, Bath, Car, Ruler, ArrowLeft, Share2,
  FileText, ChevronLeft, ChevronRight, X,
  Phone, Mail,
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ListingItem } from '@/data/listings'

interface ListingDetailClientProps {
  listing: ListingItem
}

type TabKey = 'overview' | 'floorplan' | 'location' | 'enquire'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview',  label: 'Overview'   },
  { key: 'floorplan', label: 'Floor Plan' },
  { key: 'location',  label: 'Location'   },
  { key: 'enquire',   label: 'Enquire'    },
]

const STATUS_LABELS: Record<string, string> = {
  FOR_RENT:    'For Lease',
  AVAILABLE:   'For Sale',
  LEASED:      'Leased',
  SOLD:        'Sold',
  UNDER_OFFER: 'Under Offer',
  COMING_SOON: 'Coming Soon',
}

function statusBadgeClass(status: string) {
  const map: Record<string, string> = {
    FOR_RENT:    'bg-primary text-white',
    AVAILABLE:   'bg-primary text-white',
    LEASED:      'bg-gray-500 text-white',
    SOLD:        'bg-gray-500 text-white',
    UNDER_OFFER: 'bg-amber-500 text-white',
    COMING_SOON: 'bg-gray-700 text-white',
  }
  return map[status] ?? 'bg-gray-500 text-white'
}

// ── Mosaic Gallery ─────────────────────────────────────────────────────────
function MosaicGallery({
  images,
  title,
}: {
  images: { url: string; alt?: string }[]
  title: string
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const prev = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1)),
    [images.length]
  )
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1)),
    [images.length]
  )

  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [lightboxIdx, prev, next])

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center rounded-xl">
        <p className="text-gray-400 text-sm">No photos available</p>
      </div>
    )
  }

  const thumbs = images.slice(1, 4)
  const extraCount = images.length - 4

  return (
    <>
      {/* Mosaic grid: hero 3 cols × right column thumbnails 1 col */}
      <div className="grid grid-cols-4 gap-1.5 h-[380px] md:h-[500px] lg:h-[580px] rounded-xl overflow-hidden">
        {/* Hero image — 3/4 width, full height */}
        <div
          className="col-span-3 relative cursor-zoom-in group overflow-hidden"
          onClick={() => setLightboxIdx(0)}
        >
          <img
            src={images[0].url}
            alt={images[0].alt ?? title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Right column — 3 thumbnails stacked */}
        <div className="col-span-1 grid grid-rows-3 gap-1.5">
          {[0, 1, 2].map((i) => {
            const img = thumbs[i]
            if (!img) {
              return <div key={i} className="bg-gray-100" />
            }
            const isLast = i === 2
            const showOverlay = isLast && extraCount > 0
            return (
              <div
                key={i}
                className="relative cursor-zoom-in group overflow-hidden"
                onClick={() => setLightboxIdx(i + 1)}
              >
                <img
                  src={img.url}
                  alt={img.alt ?? `${title} ${i + 2}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {showOverlay && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">+{extraCount}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                  onClick={(e) => { e.stopPropagation(); next() }}
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIdx}
                src={images[lightboxIdx].url}
                alt={images[lightboxIdx].alt ?? title}
                className="max-w-[90vw] max-h-[88vh] object-contain rounded"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === lightboxIdx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Agent Card ─────────────────────────────────────────────────────────────
function AgentCard({ agent }: { agent: { name: string; phone: string; email: string } }) {
  const initials = agent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
  return (
    <div className="flex items-start gap-5 p-6 rounded-xl border border-gray-100 bg-gray-50/60">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xl font-bold text-primary">{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 text-base">{agent.name}</p>
        <p className="text-sm text-gray-500 mb-3">Property Specialist · Touchwood Asset Management</p>
        <div className="flex flex-col gap-1.5">
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
          >
            <Phone className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
            {agent.phone}
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
          >
            <Mail className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
            <span className="truncate">{agent.email}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export function ListingDetailClient({ listing }: ListingDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  const gallery = listing.gallery ?? []
  const isActive = listing.status === 'FOR_RENT' || listing.status === 'AVAILABLE'

  const floorplanImage = gallery.find(
    (img) =>
      img.alt?.toLowerCase().includes('floor') ||
      img.alt?.toLowerCase().includes('plan')
  )

  const formatPrice = () => {
    if (!listing.price) return null
    const formatted =
      listing.price >= 1_000_000
        ? `$${(listing.price / 1_000_000).toFixed(2)}M`
        : `$${listing.price.toLocaleString()}`
    const periods: Record<string, string> = {
      per_month: ' / month',
      per_week:  ' / week',
      per_day:   ' / day',
      total:     '',
    }
    const suffix = listing.pricePeriod ? (periods[listing.pricePeriod] ?? '') : ''
    return `${formatted}${suffix}`
  }

  const mapQuery = encodeURIComponent(
    `${listing.address}, ${listing.suburb}, ${listing.state} Australia`
  )

  const agent = listing.agent ?? {
    name:  'Eamon Chau',
    phone: '+61 413 889 388',
    email: 'admin@touchwoodasset.com',
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/listings"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Link>
          <button
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: listing.title, url: window.location.href })
              } else {
                navigator.clipboard.writeText(window.location.href)
              }
            }}
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Title above gallery ─────────────────────────────────────── */}
        <FadeIn direction="up" duration={0.5}>
          <div className="pt-10 pb-7">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {listing.title}
            </h1>
          </div>
        </FadeIn>

        {/* ── Mosaic gallery ──────────────────────────────────────────── */}
        <FadeIn duration={0.6} delay={0.1}>
          <MosaicGallery images={gallery} title={listing.title} />
        </FadeIn>

        {/* ── Tab bar ─────────────────────────────────────────────────── */}
        <div className="mt-10 border-b border-gray-200">
          <div className="flex items-center">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content — max-w-3xl for comfortable reading ─────────── */}
        <div className="py-12 max-w-3xl">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <FadeIn>

              {/* Status badge */}
              <div className="mb-4">
                <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded ${statusBadgeClass(listing.status)}`}>
                  {STATUS_LABELS[listing.status] ?? listing.status}
                </span>
              </div>

              {/* Price */}
              {formatPrice() && (
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {formatPrice()}
                </p>
              )}

              {/* Address — 2 lines like bizarre.realestate */}
              <div className="mb-8">
                <p className="text-xl font-medium text-gray-700">{listing.address}</p>
                <p className="text-xl text-gray-400">{listing.suburb}, {listing.state}{listing.postcode ? ` ${listing.postcode}` : ''}</p>
              </div>

              {/* Specs row */}
              {(listing.bedrooms != null || listing.bathrooms != null ||
                listing.carSpaces != null || listing.floorAreaSqm) && (
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-6 border-y border-gray-100 mb-10">
                  {listing.bedrooms != null && (
                    <div className="flex items-center gap-2.5">
                      <Bed className="h-5 w-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">{listing.bedrooms}</span>
                      <span className="text-gray-500 text-sm">Bed{listing.bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {listing.bathrooms != null && (
                    <div className="flex items-center gap-2.5">
                      <Bath className="h-5 w-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">{listing.bathrooms}</span>
                      <span className="text-gray-500 text-sm">Bath{listing.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {listing.carSpaces != null && (
                    <div className="flex items-center gap-2.5">
                      <Car className="h-5 w-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">{listing.carSpaces}</span>
                      <span className="text-gray-500 text-sm">Car{listing.carSpaces !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {listing.floorAreaSqm && (
                    <div className="flex items-center gap-2.5">
                      <Ruler className="h-5 w-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">{listing.floorAreaSqm}</span>
                      <span className="text-gray-500 text-sm">m²</span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {listing.description && (
                <div className="mb-12 text-gray-700 leading-[1.85] text-[1.0625rem] whitespace-pre-line">
                  {listing.description}
                </div>
              )}

              {/* Features */}
              {listing.features && listing.features.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
                    Property Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-10">
                    {listing.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Book inspection CTA (for available properties) */}
              {isActive && (
                <div className="mb-12 flex flex-wrap gap-3">
                  <Link
                    href={`/inspection?listing=${listing.slug}`}
                    className="inline-flex items-center gap-2 border border-gray-900 text-gray-900 px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    Book an inspection
                  </Link>
                  {(listing.category === 'car-park' || listing.category === 'storage-cage') && (
                    <button
                      onClick={() => setIsApplyModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              )}

              {/* ── Divider ── */}
              <hr className="border-gray-100 mb-12" />

              {/* Agent cards */}
              <div className="mb-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
                  Contact Agent
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AgentCard agent={agent} />
                </div>
              </div>

              {/* ── Divider ── */}
              <hr className="border-gray-100 mb-12" />

              {/* Enquiry section */}
              <div id="enquire">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Is this the one?
                </h2>
                <p className="text-gray-500 mb-8 text-[1.0625rem]">
                  We&apos;ll get back to you within one business day.
                </p>
                <ListingEnquiryForm
                  listingId={listing.id}
                  listingTitle={listing.title}
                />
              </div>

            </FadeIn>
          )}

          {/* FLOOR PLAN */}
          {activeTab === 'floorplan' && (
            <FadeIn>
              <h2 className="text-2xl font-bold text-gray-900 mb-7">Floor Plan</h2>
              {floorplanImage ? (
                <img
                  src={floorplanImage.url}
                  alt={floorplanImage.alt ?? 'Floor plan'}
                  className="w-full rounded-xl border border-gray-100 shadow-sm"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50 rounded-xl border border-gray-100">
                  <FileText className="h-10 w-10 text-gray-300 mb-4" />
                  <p className="text-gray-600 font-medium">Floor plan not yet available</p>
                  <p className="text-sm text-gray-400 mt-1">Enquire and we&apos;ll send it through.</p>
                  <button
                    onClick={() => setActiveTab('enquire')}
                    className="mt-6 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    Enquire Now
                  </button>
                </div>
              )}
            </FadeIn>
          )}

          {/* LOCATION */}
          {activeTab === 'location' && (
            <FadeIn>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Location</h2>
              <p className="text-gray-500 text-sm mb-6">
                {listing.address}, {listing.suburb}, {listing.state}
              </p>
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]">
                <iframe
                  title="Property location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeIn>
          )}

          {/* ENQUIRE */}
          {activeTab === 'enquire' && (
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Is this the one?
              </h2>
              <p className="text-gray-500 mb-8 text-[1.0625rem]">
                Interested in{' '}
                <span className="font-medium text-gray-700">{listing.title}</span>?
                We&apos;ll get back to you within one business day.
              </p>
              <ListingEnquiryForm
                listingId={listing.id}
                listingTitle={listing.title}
              />
            </FadeIn>
          )}

        </div>

        {/* ── Similar properties ─────────────────────────────────── */}
        <div className="border-t border-gray-100">
          <SimilarListings currentId={listing.id} category={listing.category} />
        </div>

      </div>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        listingId={listing.id}
        listingTitle={listing.title}
        category={listing.category as 'car-park' | 'storage-cage'}
        status={listing.status as 'AVAILABLE' | 'UNDER_OFFER' | 'SOLD' | 'LEASED' | 'COMING_SOON' | 'FOR_RENT'}
        type={listing.type as 'RESIDENTIAL' | 'COMMERCIAL' | 'ANCILLARY'}
      />
    </div>
  )
}
