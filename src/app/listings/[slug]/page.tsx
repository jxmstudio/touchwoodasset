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
      title: 'Property Not Found',
      description: 'The requested property could not be found.'
    }
  }

  return {
    title: listing.title,
    description: listing.description,
    alternates: { canonical: `/listings/${listing.slug}` },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': listing.type === 'RESIDENTIAL' ? 'Apartment' : 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `https://touchwoodasset.com/listings/${listing.slug}`,
    ...(listing.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: listing.address,
        addressLocality: listing.suburb,
        addressRegion: 'VIC',
        postalCode: listing.postcode,
        addressCountry: 'AU',
      },
    }),
    ...(listing.bedrooms && { numberOfRooms: listing.bedrooms }),
    ...(listing.price && {
      offers: {
        '@type': 'Offer',
        price: listing.price,
        priceCurrency: 'AUD',
      },
    }),
    ...(listing.heroImageUrl && { image: listing.heroImageUrl }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetailClient listing={listing} />
    </>
  )
}
