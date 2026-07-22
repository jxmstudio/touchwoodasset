'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { listings } from '@/data/listings'
import { ListingCard } from '@/components/listings/listings-grid'
import { FadeIn } from '@/components/ui/fade-in'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ACTIVE_STATUSES = ['FOR_RENT', 'AVAILABLE', 'COMING_SOON']
const INACTIVE_STATUSES = ['LEASED', 'SOLD', 'UNDER_OFFER']

// ─── Divider between active and leased rows ────────────────────────────────
function LeasedDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="h-px bg-gray-200 flex-1" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">
        {label}
      </span>
      <div className="h-px bg-gray-200 flex-1" />
    </div>
  )
}

// ─── Section (active grid + leased grid) ──────────────────────────────────
interface SectionProps {
  title: string
  subtitle: string
  active: typeof listings
  inactive: typeof listings
  leasedLabel?: string
}

function ListingSection({ title, subtitle, active, inactive, leasedLabel = 'Leased' }: SectionProps) {
  if (active.length === 0 && inactive.length === 0) return null

  return (
    <section>
      <FadeIn direction="up" distance={30} duration={0.5}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
      </FadeIn>

      {active.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {active.map((listing, i) => (
            <FadeIn key={listing.id} delay={i * 0.05} duration={0.4}>
              <ListingCard listing={listing} />
            </FadeIn>
          ))}
        </div>
      )}

      {inactive.length > 0 && (
        <>
          <LeasedDivider label={leasedLabel} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {inactive.map((listing) => (
              <ListingCard key={listing.id} listing={listing} muted />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────
export function ListingsPageContent() {
  const [suburb, setSuburb] = useState('all')
  const [sort, setSort] = useState('default')

  // Unique suburbs derived from data (sorted A-Z)
  const suburbs = useMemo(() => {
    const set = new Set(listings.map((l) => l.suburb).filter(Boolean))
    return Array.from(set).sort()
  }, [])

  // Apply suburb filter
  const filtered = useMemo(() => {
    if (suburb === 'all') return listings
    return listings.filter((l) => l.suburb === suburb)
  }, [suburb])

  // Apply sort (only affects active listings — inactive always go below)
  const withSort = useMemo(() => {
    const items = [...filtered]
    if (sort === 'price-asc') items.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    if (sort === 'price-desc') items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    return items
  }, [filtered, sort])

  // Properties only — car parks live at /carparks, storage at /the-archive
  const properties = useMemo(() => withSort.filter((l) => l.category === 'properties'), [withSort])

  const activeProperties  = properties.filter((l) => ACTIVE_STATUSES.includes(l.status))
  const inactiveProperties = properties.filter((l) => INACTIVE_STATUSES.includes(l.status))

  const totalActive = activeProperties.length

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Properties
            </h1>
            <p className="text-xl text-white/75 max-w-2xl">
              Apartments, houses and units across Melbourne — managed by
              Touchwood Asset Management. Also looking for a{' '}
              <Link href="/carparks" className="underline hover:text-white">car park</Link>{' '}
              or{' '}
              <Link href="/the-archive" className="underline hover:text-white">storage</Link>?
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Filter bar (sticky below nav) ─────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">

          <Select value={suburb} onValueChange={setSuburb}>
            <SelectTrigger className="w-40 sm:w-48 bg-white text-gray-900 border-gray-300 text-sm h-9">
              <SelectValue placeholder="All Suburbs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suburbs</SelectItem>
              {suburbs.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44 sm:w-52 bg-white text-gray-900 border-gray-300 text-sm h-9">
              <SelectValue placeholder="Most Recent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Most Recent</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>

          <span className="ml-auto text-sm text-gray-500 hidden sm:block">
            {totalActive} active listing{totalActive !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Listing sections ──────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-20">

        <ListingSection
          title="Residential Properties"
          subtitle="Apartments, houses and units managed by Touchwood Asset Management"
          active={activeProperties}
          inactive={inactiveProperties}
          leasedLabel="Leased / Sold"
        />

        {/* ── Category cross-links ─────────────────────────────────────── */}
        <section>
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/carparks"
                className="group rounded-2xl bg-gray-50 border border-gray-100 px-8 py-12 text-center hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Looking for a Car Park?
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Secure parking bays across Carlton, Docklands, the CBD,
                  South Yarra and more.
                </p>
                <span className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-lg font-semibold group-hover:bg-red-700 transition-colors duration-200">
                  Browse Car Parks →
                </span>
              </Link>

              <Link
                href="/the-archive"
                className="group rounded-2xl bg-gray-50 border border-gray-100 px-8 py-12 text-center hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Looking for Storage?
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Secure storage units at The Archive, 601 Lt. Collins Street,
                  Melbourne — from $80 pcm.
                </p>
                <span className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-lg font-semibold group-hover:bg-red-700 transition-colors duration-200">
                  Browse Storage Units →
                </span>
              </Link>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  )
}
