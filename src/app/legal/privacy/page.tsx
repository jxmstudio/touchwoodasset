import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Touchwood Asset Management',
  description:
    'Privacy Policy for Touchwood Asset Management website and services.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            This Privacy Policy page is currently under development. Please
            check back soon for our complete privacy policy.
          </p>

          <p className="text-gray-600">
            For immediate privacy-related questions, please contact us at{' '}
            <a
              href="mailto:admin@touchwoodasset.com"
              className="text-blue-600 hover:underline"
            >
              admin@touchwoodasset.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
