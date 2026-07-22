'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/fade-in'
import { CarparkBay } from '@/data/carparks'
import {
  MapPin,
  ArrowLeft,
  CheckCircle,
  Phone,
  Mail,
  Building2,
  Car,
} from 'lucide-react'

interface CarparkDetailClientProps {
  bay: CarparkBay
}

const CONTACT = {
  phone: '+61 413 889 388',
  email: 'admin@touchwoodasset.com',
}

// Convert YouTube URLs to embed format
function getYouTubeEmbedUrl(url: string): string {
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }
  return url
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  AVAILABLE: { label: 'AVAILABLE', className: 'bg-green-500 hover:bg-green-600' },
  LEASED: { label: 'LEASED', className: 'bg-gray-500 hover:bg-gray-600' },
  COMING_SOON: { label: 'COMING SOON', className: 'bg-gray-700 hover:bg-gray-800' },
}

export function CarparkDetailClient({ bay }: CarparkDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const badge = STATUS_BADGE[bay.status] ?? STATUS_BADGE.AVAILABLE

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/carparks">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Car Parks
            </Link>
          </Button>
        </div>
      </div>

      {/* Gallery — object-contain so watermark/logo never crops */}
      <section className="bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-gray-100">
              <Image
                src={bay.images[selectedImage]}
                alt={`Bay ${bay.bayNumber} - View ${selectedImage + 1}`}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>

            {bay.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {bay.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 bg-gray-50 transition-all ${
                      selectedImage === index
                        ? 'border-primary scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Details */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <FadeIn>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-3xl font-bold mb-2">
                          Bay {bay.bayNumber}
                        </CardTitle>
                        <div className="flex items-center text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            <span>{bay.building}</span>
                          </div>
                          {bay.clearance && (
                            <div className="flex items-center">
                              <Car className="h-4 w-4 mr-1" />
                              <span>{bay.clearance} clearance</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge className={badge.className}>{badge.label}</Badge>
                    </div>

                    {bay.price ? (
                      <div className="text-4xl font-bold text-primary mt-4">
                        ${bay.price}
                        <span className="text-lg font-normal text-gray-600 ml-2">
                          / month
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-gray-700 mt-4">
                        Contact for price
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-start text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">{bay.building}</div>
                        <div>
                          {bay.address}, {bay.suburb} {bay.state}{' '}
                          {bay.postcode}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>About This Bay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {bay.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Features */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {bay.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Video */}
              {bay.videoUrl && (
                <FadeIn delay={0.3}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Bay Tour</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={getYouTubeEmbedUrl(bay.videoUrl)}
                          title={`Bay ${bay.bayNumber} Tour`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.4}>
                <Card className="sticky top-6">
                  <CardHeader className="bg-gradient-to-br from-primary/5 to-brand-50/30">
                    <CardTitle className="flex items-center">
                      <Car className="h-5 w-5 mr-2" />
                      Enquire About This Bay
                    </CardTitle>
                    <CardDescription>
                      Contact us for pricing, availability or to arrange a
                      viewing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                      <a
                        href={`tel:${CONTACT.phone}`}
                        className="flex items-center text-gray-900 hover:text-primary transition-colors group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mr-3">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Call us</div>
                          <div className="font-medium">{CONTACT.phone}</div>
                        </div>
                      </a>

                      <a
                        href={`mailto:${CONTACT.email}?subject=Enquiry about car park bay ${bay.bayNumber} at ${bay.address}`}
                        className="flex items-center text-gray-900 hover:text-primary transition-colors group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mr-3">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Email us</div>
                          <div className="font-medium">{CONTACT.email}</div>
                        </div>
                      </a>
                    </div>

                    {/* Status Info */}
                    <div className="pt-6 border-t">
                      {bay.status === 'AVAILABLE' ? (
                        <div className="text-center">
                          <div className="text-green-600 font-semibold mb-2">
                            ✓ Available Now
                          </div>
                          <p className="text-sm text-gray-600">
                            This bay is ready for immediate lease
                          </p>
                        </div>
                      ) : bay.availableFrom ? (
                        <div className="text-center">
                          <div className="text-primary font-semibold mb-2">
                            Available from{' '}
                            {new Date(bay.availableFrom).toLocaleDateString(
                              'en-AU',
                              { day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Currently tenanted — enquire now to secure it
                          </p>
                        </div>
                      ) : bay.status === 'COMING_SOON' ? (
                        <div className="text-center">
                          <div className="text-gray-700 font-semibold mb-2">
                            Coming Soon
                          </div>
                          <p className="text-sm text-gray-600">
                            Enquire now to be first in line
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-gray-600 font-semibold mb-2">
                            Currently Leased
                          </div>
                          <p className="text-sm text-gray-600">
                            Contact us to join the waitlist or view similar
                            bays
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button asChild className="w-full" size="lg">
                        <a href="/contact">Enquire Now</a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                        size="lg"
                      >
                        <Link href="/carparks">View All Car Parks</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
