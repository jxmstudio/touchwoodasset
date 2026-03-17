import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Melbourne Suburbs We Serve',
  description:
    "Touchwood Asset Management provides car parking, self-storage, and property management services across Melbourne's inner suburbs — East Melbourne, South Melbourne, CBD, and St Kilda.",
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'Melbourne Suburbs We Serve | Touchwood',
    description:
      "Touchwood Asset Management provides car parking, self-storage, and property management services across Melbourne's inner suburbs.",
  },
}

const suburbs = [
  {
    slug: 'east-melbourne',
    name: 'East Melbourne',
    postcode: '3002',
    description:
      "Secure car parking at Tribeca, 211 Powlett Street — near MCG, Jolimont Station, and Melbourne's medical precinct.",
    tags: ['Car Parking', 'Near MCG', 'Near Hospitals'],
  },
  {
    slug: 'south-melbourne',
    name: 'South Melbourne',
    postcode: '3205',
    description:
      'Undercover and open car park bays near South Melbourne Market, Clarendon Street, and Albert Park Lake.',
    tags: ['Car Parking', 'Near Market', 'CBD Access'],
  },
  {
    slug: 'melbourne-cbd',
    name: 'Melbourne CBD',
    postcode: '3000',
    description:
      'Car parking on Franklin Street and self-storage units at The Archive, 601 Little Collins Street — from $70/month.',
    tags: ['Car Parking', 'Self-Storage', 'CBD'],
  },
  {
    slug: 'st-kilda',
    name: 'St Kilda',
    postcode: '3182',
    description:
      "Secure parking inside St Kilda Tower via Queens Lane — ideal for local residents and workers in Melbourne's bayside suburb.",
    tags: ['Car Parking', 'Near Beach', 'Fitzroy Street'],
  },
]

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Melbourne Suburbs We Serve
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Touchwood manages car parking, storage, and property across Melbourne&apos;s inner suburbs. Select your suburb to see what&apos;s available.
          </p>
        </div>
      </section>

      {/* Suburb cards */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suburbs.map((suburb) => (
            <Link
              key={suburb.slug}
              href={`/locations/${suburb.slug}`}
              className="group bg-white rounded-xl border p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {suburb.name}
                    </h2>
                    <span className="text-sm text-gray-500">VIC {suburb.postcode}</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {suburb.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {suburb.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-white rounded-xl border p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Don&apos;t see your suburb?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            We regularly take on new properties across Melbourne and Victoria. Get in touch and we&apos;ll let you know what we can do for your area.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
