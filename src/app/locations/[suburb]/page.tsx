import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { listings } from '@/data/listings'
import { storageUnits, archiveFacility } from '@/data/storage-units'
import { MapPin, Car, Package, ArrowRight, Phone } from 'lucide-react'

interface SuburbConfig {
  displayName: string
  suburbMatch: string | string[]
  postcode: string
  title: string
  metaDescription: string
  intro: string
  hasStorage?: boolean
}

const suburbConfigs: Record<string, SuburbConfig> = {
  'east-melbourne': {
    displayName: 'East Melbourne',
    suburbMatch: 'East Melbourne',
    postcode: '3002',
    title: 'Car Parking & Property Management in East Melbourne',
    metaDescription:
      "Secure car parking and property management services in East Melbourne, VIC 3002. Near MCG, Jolimont Station, and Melbourne's medical precinct. View available spaces today.",
    intro:
      "East Melbourne sits just minutes from the CBD, bordered by Fitzroy Gardens to the north and the MCG precinct to the east. It's one of Melbourne's most sought-after inner suburbs for professionals working at St Vincent's Hospital, Epworth Freemasons, or the city centre — parking is genuinely competitive. Touchwood manages a portfolio of secure parking spaces at the Tribeca complex on Powlett Street, with 2.1m clearance and direct access from Wellington Parade. Whether you need monthly parking close to the hospitals or a long-term space near Jolimont Station, speak to our team.",
  },
  'south-melbourne': {
    displayName: 'South Melbourne',
    suburbMatch: 'South Melbourne',
    postcode: '3205',
    title: 'Car Parking & Property Services in South Melbourne',
    metaDescription:
      'Affordable secure car parking and property management in South Melbourne, VIC 3205. Near South Melbourne Market, Clarendon Street, and Albert Park Lake. Enquire now.',
    intro:
      "South Melbourne is a thriving inner suburb with a strong mix of residential apartments, boutique offices, and the beloved South Melbourne Market. Parking pressure is real here — Clarendon Street, the Market, and St Kilda Road offices all compete for limited street spots. Touchwood manages several car parks on Stead Street and Albert Road, offering undercover and open bays at transparent monthly rates. It's a practical solution for South Melbourne locals, market workers, or anyone commuting into the city via CityLink or St Kilda Road trams.",
  },
  'melbourne-cbd': {
    displayName: 'Melbourne CBD',
    suburbMatch: ['Melbourne'],
    postcode: '3000',
    title: 'Car Parking, Storage & Property Management in Melbourne CBD',
    metaDescription:
      'Secure car parking and self-storage units in Melbourne CBD. Car parks near Flagstaff Gardens and RMIT. Self-storage from $70/month at 601 Little Collins Street. Enquire today.',
    intro:
      "The Melbourne CBD is Australia's most densely developed commercial core — demand for every square metre is fierce. Touchwood operates car parking on Franklin Street (near Flagstaff Gardens, RMIT, and Queen Victoria Market) and manages The Archive, a modern self-storage facility inside the 601 Little Collins Street building. Storage units range from compact 2sqm lockers to commercial-scale 10sqm+ spaces, all with goods lift access and 7-day entry. If you're a CBD resident downsizing, a small business needing off-site stock space, or a professional tired of paying premium per-use parking, Touchwood has a cost-effective solution.",
    hasStorage: true,
  },
  'st-kilda': {
    displayName: 'St Kilda',
    suburbMatch: 'St Kilda',
    postcode: '3182',
    title: 'Car Parking & Property Management in St Kilda',
    metaDescription:
      'Secure car parking and property management services in St Kilda, VIC 3182. Queens Lane access, near St Kilda Beach, Luna Park, and Fitzroy Street. Enquire today.',
    intro:
      "St Kilda is Melbourne's most iconic bayside suburb — Luna Park, Fitzroy Street restaurants, Acland Street cafés, and the beach all draw enormous foot traffic that puts enormous pressure on residential parking. Touchwood manages a secure car park within St Kilda Tower, accessed via Queens Lane, ideally suited to local residents or workers who need a reliable monthly space in the heart of the suburb. If you're looking for property management or investment guidance in St Kilda, our team is equally at home here.",
  },
}

interface LocationPageProps {
  params: { suburb: string }
}

export function generateStaticParams() {
  return Object.keys(suburbConfigs).map((suburb) => ({ suburb }))
}

export function generateMetadata({ params }: LocationPageProps): Metadata {
  const config = suburbConfigs[params.suburb]
  if (!config) return { title: 'Not Found' }

  return {
    title: config.title,
    description: config.metaDescription,
    alternates: { canonical: `/locations/${params.suburb}` },
    openGraph: {
      title: `${config.title} | Touchwood`,
      description: config.metaDescription,
    },
  }
}

export default function LocationPage({ params }: LocationPageProps) {
  const config = suburbConfigs[params.suburb]
  if (!config) notFound()

  const suburbMatches = Array.isArray(config.suburbMatch)
    ? config.suburbMatch
    : [config.suburbMatch]

  const suburbListings = listings.filter((l) =>
    suburbMatches.includes(l.suburb)
  )

  const availableListings = suburbListings.filter(
    (l) => l.status === 'AVAILABLE' || l.status === 'FOR_RENT'
  )
  const otherListings = suburbListings.filter(
    (l) => l.status !== 'AVAILABLE' && l.status !== 'FOR_RENT'
  )

  const availableStorage = config.hasStorage
    ? storageUnits.filter((u) => u.status === 'AVAILABLE')
    : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Touchwood Asset Management',
    url: `https://touchwoodasset.com/locations/${params.suburb}`,
    areaServed: {
      '@type': 'Place',
      name: `${config.displayName}, Victoria, Australia`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: config.displayName,
        addressRegion: 'VIC',
        postalCode: config.postcode,
        addressCountry: 'AU',
      },
    },
    telephone: '+61413889388',
    email: 'admin@touchwoodasset.com',
  }

  const statusLabel: Record<string, string> = {
    AVAILABLE: 'Available',
    FOR_RENT: 'For Rent',
    LEASED: 'Leased',
    SOLD: 'Sold',
    UNDER_OFFER: 'Under Offer',
    COMING_SOON: 'Coming Soon',
  }

  const statusColor: Record<string, string> = {
    AVAILABLE: 'bg-green-600',
    FOR_RENT: 'bg-green-600',
    LEASED: 'bg-gray-500',
    SOLD: 'bg-gray-500',
    UNDER_OFFER: 'bg-amber-500',
    COMING_SOON: 'bg-blue-600',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
            <span>/</span>
            <span>{config.displayName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{config.title}</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            {config.intro}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Link href="/contact">Enquire Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="tel:+61413889388" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +61 413 889 388
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 py-16">

          {/* Available listings */}
          {availableListings.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-green-600 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Now in {config.displayName}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    statusLabel={statusLabel}
                    statusColor={statusColor}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Storage section for CBD */}
          {config.hasStorage && availableStorage.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Self-Storage at 601 Little Collins Street
                </h2>
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl">
                The Archive is Touchwood's CBD storage facility — secure, climate-controlled units from 2sqm to 10sqm+, starting from $70/month. Goods lift access, 7-day entry, individual locks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {availableStorage.slice(0, 6).map((unit) => (
                  <Link
                    key={unit.id}
                    href={`/the-archive/${unit.id}`}
                    className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        Unit {unit.unitNumber}
                      </span>
                      <Badge className="bg-green-600 text-white text-xs">Available</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" />
                        {unit.size}sqm
                      </span>
                      <span className="font-medium text-gray-900">${unit.price}/mo</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-1">{unit.description}</p>
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline">
                <Link href="/the-archive" className="flex items-center gap-2">
                  View All Storage Units
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </section>
          )}

          {/* Past/leased listings */}
          {otherListings.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-gray-400 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Activity in {config.displayName}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    statusLabel={statusLabel}
                    statusColor={statusColor}
                  />
                ))}
              </div>
            </section>
          )}

          {/* CTA strip */}
          <section className="bg-white rounded-xl border p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need something in {config.displayName}?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Whether it's parking, storage, leasing advice, or an investment appraisal — our team is active in this area and responds within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/listings" className="flex items-center gap-2">
                  Browse All Listings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}

function ListingCard({
  listing,
  statusLabel,
  statusColor,
}: {
  listing: (typeof listings)[number]
  statusLabel: Record<string, string>
  statusColor: Record<string, string>
}) {
  const formatPrice = () => {
    if (!listing.price) return 'POA'
    if (listing.pricePeriod === 'per_month') return `$${listing.price.toLocaleString()}/mo`
    if (listing.pricePeriod === 'per_week') return `$${listing.price.toLocaleString()}/wk`
    return `$${listing.price.toLocaleString()}`
  }

  const typeIcon =
    listing.category === 'car-park' ? (
      <Car className="h-3.5 w-3.5" />
    ) : listing.category === 'storage-cage' ? (
      <Package className="h-3.5 w-3.5" />
    ) : null

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={listing.heroImageUrl}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge
            className={`${statusColor[listing.status] ?? 'bg-gray-500'} text-white text-xs`}
          >
            {statusLabel[listing.status] ?? listing.status}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-lg font-bold text-gray-900">{formatPrice()}</span>
          {typeIcon && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              {typeIcon}
              {listing.category === 'car-park' ? 'Car Park' : 'Storage'}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors text-sm">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="line-clamp-1">{listing.address}, {listing.suburb}</span>
        </div>
      </div>
    </Link>
  )
}
