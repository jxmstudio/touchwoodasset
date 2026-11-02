import { Metadata } from 'next'
import { BadgeCheck } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { LICENCE_NAME } from '@/data/careers'
import CareersClient from './CareersClient'

const description = `Join Touchwood Asset Management in Melbourne. We're hiring a Sales Consultant and a Business Development Manager. ${LICENCE_NAME} required.`

export const metadata: Metadata = {
  title: 'Join the Team: Sales & BDM Jobs in Melbourne',
  description,
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Join the Team | Touchwood Asset Management',
    description,
  },
}

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join the Team
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We&apos;re looking for licensed sales and business development
              people to join Touchwood Asset Management in Melbourne.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Licence Requirement */}
      <section className="border-b border-primary/20 bg-primary/5 py-4">
        <div className="container mx-auto flex items-center justify-center gap-3 px-4 text-center sm:px-6 lg:px-8">
          <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
          <p className="font-medium text-gray-900">
            All applicants must hold a current {LICENCE_NAME}.
          </p>
        </div>
      </section>

      <CareersClient />
    </div>
  )
}
