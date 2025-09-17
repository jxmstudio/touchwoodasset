'use client'

import { useSearchParams } from 'next/navigation'
import { ListingsGrid } from '@/components/listings/listings-grid'
import { ListingsFilters } from '@/components/listings/listings-filters'
import { CategoryTabs } from '@/components/listings/CategoryTabs'
import { FadeIn } from '@/components/ui/fade-in'
import { getCountsByCategory } from '@/data/listings'

// Derive counts from central dataset
const mockCounts = getCountsByCategory()

export function ListingsPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || undefined

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up" distance={50} duration={0.8}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Property Listings
            </h1>
          </FadeIn>
          <FadeIn direction="up" distance={30} delay={0.2} duration={0.8}>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover exceptional properties across Melbourne and Victoria
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters and Listings */}
      <section className="py-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Filters Sidebar */}
            <FadeIn direction="left" distance={40} duration={0.6}>
              <div className="w-full lg:w-80 flex-shrink-0">
                <ListingsFilters />
              </div>
            </FadeIn>

            {/* Main Content */}
            <FadeIn direction="right" distance={40} delay={0.3} duration={0.6}>
              <div className="flex-1 min-w-0">
                {/* Category Tabs */}
                <CategoryTabs totalCounts={mockCounts} />
                
                {/* Listings Grid */}
                <ListingsGrid category={category} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
