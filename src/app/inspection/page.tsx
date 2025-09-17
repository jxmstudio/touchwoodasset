import { Metadata } from 'next'
import { InspectionForm } from '@/components/forms/inspection-form'

export const metadata: Metadata = {
  title: 'Property Inspection - Touchwood Asset Management',
  description: 'Book a property inspection with Touchwood Asset Management. Professional property inspections and condition reports.',
  openGraph: {
    title: 'Property Inspection - Touchwood Asset Management',
    description: 'Book a property inspection with Touchwood Asset Management. Professional property inspections and condition reports.',
  },
}

export default function InspectionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Property Inspection
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Book a professional property inspection with our expert team
          </p>
        </div>
      </section>

      {/* Inspection Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Book Your Property Inspection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're buying, selling, or maintaining a property, our detailed inspections 
              provide comprehensive insights into the property's condition.
            </p>
          </div>

          <InspectionForm />
        </div>
      </section>

      {/* Inspection Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Inspection Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive property inspections tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pre-Purchase Inspection</h3>
              <p className="text-gray-600">
                Comprehensive inspection before buying to identify any issues or concerns 
                that could affect the property's value or safety.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pre-Sale Inspection</h3>
              <p className="text-gray-600">
                Detailed inspection to identify any issues that should be addressed 
                before listing your property for sale.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Maintenance Inspection</h3>
              <p className="text-gray-600">
                Regular inspections to assess the condition of your investment property 
                and identify maintenance needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Check During Inspections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our thorough inspections cover all major systems and components
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Structural</h3>
              <p className="text-sm text-gray-600">Foundation, walls, roof, and structural integrity</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Electrical</h3>
              <p className="text-sm text-gray-600">Wiring, outlets, switches, and electrical safety</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Plumbing</h3>
              <p className="text-sm text-gray-600">Pipes, fixtures, water pressure, and drainage</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">HVAC</h3>
              <p className="text-sm text-gray-600">Heating, ventilation, and air conditioning systems</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Interior</h3>
              <p className="text-sm text-gray-600">Floors, ceilings, windows, and interior finishes</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Exterior</h3>
              <p className="text-sm text-gray-600">Siding, gutters, landscaping, and drainage</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Safety</h3>
              <p className="text-sm text-gray-600">Smoke detectors, carbon monoxide, and safety hazards</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Detailed report with photos and recommendations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
