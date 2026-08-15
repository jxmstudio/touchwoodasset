import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Archive — Storage at 601 Little Collins St',
  description: 'Self-storage units at 601 Little Collins St, Melbourne CBD. Secure, flexible storage for residents & businesses. View available units and pricing online.',
  // No `alternates.canonical` here: layout metadata is inherited by every route
  // beneath it, so a canonical set at this level pointed all /the-archive/[unitId]
  // detail pages at the section index and de-indexed them. Each page sets its own.
  openGraph: {
    title: 'The Archive — Storage at 601 Little Collins St | Touchwood',
    description: 'Self-storage units at 601 Little Collins St, Melbourne CBD. Secure, flexible storage for residents & businesses. View available units and pricing online.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SelfStorageFacility',
  name: 'The Archive — Touchwood Storage',
  url: 'https://touchwoodasset.com/the-archive',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '601 Little Collins Street',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    postalCode: '3000',
    addressCountry: 'AU',
  },
  telephone: '+61413889388',
  openingHours: 'Mo-Fr 09:00-17:00',
}

export default function TheArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
