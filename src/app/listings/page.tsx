import { Metadata } from 'next'
import { ListingsPageContent } from '@/components/listings/ListingsPageContent'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Property Listings - Touchwood Asset Management',
  description: 'Browse our comprehensive selection of residential, commercial, and ancillary properties across Melbourne and Victoria.',
  openGraph: {
    title: 'Property Listings - Touchwood Asset Management',
    description: 'Browse our comprehensive selection of residential, commercial, and ancillary properties across Melbourne and Victoria.',
  },
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListingsPageContent />
    </Suspense>
  )
}
