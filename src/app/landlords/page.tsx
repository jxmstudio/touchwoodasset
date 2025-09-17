import { Metadata } from 'next'
import { VideoHero } from '@/components/hero/VideoHero'
import { BookingCalendar } from '@/components/calendar/BookingCalendar'
import { ListingsCarousel } from '@/components/listings/ListingsCarousel'
import { OwnerPromo } from '@/components/OwnerPromo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/fade-in'
import { StaggerContainer } from '@/components/ui/stagger-container'
import { 
  TrendingUp, 
  Shield, 
  Users, 
  DollarSign, 
  Star,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property Management for Landlords - Touchwood Asset Management',
  description: 'Maximize your rental returns with our comprehensive property management services. Expert tenant screening, maintenance, and financial reporting.',
  openGraph: {
    title: 'Property Management for Landlords - Touchwood Asset Management',
    description: 'Maximize your rental returns with our comprehensive property management services. Expert tenant screening, maintenance, and financial reporting.',
  },
}

// Mock data for demonstration
const mockListings = [
  {
    id: '1',
    slug: 'luxury-apartment-sydney-harbour',
    title: 'Luxury Apartment with Sydney Harbour Views',
    summary: 'Stunning 3-bedroom apartment with panoramic harbour views',
    type: 'RESIDENTIAL' as const,
    status: 'AVAILABLE' as const,
    price: 2500000,
    address: '123 Harbour Drive',
    suburb: 'Sydney',
    state: 'NSW',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    floorAreaSqm: 180,
    heroImageUrl: '/placeholder-property.svg',
  },
  // Add more mock listings as needed
]

const services = [
  {
    icon: Users,
    title: 'Tenant Screening',
    description: 'Comprehensive background checks and reference verification to find quality tenants.',
    features: ['Credit checks', 'Employment verification', 'Previous rental history', 'Character references']
  },
  {
    icon: DollarSign,
    title: 'Rent Collection',
    description: 'Automated rent collection and prompt follow-up on overdue payments.',
    features: ['Online payment portal', 'Automated reminders', 'Arrears management', 'Monthly statements']
  },
  {
    icon: Shield,
    title: 'Property Maintenance',
    description: '24/7 maintenance coordination with trusted contractors and suppliers.',
    features: ['Emergency repairs', 'Routine maintenance', 'Quality contractors', 'Cost-effective solutions']
  },
  {
    icon: TrendingUp,
    title: 'Financial Reporting',
    description: 'Detailed monthly reports and annual tax statements for your investment.',
    features: ['Monthly statements', 'Tax reporting', 'Expense tracking', 'Performance analytics']
  }
]

const benefits = [
  'Higher rental yields through optimal pricing',
  'Reduced vacancy periods',
  'Professional tenant screening',
  '24/7 emergency maintenance',
  'Comprehensive insurance coverage',
  'Regular property inspections',
  'Legal compliance and documentation',
  'Tax-ready financial reporting'
]

export default function LandlordsPage() {
  return (
    <div className="min-h-screen">
      {/* Video Hero */}
      <VideoHero
        videoSrc="/videos/property-lifestyle.mp4"
        posterImage="/images/property-hero.jpg"
        title="Maximize Your Property Investment"
        subtitle="Professional Property Management"
        description="Let our expert team handle your property while you enjoy passive income. Comprehensive management services that deliver results."
        ctaText="Get Started Today"
        ctaLink="#booking"
        autoPlay={true}
        loop={true}
        muted={true}
      />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary">Property Management</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Property Management Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From tenant screening to maintenance coordination, we handle every aspect 
                of property management so you can focus on growing your investment portfolio.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Owner Promo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <OwnerPromo />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Landlord Benefits
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our comprehensive property management service delivers measurable results 
                  for property investors across Melbourne and Victoria.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <a href="#booking">Schedule Consultation</a>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Client Satisfaction</h3>
                  <p className="text-gray-600">Average landlord retention rate</p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-gray-600">Client Retention</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">15</div>
                    <div className="text-sm text-gray-600">Days Avg. Lease</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-gray-600">Properties Managed</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Current Listings Carousel */}
      <ListingsCarousel
        listings={mockListings}
        title="Featured Investment Properties"
        subtitle="Explore high-yield investment opportunities"
        showViewAll={true}
        autoPlay={true}
      />

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary">Get Started</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Maximize Your Returns?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Schedule a consultation with our property management experts. 
                We'll provide a comprehensive analysis of your property's rental potential.
              </p>
            </div>
          </FadeIn>

          <BookingCalendar
            type="landlord"
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-brand-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Earning More from Your Property Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied landlords who trust Touchwood Asset Management 
              with their investment properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#booking">Book Free Consultation</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
