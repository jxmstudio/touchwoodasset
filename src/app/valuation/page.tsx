import { Metadata } from 'next'
import { ValuationForm } from '@/components/forms/valuation-form'

export const metadata: Metadata = {
  title: 'Property Valuation - Touchwood Asset Management',
  description: 'Get a professional property valuation from Touchwood Asset Management. Expert valuations for sales, refinancing, and investment purposes.',
  openGraph: {
    title: 'Property Valuation - Touchwood Asset Management',
    description: 'Get a professional property valuation from Touchwood Asset Management. Expert valuations for sales, refinancing, and investment purposes.',
  },
}

export default function ValuationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Property Valuation
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Get an accurate, professional property valuation from our expert team
          </p>
        </div>
      </section>

      {/* Valuation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Request Your Property Valuation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're selling, refinancing, or just curious about your property's value, 
              our experienced valuers will provide you with an accurate assessment.
            </p>
          </div>

          <ValuationForm />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Touchwood for Your Valuation?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine local market expertise with professional standards to deliver accurate valuations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">13+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Years Experience</h3>
              <p className="text-gray-600">
                Over 13 years of experience in the Sydney property market with deep local knowledge.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">500+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Properties Valued</h3>
              <p className="text-gray-600">
                We've valued hundreds of properties across all types and locations in Sydney.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">24h</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Turnaround</h3>
              <p className="text-gray-600">
                Receive your valuation report within 24-48 hours of the inspection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
