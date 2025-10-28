'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
import { StorageUnit, archiveFacility } from '@/data/storage-units'
import {
  MapPin,
  Maximize2,
  ArrowLeft,
  CheckCircle,
  Phone,
  Mail,
  Building2,
} from 'lucide-react'

interface StorageUnitDetailClientProps {
  unit: StorageUnit
}

export function StorageUnitDetailClient({
  unit,
}: StorageUnitDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-500 hover:bg-green-600'
      case 'LEASED':
        return 'bg-gray-500 hover:bg-gray-600'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/the-archive">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to The Archive
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <section className="bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            {/* Main Image */}
            <div className="relative aspect-video md:aspect-[21/9] rounded-xl overflow-hidden mb-4 bg-gray-100">
              <Image
                src={unit.images[selectedImage]}
                alt={`${unit.unitNumber} - View ${selectedImage + 1}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>

            {/* Thumbnail Gallery */}
            {unit.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {unit.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Unit Details */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <FadeIn>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-3xl font-bold mb-2">
                          {unit.unitNumber}
                        </CardTitle>
                        <div className="flex items-center text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Maximize2 className="h-4 w-4 mr-1" />
                            <span>{unit.size} sqm</span>
                          </div>
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            <span>{unit.floor}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(unit.status)}>
                        {unit.status}
                      </Badge>
                    </div>

                    <div className="text-4xl font-bold text-primary mt-4">
                      ${unit.price}
                      <span className="text-lg font-normal text-gray-600 ml-2">
                        / month
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-start text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">The Archive</div>
                        <div>
                          {archiveFacility.address}, {archiveFacility.suburb}{' '}
                          {archiveFacility.state} {archiveFacility.postcode}
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
                    <CardTitle>About This Unit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {unit.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Features */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {unit.features.map((feature, index) => (
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
              {unit.videoUrl && (
                <FadeIn delay={0.3}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Unit Tour</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={unit.videoUrl}
                          title={`${unit.unitNumber} Tour`}
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

            {/* Sidebar - Contact Card */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.4}>
                <Card className="sticky top-6">
                  <CardHeader className="bg-gradient-to-br from-primary/5 to-brand-50/30">
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      Enquire About This Unit
                    </CardTitle>
                    <CardDescription>
                      Contact us to arrange a viewing or get more information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    {/* Contact Details */}
                    <div className="space-y-4">
                      <a
                        href={`tel:${archiveFacility.contact.phone}`}
                        className="flex items-center text-gray-900 hover:text-primary transition-colors group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mr-3">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Call us</div>
                          <div className="font-medium">
                            {archiveFacility.contact.phone}
                          </div>
                        </div>
                      </a>

                      <a
                        href={`mailto:${archiveFacility.contact.email}?subject=Enquiry about ${unit.unitNumber}`}
                        className="flex items-center text-gray-900 hover:text-primary transition-colors group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mr-3">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Email us</div>
                          <div className="font-medium">
                            {archiveFacility.contact.email}
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* Status Info */}
                    <div className="pt-6 border-t">
                      {unit.status === 'AVAILABLE' ? (
                        <div className="text-center">
                          <div className="text-green-600 font-semibold mb-2">
                            ✓ Available Now
                          </div>
                          <p className="text-sm text-gray-600">
                            This unit is ready for immediate lease
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-gray-600 font-semibold mb-2">
                            Currently Leased
                          </div>
                          <p className="text-sm text-gray-600">
                            Contact us to join the waitlist or view similar
                            units
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 pt-4">
                      <Button asChild className="w-full" size="lg">
                        <a href="/contact">Schedule Viewing</a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                        size="lg"
                      >
                        <Link href="/the-archive">View All Units</Link>
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
