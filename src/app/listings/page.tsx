import { Metadata } from 'next'
import { ListingsPageContent } from '@/components/listings/ListingsPageContent'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Property Listings',
  description: 'Browse residential, commercial & ancillary property listings across Melbourne and Victoria. Car parks, storage units, apartments & more — updated daily.',
  alternates: { canonical: '/listings' },
  openGraph: {
    title: 'Property Listings | Touchwood Asset Management',
    description: 'Browse residential, commercial & ancillary property listings across Melbourne and Victoria. Car parks, storage units, apartments & more — updated daily.',
  },
}

export default function ListingsPage() {
  return (
    <>
      <h1 className="sr-only">Property Listings — Melbourne &amp; Victoria</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ListingsPageContent />
      </Suspense>
    </>
  )
}
