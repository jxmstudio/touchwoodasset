import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Users, Shield, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { Section } from '@/components/ui/section'
import { ServiceFeatureComparison } from '@/components/ServiceFeatureComparison'
import { ServiceSection } from '@/components/services/ServiceSection'
import { ContactStrip } from '@/components/common/ContactStrip'

export const metadata: Metadata = {
  title: 'Services - Touchwood Asset Management',
  description:
    'Comprehensive property management services including residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
  openGraph: {
    title: 'Services - Touchwood Asset Management',
    description:
      'Comprehensive property management services including residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
  },
}

const services = [
  {
    id: 'residential',
    title: 'Residential Sales & Rentals',
    intro:
      'Comprehensive residential property services including sales, leasing, and property management for houses, apartments, and townhouses across Melbourne.',
    imageSrc: '/image.png',
    imageAlt: 'Modern residential property for sale and rent',
    whatWeOffer: [
      'Property sales and marketing',
      'Tenant screening and placement',
      'Rent collection and management',
      'Property maintenance coordination',
      'Regular property inspections',
      'Financial reporting and statements',
      'Legal compliance management',
      '24/7 tenant support',
    ],
    keyBenefits: [
      'Maximize rental returns',
      'Professional tenant management',
      'Reduced vacancy periods',
      'Comprehensive property care',
      'Legal compliance assurance',
      'Detailed financial reporting',
    ],
    ctaText: 'Explore Residential Properties',
    ctaLink: '/listings?category=properties&type=residential',
  },
  {
    id: 'commercial',
    title: 'Commercial Rentals',
    intro:
      'Expert commercial property leasing and management for businesses of all sizes, from small offices to large retail spaces.',
    imageSrc: '/image(1).png',
    imageAlt: 'Modern commercial office building',
    whatWeOffer: [
      'Commercial property leasing',
      'Business tenant acquisition',
      'Lease negotiation and management',
      'Property maintenance and repairs',
      'Utility and service management',
      'Insurance and compliance',
      'Financial reporting and analysis',
      'Strategic property planning',
    ],
    keyBenefits: [
      'Optimize commercial returns',
      'Professional business relationships',
      'Reduced vacancy risk',
      'Comprehensive property maintenance',
      'Strategic growth planning',
      'Expert lease management',
    ],
    ctaText: 'View Commercial Spaces',
    ctaLink: '/listings?category=properties&type=commercial',
  },
  {
    id: 'ancillary',
    title: 'Ancillary Rentals',
    intro:
      "Specialized services for car parks, storage units, and other ancillary property needs to maximize your property's income potential.",
    imageSrc: '/image(2).png',
    imageAlt: 'Secure car park and storage facilities',
    whatWeOffer: [
      'Car park leasing and management',
      'Storage unit rentals',
      'Specialized property solutions',
      'Access control systems',
      'Security and monitoring',
      'Maintenance and cleaning',
      'Billing and collection',
      'Customer service support',
    ],
    keyBenefits: [
      'Maximize ancillary income',
      'Specialized expertise',
      'Enhanced security measures',
      'Professional management',
      'Increased property value',
      'Comprehensive service delivery',
    ],
    ctaText: 'Browse Ancillary Services',
    ctaLink: '/listings?category=car-park',
  },
]

const additionalServices = [
  {
    title: 'Property Valuation',
    description:
      'Professional property valuations for sales, refinancing, and investment purposes.',
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
    description:
      'Strategic advice for property investment and portfolio optimization.',
    icon: Users,
    href: '/contact',
  },
]

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Property Management Services',
    description:
      'Comprehensive property management services including residential sales & rentals, commercial rentals, and ancillary rentals across Melbourne and Victoria.',
    provider: {
      '@type': 'Organization',
      name: 'Touchwood Asset Management',
      url: 'https://touchwoodasset.com',
      logo: 'https://touchwoodasset.com/logo-touchwood.png',
    },
    serviceType: 'Property Management',
    areaServed: {
      '@type': 'Place',
      name: 'Melbourne, Victoria, Australia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Property Management Services',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.intro,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Comprehensive asset management solutions — tailored to you.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact Strip - Top */}
        <ContactStrip variant="primary" />

        {/* Main Services */}
        <Section
          title="Core Services"
          subtitle="From residential rentals to commercial properties, storage, and carparks, we provide end-to-end management designed to maximise your returns and minimise your stress. Partner with us today and experience the difference of a boutique agency that puts your property first."
        >
          <div className="space-y-20">
            {services.map((service, index) => (
              <ServiceSection
                key={service.id}
                title={service.title}
                intro={service.intro}
                imageSrc={service.imageSrc}
                imageAlt={service.imageAlt}
                whatWeOffer={service.whatWeOffer}
                keyBenefits={service.keyBenefits}
                ctaText={service.ctaText}
                ctaLink={service.ctaLink}
                reverse={index % 2 === 1}
                priority={index === 0}
              />
            ))}
          </div>
        </Section>

        {/* Additional Services */}
        <Section
          title="Additional Services"
          subtitle="Specialized services to support your property investment journey"
          className="bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-5xl mx-auto gap-8">
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
          subtitle="We deliver more than property management — we deliver confidence, results, and peace of mind. Our expertise, innovation, and client-first approach ensure your property is in the best hands."
          className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(225,38,43,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-30"></div>

          {/* Decorative divider line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <FadeIn delay={0}>
              <div className="group text-center p-6 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  🔑 Expert Team
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our experienced professionals bring in-depth knowledge of the
                  Melbourne market and a proven ability to maximise value. We
                  treat every asset as if it were our own.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="group text-center p-6 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  🛡 Trusted & Reliable
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  With over 25 years of experience, Touchwood has earned a
                  reputation built on transparency, reliability, and consistent
                  results. Clients trust us to protect and grow their
                  investments.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="group text-center p-6 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Clock className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  ⏰ 24/7 Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We&apos;re here whenever you need us — offering
                  round-the-clock support and quick response times, so
                  you&apos;ll never feel alone managing your property.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="group text-center p-6 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  📈 Proven Results
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our data-driven approach and proven strategies consistently
                  deliver superior returns and market performance for our
                  clients&apos; property portfolios.
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

        {/* Contact Strip - Bottom */}
        <ContactStrip variant="secondary" />
      </div>
    </>
  )
}
