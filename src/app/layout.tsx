import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/providers/auth-provider'
import { PageTransition } from '@/components/ui/page-transition'
import { Suspense } from 'react'
import { HideOnFunnel } from '@/components/layout/HideOnFunnel'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { AttributionCapture } from '@/components/analytics/AttributionCapture'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SITE_URL, SITE_NAME, CONTACT, SAME_AS, absoluteUrl } from '@/lib/site'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Touchwood Asset Management - Residential & Commercial Property',
    template: '%s | Touchwood Asset Management'
  },
  description: 'Leading property management company specializing in residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
  keywords: ['property management', 'real estate', 'residential sales', 'commercial rentals', 'Melbourne property', 'Victoria real estate'],
  authors: [{ name: 'Touchwood Asset Management' }],
  creator: 'Touchwood Asset Management',
  publisher: 'Touchwood Asset Management',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  // NOTE: no `alternates.canonical` here on purpose. Next.js merges layout
  // metadata into child pages, so a canonical set at the root would be
  // inherited by every page that does not declare its own — pointing them all
  // at the homepage and de-indexing them. Each page sets its own canonical.
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    title: 'Touchwood Asset Management - Residential & Commercial Property',
    description: 'Leading property management company specializing in residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
    siteName: 'Touchwood Asset Management',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Touchwood Asset Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Touchwood Asset Management - Residential & Commercial Property',
    description: 'Leading property management company specializing in residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
    images: ['/og-image.jpg'],
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token Search Console gives
  // you under "HTML tag" verification.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              // RealEstateAgent is a LocalBusiness subtype — more specific types
              // give Google a stronger entity signal than bare LocalBusiness.
              '@type': 'RealEstateAgent',
              '@id': absoluteUrl('/#organization'),
              name: SITE_NAME,
              url: SITE_URL,
              logo: absoluteUrl('/logo-touchwood.png'),
              image: absoluteUrl('/og-image.jpg'),
              telephone: CONTACT.phone,
              email: CONTACT.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1423/1 Queens Road',
                addressLocality: 'Melbourne',
                addressRegion: 'VIC',
                postalCode: '3004',
                addressCountry: 'AU',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -37.8399,
                longitude: 144.9690,
              },
              areaServed: [
                'Melbourne CBD',
                'East Melbourne',
                'South Melbourne',
                'St Kilda',
                'Carlton',
                'Docklands',
                'Southbank',
                'Fawkner',
              ].map((name) => ({ '@type': 'Place', name: `${name}, VIC, Australia` })),
              priceRange: '$$',
              openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
              ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
              // Naming the service lines explicitly helps Google associate the
              // entity with all three categories, not just residential.
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Property services',
                itemListElement: [
                  ['Residential property management', '/landlords'],
                  ['Commercial property leasing', '/services'],
                  ['Car park bay rental', '/carparks'],
                  ['Self storage', '/the-archive'],
                  ['Free investment property review', '/property-review'],
                ].map(([name, path]) => ({
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name, url: absoluteUrl(path) },
                })),
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <HideOnFunnel>
              <Navigation />
            </HideOnFunnel>
            <main className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <HideOnFunnel>
              <Footer />
            </HideOnFunnel>
          </div>
          <Toaster />
        </AuthProvider>
        {/* Loaded only when the measurement ID is configured, so local and
            preview builds don't pollute the production property. */}
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
        {/* Both read search params; Suspense keeps the rest of the tree static. */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>
      </body>
    </html>
  )
}
