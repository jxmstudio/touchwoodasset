import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StorageUnitDetailClient } from './StorageUnitDetailClient'
import { storageUnits } from '@/data/storage-units'
import { absoluteUrl } from '@/lib/site'

interface StorageUnitDetailPageProps {
  params: {
    unitId: string
  }
}

// Pre-render every unit at build time so detail pages are static HTML for crawlers.
export function generateStaticParams() {
  return storageUnits.map((u) => ({ unitId: u.id }))
}

export async function generateMetadata({
  params,
}: StorageUnitDetailPageProps): Promise<Metadata> {
  const { unitId } = await params
  const unit = storageUnits.find((u) => u.id === unitId)

  if (!unit) {
    return {
      title: 'Storage Unit Not Found - The Archive',
      robots: { index: false, follow: true },
    }
  }

  return {
    title: `${unit.unitNumber} — ${unit.size}sqm Storage Unit, Melbourne CBD`,
    description: unit.description,
    // Required: the parent the-archive layout previously supplied a canonical
    // of /the-archive, which every unit page inherited and self-de-indexed with.
    alternates: { canonical: `/the-archive/${unit.id}` },
    openGraph: {
      title: `${unit.unitNumber} — ${unit.size}sqm Storage at The Archive`,
      description: unit.description,
      url: `/the-archive/${unit.id}`,
      images: unit.images,
    },
  }
}

export default async function StorageUnitDetailPage({
  params,
}: StorageUnitDetailPageProps) {
  const { unitId } = await params
  const unit = storageUnits.find((u) => u.id === unitId)

  if (!unit) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'The Archive',
            item: absoluteUrl('/the-archive'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Unit ${unit.unitNumber}`,
            item: absoluteUrl(`/the-archive/${unit.id}`),
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': absoluteUrl(`/the-archive/${unit.id}#product`),
        name: `Storage Unit ${unit.unitNumber} — ${unit.size}sqm, Melbourne CBD`,
        description: unit.description,
        image: unit.images.map((src) => absoluteUrl(src)),
        category: 'Self storage unit',
        brand: { '@id': absoluteUrl('/#organization') },
        offers: {
          '@type': 'Offer',
          url: absoluteUrl(`/the-archive/${unit.id}`),
          priceCurrency: 'AUD',
          ...(unit.price ? { price: String(unit.price) } : {}),
          availability:
            unit.status === 'AVAILABLE'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: { '@id': absoluteUrl('/#organization') },
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
      <StorageUnitDetailClient unit={unit} />
    </>
  )
}
