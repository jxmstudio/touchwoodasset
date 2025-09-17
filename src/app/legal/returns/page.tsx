import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns Policy - Touchwood Asset Management',
  description: 'Returns Policy for Touchwood Asset Management services.',
}

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Returns Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            This Returns Policy page is currently under development. Please check back soon for our complete returns policy.
          </p>
          
          <p className="text-gray-600">
            For immediate returns-related questions, please contact us at{' '}
            <a href="mailto:support@touchwood.com.au" className="text-blue-600 hover:underline">
              support@touchwood.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
