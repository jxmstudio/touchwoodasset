import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/providers/auth-provider'
import { PageTransition } from '@/components/ui/page-transition'

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
  metadataBase: new URL((process.env.NEXTAUTH_URL || 'https://touchwoodasset.com').replace(/\/$/, '')),
  alternates: {
    canonical: '/',
  },
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
              '@type': 'LocalBusiness',
              name: 'Touchwood Asset Management',
              url: 'https://touchwoodasset.com',
              logo: 'https://touchwoodasset.com/logo-touchwood.png',
              telephone: '+61413889388',
              email: 'admin@touchwoodasset.com',
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
              areaServed: {
                '@type': 'Place',
                name: 'Melbourne, Victoria, Australia',
              },
              priceRange: '$$',
              openingHours: 'Mo-Fr 09:00-17:00',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
