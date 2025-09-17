'use client'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import { ListingGallery } from '@/components/listings/ListingGallery'
import { ApplyModal } from '@/components/common/ApplyModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn } from '@/components/ui/fade-in'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler, 
  Calendar,
  ArrowLeft,
  Share2,
  Heart,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { listings } from '@/data/listings'

// Use central dataset
const mockListings = listings

interface ListingDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ListingDetailPageProps): Promise<Metadata> {
  const listing = mockListings.find(l => l.slug === params.slug)
  
  if (!listing) {
    return {
      title: 'Property Not Found - Touchwood Asset Management',
      description: 'The requested property could not be found.'
    }
  }

  return {
    title: `${listing.title} - Touchwood Asset Management`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.heroImageUrl],
    },
  }
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const listing = mockListings.find(l => l.slug === params.slug)

  if (!listing) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-500 text-white'
      case 'UNDER_OFFER':
        return 'bg-yellow-500 text-white'
      case 'SOLD':
        return 'bg-red-500 text-white'
      case 'LEASED':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'RESIDENTIAL':
        return 'bg-blue-100 text-blue-800'
      case 'COMMERCIAL':
        return 'bg-purple-100 text-purple-800'
      case 'ANCILLARY':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/listings" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <FadeIn>
              {/* Gallery */}
              <div className="mb-8">
                <ListingGallery images={listing.gallery} title={listing.title} />
              </div>

              {/* Property Details */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl font-bold mb-2">{listing.title}</CardTitle>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{listing.address}, {listing.suburb}, {listing.state}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(listing.status)}>
                        {listing.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getTypeColor(listing.type)}>
                        {listing.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-primary mb-4">
                    {formatPrice(listing.price)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-700 mb-6">{listing.description}</p>
                  
                  {/* Property Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {listing.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm">{listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {listing.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm">{listing.bathrooms} bath{listing.bathrooms > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {listing.carSpaces && (
                      <div className="flex items-center">
                        <Car className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm">{listing.carSpaces} car{listing.carSpaces > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {listing.floorAreaSqm && (
                      <div className="flex items-center">
                        <Ruler className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm">{listing.floorAreaSqm}m²</span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {listing.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.2}>
              {/* Contact Agent */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-primary">
                        {listing.agent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-semibold">{listing.agent.name}</h3>
                    <p className="text-sm text-gray-600">Property Specialist</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Call {listing.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Email Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Secure Application for Car Park/Storage */}
              {(listing.category === 'car-park' || listing.category === 'storage-cage') && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Secure Application
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Apply securely for this {listing.category === 'car-park' ? 'car park' : 'storage cage'}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setIsApplyModalOpen(true)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Your application will be processed securely
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Property Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property ID:</span>
                      <span className="font-medium">{listing.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listed:</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{listing.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        listingId={listing.id}
        listingTitle={listing.title}
        category={listing.category as 'car-park' | 'storage-cage'}
      />
    </div>
  )
}
