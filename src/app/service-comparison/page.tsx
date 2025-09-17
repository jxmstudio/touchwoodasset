import { Metadata } from 'next'
import { ServiceFeatureComparison } from '@/components/ServiceFeatureComparison'

export const metadata: Metadata = {
  title: 'Service Feature Comparison - Touchwood Asset Management',
  description: 'Compare Touchwood\'s comprehensive property management services with generic agencies. See why we offer more value and exclusive features.',
  openGraph: {
    title: 'Service Feature Comparison - Touchwood Asset Management',
    description: 'Compare Touchwood\'s comprehensive property management services with generic agencies. See why we offer more value and exclusive features.',
  },
}

export default function ServiceComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ServiceFeatureComparison />
      </div>
    </div>
  )
}
