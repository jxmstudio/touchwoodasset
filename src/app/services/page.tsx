import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, Building2, Car, Users, Shield, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { Section } from '@/components/ui/section'
import { ServiceFeatureComparison } from '@/components/ServiceFeatureComparison'

export const metadata: Metadata = {
  title: 'Services - Touchwood Asset Management',
  description: 'Comprehensive property management services including residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
  openGraph: {
    title: 'Services - Touchwood Asset Management',
    description: 'Comprehensive property management services including residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
  },
}

const services = [
  {
    id: 'residential',
    title: 'Residential Sales & Rentals',
    description: 'Comprehensive residential property services including sales, leasing, and property management.',
    icon: Home,
    image: '/images/services/residential.png',
    features: [
      'Property sales and marketing',
      'Tenant screening and placement',
      'Rent collection and management',
      'Property maintenance coordination',
      'Regular property inspections',
      'Financial reporting and statements',
      'Legal compliance management',
      '24/7 tenant support',
    ],
    benefits: [
      'Maximize rental returns',
      'Professional tenant management',
      'Reduced vacancy periods',
      'Comprehensive property care',
      'Legal compliance assurance',
      'Detailed financial reporting',
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial Rentals',
    description: 'Expert commercial property leasing and management for businesses of all sizes.',
    icon: Building2,
    image: '/images/services/commercial.png',
    features: [
      'Commercial property leasing',
      'Business tenant acquisition',
      'Lease negotiation and management',
      'Property maintenance and repairs',
      'Utility and service management',
      'Insurance and compliance',
      'Financial reporting and analysis',
      'Strategic property planning',
    ],
    benefits: [
      'Optimize commercial returns',
      'Professional business relationships',
      'Reduced vacancy risk',
      'Comprehensive property maintenance',
      'Strategic growth planning',
      'Expert lease management',
    ],
  },
  {
    id: 'ancillary',
    title: 'Ancillary Rentals',
    description: 'Specialized services for car parks, storage units, and other ancillary property needs.',
    icon: Car,
    image: '/images/services/ancillary.png',
    features: [
      'Car park leasing and management',
      'Storage unit rentals',
      'Specialized property solutions',
      'Access control systems',
      'Security and monitoring',
      'Maintenance and cleaning',
      'Billing and collection',
      'Customer service support',
    ],
    benefits: [
      'Maximize ancillary income',
      'Specialized expertise',
      'Enhanced security measures',
      'Professional management',
      'Increased property value',
      'Comprehensive service delivery',
    ],
  },
]

const additionalServices = [
  {
    title: 'Property Valuation',
    description: 'Professional property valuations for sales, refinancing, and investment purposes.',
    icon: TrendingUp,
    href: '/valuation',
  },
  {
    title: 'Property Inspections',
    description: 'Comprehensive property inspections and condition reports.',
    icon: Shield,
    href: '/inspection',
  },
  {
    title: 'Investment Advisory',
    description: 'Strategic advice for property investment and portfolio optimization.',
    icon: Users,
    href: '/contact',
  },
  {
    title: 'Legal Support',
    description: 'Expert legal guidance for property transactions and compliance.',
    icon: CheckCircle,
    href: '/contact',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Comprehensive property management solutions tailored to your needs
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Services */}
      <Section 
        title="Core Services" 
        subtitle="We offer a full range of property management services to meet all your needs"
      >
        <div className="space-y-20">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              <FadeIn delay={index * 0.2}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-lg text-gray-700 mb-8">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What We Offer</h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {service.benefits.slice(0, 3).map((benefit) => (
                          <li key={benefit} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-brand-600">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </FadeIn>
              
              <FadeIn delay={(index * 0.2) + 0.1}>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg relative group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </Section>

      {/* Additional Services */}
      <Section 
        title="Additional Services" 
        subtitle="Specialized services to support your property investment journey"
        className="bg-gray-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalServices.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base mb-4">
                    {service.description}
                  </CardDescription>
                  <Link href={service.href}>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section 
        title="Why Choose Touchwood?" 
        subtitle="We combine expertise, technology, and personalized service to deliver exceptional results"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0}>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Our experienced professionals have deep knowledge of the Melbourne property market 
                and are committed to your success.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted & Reliable</h3>
              <p className="text-gray-600">
                With over 15 years in business, we've built a reputation for reliability, 
                transparency, and exceptional service.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                We're always here when you need us, providing round-the-clock support 
                for all your property management needs.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Service Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceFeatureComparison />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-brand-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Let us help you maximize your property investment with our comprehensive 
              management services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-gray-900 font-semibold">
                  Contact Us Today
                </Button>
              </Link>
              <Link href="/listings">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
                  View Our Properties
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
