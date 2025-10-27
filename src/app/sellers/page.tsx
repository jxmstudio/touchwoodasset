import { Metadata } from 'next'
import { VideoHero } from '@/components/hero/VideoHero'
import { BookingCalendar } from '@/components/calendar/BookingCalendar'
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
import { StaggerContainer } from '@/components/ui/stagger-container'
import {
  TrendingUp,
  Camera,
  Gavel,
  BarChart3,
  Target,
  Award,
  CheckCircle,
  Home,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sell Your Property - Touchwood Asset Management',
  description:
    'Get the best price for your property with our expert sales team. Professional valuations, marketing, and negotiation services.',
  openGraph: {
    title: 'Sell Your Property - Touchwood Asset Management',
    description:
      'Get the best price for your property with our expert sales team. Professional valuations, marketing, and negotiation services.',
  },
}

const services = [
  {
    icon: BarChart3,
    title: 'Property Valuation',
    description:
      'Comprehensive market analysis to determine optimal pricing strategy.',
    features: [
      'Comparative market analysis',
      'Local market insights',
      'Pricing recommendations',
      'Regular reviews',
    ],
  },
  {
    icon: Camera,
    title: 'Professional Marketing',
    description:
      'High-quality photography, virtual tours, and targeted advertising.',
    features: [
      'Professional photography',
      'Virtual tours',
      'Online listings',
      'Social media marketing',
    ],
  },
  {
    icon: Users,
    title: 'Buyer Management',
    description: 'Pre-qualified buyer network and expert negotiation services.',
    features: [
      'Buyer database',
      'Private inspections',
      'Auction management',
      'Contract negotiation',
    ],
  },
  {
    icon: Gavel,
    title: 'Settlement Support',
    description:
      'Complete support through to settlement with legal coordination.',
    features: [
      'Legal coordination',
      'Contract management',
      'Settlement assistance',
      'Post-sale support',
    ],
  },
]

const salesProcess = [
  {
    step: '1',
    title: 'Property Appraisal',
    description:
      "Free comprehensive market appraisal to determine your property's value.",
    icon: Home,
  },
  {
    step: '2',
    title: 'Marketing Strategy',
    description:
      'Develop a tailored marketing campaign to attract qualified buyers.',
    icon: Target,
  },
  {
    step: '3',
    title: 'Property Presentation',
    description:
      'Professional photography and styling to showcase your property.',
    icon: Camera,
  },
  {
    step: '4',
    title: 'Sale Campaign',
    description:
      'Execute marketing campaign with regular feedback and adjustments.',
    icon: TrendingUp,
  },
]

const achievements = [
  'Average 98% of asking price achieved',
  '90% of properties sold within 6 weeks',
  'Award-winning sales team',
  'Comprehensive marketing reach',
  'Expert negotiation skills',
  'Local market expertise',
  'Transparent fee structure',
  'Full settlement support',
]

export default function SellersPage() {
  return (
    <div className="min-h-screen">
      {/* Video Hero */}
      <VideoHero
        videoSrc="/videos/property-sales.mp4"
        posterImage="/images/sales-hero.jpg"
        title="Sell Your Property for Maximum Value"
        subtitle="Expert Property Sales"
        description="Our experienced sales team delivers exceptional results with proven marketing strategies and expert negotiation skills."
        ctaText="Get Free Valuation"
        ctaLink="#booking"
        autoPlay={true}
        loop={true}
        muted={true}
      />

      {/* Sales Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary">
                Sales Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How We Sell Your Property
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our proven 4-step process ensures maximum exposure and optimal
                pricing to get the best possible result for your property sale.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {salesProcess.map((process, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 relative"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {process.step}
                  </div>
                  <CardTitle className="text-xl">{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <process.icon className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
                {index < salesProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Sales Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From initial valuation to final settlement, we provide
                comprehensive support throughout your property sale journey.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
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

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800">
                  Proven Results
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Sellers Choose Us
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our track record speaks for itself. We consistently deliver
                  exceptional results for property sellers across Melbourne and
                  Victoria.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <a href="#booking">Get Free Valuation</a>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-primary to-brand-600 rounded-2xl shadow-xl p-8 text-white">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Sales Performance</h3>
                  <p className="text-white/90">
                    Our results in the last 12 months
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2">$16M</div>
                    <div className="text-sm text-white/80">Total Sales</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">88%</div>
                    <div className="text-sm text-white/80">Of Asking Price</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">36</div>
                    <div className="text-sm text-white/80">Days Avg. Sale</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary">
                Free Valuation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Discover Your Property&apos;s True Value
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Book a free, no-obligation property valuation with our expert
                sales team. Get a comprehensive market analysis and personalized
                selling strategy.
              </p>
            </div>
          </FadeIn>

          <BookingCalendar type="seller" className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Sell Your Property?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our award-winning sales team help you achieve the best
              possible price for your property with our proven marketing
              strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
                asChild
              >
                <a href="#booking">Book Free Valuation</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-foreground hover:bg-gray-100"
                asChild
              >
                <a href="/contact">Speak to an Agent</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
