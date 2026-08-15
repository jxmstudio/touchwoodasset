import type { Metadata } from 'next'
import HomeClient from './HomeClient'
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Melbourne Property Management, Car Parks & Storage',
  description:
    'Touchwood Asset Management manages residential and commercial property, secure car park bays and self-storage across Melbourne. 220+ assets under management. Book a free property review.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `Melbourne Property Management, Car Parks & Storage | ${SITE_NAME}`,
    description:
      'Touchwood Asset Management manages residential and commercial property, secure car park bays and self-storage across Melbourne. Book a free property review.',
    url: '/',
  },
}

// WebSite entity, tied to the RealEstateAgent declared in the root layout via
// @id. The previous version of this block carried a hardcoded aggregateRating
// (5 stars / 3 reviews); self-serving review markup about your own business
// breaches Google's structured data policy, so it has been removed.
const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': absoluteUrl('/#organization') },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: absoluteUrl('/listings?q={search_term_string}'),
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <HomeClient />
    </>
  )
}
