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
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
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
