import { Metadata } from 'next'
import { ServiceFeatureComparison } from '@/components/ServiceFeatureComparison'

export const metadata: Metadata = {
  title: 'Service Feature Comparison - Touchwood Asset Management',
  description: 'Compare Touchwood\'s comprehensive property management services with generic agencies. See why we offer more value and exclusive features.',
  alternates: { canonical: '/service-comparison' },
  openGraph: {
    title: 'Service Feature Comparison - Touchwood Asset Management',
    description: 'Compare Touchwood\'s comprehensive property management services with generic agencies. See why we offer more value and exclusive features.',
  },
}

export default function ServiceComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* The page had no <h1> at all — ServiceFeatureComparison opens at <h2>
            and is also embedded inside /services, so the heading belongs here. */}
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Property Management Fees &amp; Services Compared
          </h1>
          <p className="text-lg text-gray-600">
            A line-by-line comparison of what Touchwood includes as standard
            against what a typical Melbourne agency charges extra for — so you
            can see exactly where your management fee goes.
          </p>
        </header>
        <ServiceFeatureComparison />
      </div>
    </div>
  )
}
