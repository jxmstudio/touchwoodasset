import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CarparkDetailClient } from './CarparkDetailClient'
import { carparkBays } from '@/data/carparks'
import { absoluteUrl } from '@/lib/site'

interface CarparkDetailPageProps {
  params: {
    bayId: string
  }
}

// Pre-render every bay at build time so detail pages are static HTML for crawlers.
export function generateStaticParams() {
  return carparkBays.map((b) => ({ bayId: b.id }))
}

export async function generateMetadata({
  params,
}: CarparkDetailPageProps): Promise<Metadata> {
  const { bayId } = await params
  const bayItem = carparkBays.find((b) => b.id === bayId)

  if (!bayItem) {
    return {
      title: 'Car Park Not Found',
      description: 'The requested car park could not be found.',
      robots: { index: false, follow: true },
    }
  }

  return {
    title: `Car Park Bay ${bayItem.bayNumber} – ${bayItem.address}, ${bayItem.suburb}`,
    description: bayItem.description,
    alternates: { canonical: `/carparks/${bayItem.id}` },
    openGraph: {
      title: `Car Park Bay ${bayItem.bayNumber} – ${bayItem.address}`,
      description: bayItem.description,
      url: `/carparks/${bayItem.id}`,
      images: [bayItem.images[0]],
    },
  }
}

export default async function CarparkDetailPage({
  params,
}: CarparkDetailPageProps) {
  const { bayId } = await params
  const bayItem = carparkBays.find((b) => b.id === bayId)

  if (!bayItem) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Car Parks', item: absoluteUrl('/carparks') },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Bay ${bayItem.bayNumber}, ${bayItem.building}`,
            item: absoluteUrl(`/carparks/${bayItem.id}`),
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': absoluteUrl(`/carparks/${bayItem.id}#product`),
        name: `Car Park Bay ${bayItem.bayNumber} — ${bayItem.building}, ${bayItem.suburb}`,
        description: bayItem.description,
        image: bayItem.images.map((src) => absoluteUrl(src)),
        category: 'Parking space rental',
        brand: { '@id': absoluteUrl('/#organization') },
        offers: {
          '@type': 'Offer',
          url: absoluteUrl(`/carparks/${bayItem.id}`),
          priceCurrency: 'AUD',
          // Omit `price` entirely when unknown rather than emitting 0, which
          // Google reads as a genuine free offer.
          ...(bayItem.price ? { price: String(bayItem.price) } : {}),
          availability:
            bayItem.status === 'AVAILABLE'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: { '@id': absoluteUrl('/#organization') },
          areaServed: {
            '@type': 'Place',
            name: `${bayItem.suburb}, ${bayItem.state} ${bayItem.postcode}`,
          },
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarparkDetailClient bay={bayItem} />
    </>
  )
}
