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
import {
  Home,
  Calendar,
  DollarSign,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Key,
} from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { Section } from '@/components/ui/section'
import { ContactStrip } from '@/components/common/ContactStrip'

export const metadata: Metadata = {
  title: 'Short-Stay Rental Management - Touchwood & Prime Hosting',
  description:
    'Touchwood, in collaboration with Prime Hosting, is now offering our owners short-stay rental management services. Maximize your property returns with professional Airbnb and short-term rental management.',
  openGraph: {
    title: 'Short-Stay Rental Management - Touchwood & Prime Hosting',
    description:
      'Touchwood, in collaboration with Prime Hosting, is now offering our owners short-stay rental management services. Maximize your property returns with professional Airbnb and short-term rental management.',
  },
}

const benefits = [
  {
    icon: DollarSign,
    title: 'Maximize Returns',
    description:
      'Short-stay rentals typically generate 20-40% higher returns than traditional long-term leases, maximizing your property investment potential.',
  },
  {
    icon: Calendar,
    title: 'Flexible Availability',
    description:
      'Maintain flexibility to use your property when needed while earning income during periods when you\'re away.',
  },
  {
    icon: Shield,
    title: 'Professional Management',
    description:
      'Full-service management including guest communication, cleaning, maintenance, and 24/7 support handled by experienced professionals.',
  },
  {
    icon: TrendingUp,
    title: 'Market Optimization',
    description:
      'Dynamic pricing strategies and market analysis ensure your property is always competitively priced for maximum occupancy and revenue.',
  },
  {
    icon: Users,
    title: 'Quality Guests',
    description:
      'Rigorous guest screening and verification processes ensure your property is in safe hands with responsible, verified guests.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'Round-the-clock support for both you and your guests, ensuring seamless experiences and quick resolution of any issues.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Property Assessment',
    description:
      'We evaluate your property\'s suitability for short-stay rentals, considering location, amenities, and market demand.',
  },
  {
    step: '02',
    title: 'Setup & Optimization',
    description:
      'Professional photography, listing optimization, and strategic pricing setup across major platforms including Airbnb, Booking.com, and more.',
  },
  {
    step: '03',
    title: 'Guest Management',
    description:
      'Handle all guest communications, bookings, check-ins, and check-outs with our dedicated team ensuring smooth experiences.',
  },
  {
    step: '04',
    title: 'Maintenance & Care',
    description:
      'Regular cleaning, maintenance, and property care to ensure your investment remains in excellent condition and guest-ready.',
  },
  {
    step: '05',
    title: 'Revenue & Reporting',
    description:
      'Transparent financial reporting with monthly statements, direct deposits, and detailed analytics on your property\'s performance.',
  },
]

const whyChoose = [
  {
    icon: CheckCircle,
    title: 'Proven Track Record',
    description:
      'Prime Hosting brings years of experience in short-stay rental management with a portfolio of successfully managed properties.',
  },
  {
    icon: Sparkles,
    title: 'Technology-Driven',
    description:
      'Advanced booking systems, automated pricing, and smart home integration for seamless operations and enhanced guest experiences.',
  },
  {
    icon: Key,
    title: 'Local Expertise',
    description:
      'Deep understanding of Melbourne\'s short-stay market, regulations, and guest preferences to optimize your property\'s performance.',
  },
]

export default function PrimeHostingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Short-Stay Rental Management',
    description:
      'Professional short-stay rental management services in collaboration with Prime Hosting for property owners in Melbourne.',
    provider: {
      '@type': 'Organization',
      name: 'Touchwood Asset Management',
      url: 'https://touchwoodasset.com',
    },
    serviceType: 'Property Management',
    areaServed: {
      '@type': 'Place',
      name: 'Melbourne, Victoria, Australia',
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
        <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Short-Stay Rental Management
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Touchwood, in collaboration with Prime Hosting, is now offering
                  our owners short-stay rental management services.
                </p>
                <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
                  Maximize your property returns with professional Airbnb and
                  short-term rental management. Experience the benefits of
                  flexible, high-yield property investment with full-service
                  support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-primary font-semibold px-8 py-6 h-auto text-lg"
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Started Today
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 h-auto text-lg"
                  >
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact Strip */}
        <ContactStrip variant="secondary" />

        {/* Introduction Section */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  A Powerful Partnership
                </h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    Touchwood Asset Management has partnered with Prime Hosting
                    to bring you comprehensive short-stay rental management
                    services. This collaboration combines Touchwood&apos;s
                    trusted property management expertise with Prime Hosting&apos;s
                    specialized knowledge in short-term rental operations.
                  </p>
                  <p>
                    Whether you own a residential property, apartment, or
                    investment unit, our short-stay rental management service
                    can help you unlock higher returns while maintaining
                    flexibility and peace of mind.
                  </p>
                  <p className="font-semibold text-primary">
                    Experience the best of both worlds: Touchwood&apos;s
                    personalized service meets Prime Hosting&apos;s innovative
                    short-stay expertise.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                  {/* Video with cinematic filter overlay */}
                  <video
                    className="w-full h-full object-cover brightness-90 contrast-110 saturate-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source
                      src="/123.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  {/* Gradient overlay to mask low resolution and add cinematic depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* Benefits Section */}
        <Section
          title="Why Choose Short-Stay Rentals?"
          subtitle="Unlock the potential of your property with professional short-stay rental management"
          className="bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit.title} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-center">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-center">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* How It Works Section */}
        <Section
          title="How It Works"
          subtitle="A streamlined process designed for simplicity and success"
          id="how-it-works"
        >
          <div className="space-y-8">
            {howItWorks.map((step, index) => (
              <FadeIn key={step.step} delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-lg text-gray-700">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* Why Choose Us Section */}
        <Section
          title="Why Choose This Partnership?"
          subtitle="The combined expertise of Touchwood and Prime Hosting delivers exceptional results"
          className="bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-brand-50 rounded-2xl flex items-center justify-center mb-4">
                      <item.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-brand-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Maximize Your Property Returns?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Let our team assess your property and show you how short-stay
                rental management can transform your investment returns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-primary font-semibold px-8 py-6 h-auto text-lg"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Schedule a Consultation
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 h-auto text-lg"
                >
                  <Link href="tel:0413889388" className="flex items-center gap-2">
                    Call Us: 0413 889 388
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact Strip - Bottom */}
        <ContactStrip variant="secondary" />
      </div>
    </>
  )
}
