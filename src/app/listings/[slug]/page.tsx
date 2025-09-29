import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ListingDetailClient } from './ListingDetailClient'
import { listings } from '@/data/listings'

// Use central dataset
const mockListings = listings

interface ListingDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ListingDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = mockListings.find(l => l.slug === slug)
  
  if (!listing) {
    return {
      title: 'Property Not Found - Touchwood Asset Management',
      description: 'The requested property could not be found.'
    }
  }

  return {
    title: `${listing.title} - Touchwood Asset Management`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.heroImageUrl],
    },
  }
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { slug } = await params
  const listing = mockListings.find(l => l.slug === slug)

  if (!listing) {
    notFound()
  }

  return <ListingDetailClient listing={listing} />
}
