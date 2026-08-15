import type { Metadata } from 'next'
import ArchiveClient from './ArchiveClient'
import { storageUnits } from '@/data/storage-units'
import { SITE_NAME, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Self Storage Melbourne CBD — The Archive, 601 Little Collins St',
  description: `Secure self-storage units in Melbourne CBD at 601 Little Collins Street. ${storageUnits.length} units from small lockers to large spaces, with flexible month-to-month terms. View sizes, photos and pricing.`,
  keywords: [
    'self storage Melbourne CBD',
    'storage units Melbourne',
    'storage 601 Little Collins',
    'cheap storage Melbourne city',
    'secure storage Melbourne',
  ],
  alternates: { canonical: '/the-archive' },
  openGraph: {
    title: `Self Storage Melbourne CBD — The Archive | ${SITE_NAME}`,
    description:
      'Secure self-storage units in Melbourne CBD at 601 Little Collins Street. Flexible month-to-month terms.',
    url: '/the-archive',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'The Archive', item: absoluteUrl('/the-archive') },
  ],
}

export default function TheArchivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArchiveClient />
    </>
  )
}
