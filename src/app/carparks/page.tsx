'use client'

import { useState, useMemo } from 'react'
import { FadeIn } from '@/components/ui/fade-in'
import { CarparkGrid } from '@/components/listings/CarparkGrid'
import { carparkBays, carparkSuburbs } from '@/data/carparks'
import {
  MapPin,
  Shield,
  Clock,
  Lock,
  Car,
  Building2,
  Phone,
  Mail,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const CONTACT = {
  phone: '+61 413 889 388',
  email: 'admin@touchwoodasset.com',
}

export default function CarparksPage() {
  const [suburb, setSuburb] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let items = [...carparkBays]
    if (suburb !== 'all') items = items.filter((b) => b.suburb === suburb)
    if (availability === 'available')
      items = items.filter((b) => b.status === 'AVAILABLE')
    if (availability === 'leased')
      items = items.filter((b) => b.status === 'LEASED')
    if (sort === 'price-asc')
      items.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    if (sort === 'price-desc')
      items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    // Default: available first, then coming soon, then leased
    if (sort === 'default') {
      const rank = { AVAILABLE: 0, COMING_SOON: 1, LEASED: 2 }
      items.sort(
        (a, b) =>
          (rank[a.status] ?? 3) - (rank[b.status] ?? 3) ||
          a.building.localeCompare(b.building)
      )
    }
    return items
  }, [suburb, availability, sort])

  const availableCount = carparkBays.filter(
    (b) => b.status === 'AVAILABLE'
  ).length

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[420px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carparks/255-drummond-st-carlton/bay-136/1.jpeg"
            alt="Secure car parking managed by Touchwood Asset Management"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 h-full flex flex-col justify-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Car Parks
            </h1>
            <div className="flex items-center text-xl md:text-2xl text-white/90 mb-6">
              <MapPin className="h-6 w-6 mr-2" />
              <span>Melbourne CBD &amp; inner suburbs</span>
            </div>
            <p className="text-lg text-white/80 max-w-2xl">
              Secure car parking across Carlton, Docklands, the CBD, South
              Wharf, South Yarra and more — managed by Touchwood Asset
              Management.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* About + contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Secure Parking, Sorted
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    Tired of circling the block? We manage a growing portfolio
                    of secure car park bays across Melbourne&apos;s most
                    convenient locations. Every bay offers secure access,
                    flexible month-to-month terms and a streamlined onboarding
                    process.
                  </p>
                  <p>
                    New bays become available regularly — if you can&apos;t see
                    the location you need, get in touch and we&apos;ll let you
                    know the moment something opens up.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                    { icon: Shield, label: 'Secure Access' },
                    { icon: Clock, label: '24/7 Entry' },
                    { icon: Car, label: 'All Vehicle Sizes' },
                    { icon: Lock, label: 'Monitored' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                        <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">
                          {feature.label}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-1">
              <FadeIn delay={0.3}>
                <Card className="p-6 sticky top-6 bg-gradient-to-br from-primary/5 to-brand-50/30">
                  <div className="flex items-center mb-4">
                    <Building2 className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Get in Touch
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Questions about a bay, pricing or availability? We&apos;re
                    here to help.
                  </p>
                  <div className="space-y-4">
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="flex items-center text-gray-900 hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      <span className="font-medium">{CONTACT.phone}</span>
                    </a>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-center text-gray-900 hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3" />
                      <span className="font-medium">{CONTACT.email}</span>
                    </a>
                  </div>
                  <Button asChild className="w-full mt-6" size="lg">
                    <a href="/contact">Contact Us</a>
                  </Button>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Bays */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Car Park Bays
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {availableCount} bay{availableCount !== 1 ? 's' : ''} currently
                available across {carparkSuburbs.length} suburbs.
              </p>
            </div>
          </FadeIn>

          {/* Filter bar */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 mb-8 bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3">
              <Select value={suburb} onValueChange={setSuburb}>
                <SelectTrigger className="w-44 bg-white text-gray-900 border-gray-300 text-sm h-9">
                  <SelectValue placeholder="All Suburbs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suburbs</SelectItem>
                  {carparkSuburbs.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="w-40 bg-white text-gray-900 border-gray-300 text-sm h-9">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bays</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="leased">Leased</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-48 bg-white text-gray-900 border-gray-300 text-sm h-9">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Available First</SelectItem>
                  <SelectItem value="price-asc">Price: Low → High</SelectItem>
                  <SelectItem value="price-desc">Price: High → Low</SelectItem>
                </SelectContent>
              </Select>

              <span className="ml-auto text-sm text-gray-500 hidden sm:block">
                Showing {filtered.length} of {carparkBays.length} bays
              </span>
            </div>
          </FadeIn>

          <CarparkGrid bays={filtered} />
        </div>
      </section>
    </div>
  )
}
