import type { Metadata } from 'next'
import CarparksClient from './CarparksClient'
import { carparkBays, carparkSuburbs } from '@/data/carparks'
import { SITE_NAME, absoluteUrl } from '@/lib/site'

const availableCount = carparkBays.filter((b) => b.status === 'AVAILABLE').length
const suburbList = carparkSuburbs.join(', ')

export const metadata: Metadata = {
  title: 'Car Parks for Rent in Melbourne — Secure Bays',
  description: `Secure car park bays for rent across Melbourne — ${suburbList}. ${availableCount} bays currently available with 24/7 access and flexible month-to-month leases. View photos and pricing.`,
  keywords: [
    'car park for rent Melbourne',
    'parking space rental Melbourne',
    'secure car park CBD',
    'monthly parking Melbourne',
    'car space for rent',
  ],
  alternates: { canonical: '/carparks' },
  openGraph: {
    title: `Car Parks for Rent in Melbourne | ${SITE_NAME}`,
    description: `Secure car park bays for rent across Melbourne — ${suburbList}. Flexible month-to-month leases with 24/7 access.`,
    url: '/carparks',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Car Parks', item: absoluteUrl('/carparks') },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': absoluteUrl('/carparks#page'),
      url: absoluteUrl('/carparks'),
      name: 'Car Parks for Rent in Melbourne',
      isPartOf: { '@id': absoluteUrl('/#website') },
      about: { '@id': absoluteUrl('/#organization') },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: carparkBays.length,
        itemListElement: carparkBays.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absoluteUrl(`/carparks/${b.id}`),
          name: `Car Park Bay ${b.bayNumber}, ${b.building}`,
        })),
      },
    },
  ],
}

export default function CarparksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarparksClient />
    </>
  )
}
