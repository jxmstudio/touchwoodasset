import { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Award, Users, Target, CheckCircle } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { Section } from '@/components/ui/section'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us - Touchwood Asset Management',
  description:
    'Learn about Touchwood Asset Management, our mission, values, and the team behind our success in property management across Melbourne and Victoria.',
  openGraph: {
    title: 'About Us - Touchwood Asset Management',
    description:
      'Learn about Touchwood Asset Management, our mission, values, and the team behind our success in property management across Melbourne and Victoria.',
  },
}

const teamMembers = [
  {
    name: 'Eamon Chau',
    role: 'Touchwood Asset Management',
    bio: 'Phone: 0413 889 388 • Email: admin@touchwoodasset.com',
  },
  {
    name: 'Josh Jones',
    role: 'Marketing Manager',
    bio: 'Email: marketing@touchwoodasset.com',
  },
  {
    name: 'Joy Mei',
    role: 'New Business',
    bio: 'Email: enquiry@touchwoodasset.com',
  },
  {
    name: 'Lily Wong',
    role: 'Country Manager - Malaysia',
    bio: 'Email: lily.wong@touchwoodasset.com',
  },
]

const values = [
  {
    title: 'Excellence',
    description:
      'We strive for excellence in every aspect of our service delivery.',
    icon: Award,
  },
  {
    title: 'Integrity',
    description:
      'Honest, transparent, and ethical business practices are our foundation.',
    icon: CheckCircle,
  },
  {
    title: 'Innovation',
    description:
      'We embrace new technologies and approaches to better serve our clients.',
    icon: Target,
  },
  {
    title: 'Community',
    description:
      "We're committed to building strong relationships within our local communities.",
    icon: Users,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Touchwood Asset Management
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Driven by Trust. Defined by Service.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Company Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Founded in 2025, Touchwood Asset Management was established
                  with a clear mission — to make property management simple by
                  seamlessly combining AI-driven technology with genuine
                  face-to-face service for vendors, landlords, buyers, and
                  renters alike.
                </p>
                <p>
                  Built on a foundation of trust, innovation, and
                  professionalism, Touchwood has grown into a reputable boutique
                  agency known for its tailored approach and commitment to
                  excellence. We understand that property is more than just
                  bricks and mortar — it&apos;s about people, families,
                  businesses, and communities.
                </p>
                <p>
                  Today, we proudly manage a diverse portfolio of residential,
                  commercial, and ancillary assets across Melbourne and
                  Victoria, delivering exceptional results and peace of mind to
                  clients who entrust us with their most valuable assets.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/lol.png"
                  alt="Touchwood Asset Management mascot"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Logo Story */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Story Behind Our Logo
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Our logo draws inspiration from the timeless Chinese character
                  &quot;福&quot; (Fú) — a symbol that represents blessing,
                  prosperity, and good fortune.
                </p>
                <p>
                  In reimagining this traditional character, we sought to
                  capture both heritage and modernity — reflecting
                  Touchwood&apos;s belief that success in property and business
                  comes from balancing deep roots with forward-thinking
                  innovation.
                </p>
                <p>
                  The reinterpreted &quot;福&quot; takes the form of a stylised
                  red house — a modern architectural expression of home,
                  stability, and growth. Its clean lines represent structure and
                  trust, while its upward form embodies aspiration and progress.
                </p>
                <p>
                  Just as &quot;福&quot; has long symbolised happiness and
                  abundance in Chinese culture, our logo embodies Touchwood
                  Asset Management&apos;s mission: to create enduring value,
                  foster trust, and deliver prosperity for our clients, their
                  families, and their communities.
                </p>
                <p className="font-semibold text-primary">
                  Roots in Tradition. Designed for the Future.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700">
                To provide exceptional asset management solutions that maximise
                our clients&apos; investments while delivering outstanding
                rentals and sales experiences — built on innovation, integrity,
                and personalised service.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700">
                To be Melbourne and Victoria&apos;s forefront asset management
                agency, recognised for our commitment to excellence, innovation,
                and enduring relationships that strengthen communities and
                create lasting value for our clients.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Values */}
      <Section
        title="Our Values"
        subtitle="The principles that guide everything we do"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section
        title="Meet Our Team"
        subtitle="Experienced professionals dedicated to your property success"
        className="bg-gray-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-brand-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <FadeIn delay={0}>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-white/80">Assets Under Management</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <div className="text-4xl font-bold mb-2">160+</div>
                <div className="text-white/80">Happy Clients</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-white/80">Combined Years Experience</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Support Available</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
