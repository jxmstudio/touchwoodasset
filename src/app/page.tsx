'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'

import { VideoHero } from '@/components/hero/VideoHero'
import { HeroSplit } from '@/components/marketing/HeroSplit'
import { ListingsCarousel } from '@/components/listings/ListingsCarousel'
import { OwnerPromo } from '@/components/OwnerPromo'
import { listings } from '@/data/listings'
import { Building2, Star, Phone, Mail, Users, TrendingUp } from 'lucide-react'

// Get featured listings from real data - mix of residential and commercial properties
const featuredListings = listings
  .filter(
    (listing) =>
      listing.category === 'properties' ||
      listing.type === 'RESIDENTIAL' ||
      listing.type === 'COMMERCIAL'
  )
  .slice(0, 4)

// Testimonials
const testimonials = [
  {
    id: '1',
    quote:
      'Touchwood made our property investment journey seamless. Their expertise in the Melbourne market is unmatched.',
    author: 'Sarah Chen',
    role: 'Property Investor',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'Professional service from start to finish. They found us the perfect commercial space for our business.',
    author: 'Michael Roberts',
    role: 'Business Owner',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'Outstanding property management services. They take care of everything so we don&apos;t have to worry.',
    author: 'Lisa Wong',
    role: 'Property Owner',
    rating: 5,
  },
]

// Statistics
const stats = [
  {
    number: '500+',
    label: 'Properties Managed',
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    number: '15+',
    label: 'Years Experience',
    icon: <Users className="h-6 w-6" />,
  },
  {
    number: '98%',
    label: 'Client Satisfaction',
    icon: <Star className="h-6 w-6" />,
  },
  {
    number: '$2.5B+',
    label: 'Sales Volume',
    icon: <TrendingUp className="h-6 w-6" />,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Video Hero Section */}
      <VideoHero
        videoSrc="/videos/landing.mp4"
        posterImage="/images/hero-poster.jpg"
        title="Your Property Journey Starts Here"
        subtitle="Touchwood Asset Management"
        description="Discover exceptional properties and expert real estate services across Melbourne and Victoria. We're here to help you buy, sell, or invest with confidence."
        ctaText="Explore Properties"
        ctaLink="/listings"
        autoPlay={true}
        loop={true}
        muted={true}
      />

      {/* Hero Split Section */}
      <HeroSplit />

      {/* Featured Listings Carousel */}
      <ListingsCarousel
        listings={featuredListings}
        title="Featured Properties"
        subtitle="Discover our handpicked selection of premium properties"
        showViewAll={true}
        autoPlay={true}
      />

      {/* Stats Section - Soft and Spacious */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trusted by Melbourne&apos;s Property Owners
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our track record speaks for itself
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <motion.div
                  className="text-center group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl mb-4 text-primary group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Soft Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                What Our Clients Say
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Trusted by property owners and investors across Victoria
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 h-full bg-white border-0 shadow-lg">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-foreground mb-6 italic text-lg leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Owner Promo Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <OwnerPromo />
        </div>
      </section>

      {/* CTA Section - Soft and Inviting */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-brand-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Whether you&apos;re looking to buy, sell, rent, or manage
                property, our expert team is here to help you achieve your real
                estate goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-black shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4 h-auto font-bold border border-gray-300"
                >
                  <a href="/contact" className="text-black hover:text-black">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us Today
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white hover:text-foreground border-2 border-white/70 hover:border-white text-lg px-8 py-4 h-auto backdrop-blur-sm [&_*]:text-inherit"
                >
                  <a href="/valuation" className="text-inherit">
                    <Mail className="mr-2 h-5 w-5" />
                    Free Property Valuation
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
