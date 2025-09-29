import { Metadata } from 'next'
import { ContactForm } from '@/components/forms/contact-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { Section } from '@/components/ui/section'

export const metadata: Metadata = {
  title: 'Contact Us - Touchwood Asset Management',
  description: 'Get in touch with Touchwood Asset Management. We\'re here to help with all your property management needs in Melbourne and Victoria.',
  openGraph: {
    title: 'Contact Us - Touchwood Asset Management',
    description: 'Get in touch with Touchwood Asset Management. We\'re here to help with all your property management needs in Melbourne and Victoria.',
  },
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '0413 889 388',
    href: 'tel:0413889388',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'admin@touchwoodasset.com',
    href: 'mailto:admin@touchwoodasset.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: '1423/1 Queens Road, MELBOURNE VIC 3004',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM',
    href: '#',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Don't wait—discover why property owners choose us. Contact our expert team today.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn>
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-lg text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
                
                <ContactForm />
              </div>
            </FadeIn>

            {/* Contact Information */}
            <FadeIn delay={0.2}>
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-lg text-gray-600">
                    We're here to help with all your property management needs. 
                    Reach out to us through any of the channels below.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <FadeIn key={info.title} delay={0.3 + (index * 0.1)}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <info.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                              {info.href !== '#' ? (
                                <a 
                                  href={info.href}
                                  className="text-primary hover:text-brand-600 transition-colors"
                                >
                                  {info.content}
                                </a>
                              ) : (
                                <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>

                {/* Office Location */}
                <FadeIn delay={0.7}>
                  <div className="mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <span>Office Location</span>
                        </CardTitle>
                        <CardDescription>
                          Visit our office for in-person consultations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                          <MapPin className="h-16 w-16 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mt-3 text-center">
                          Map integration coming soon
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Section 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our services"
        className="bg-gray-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <FadeIn delay={0}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly do you respond to enquiries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We respond to all enquiries within 24 hours on business days.
                  For urgent matters, please call/SMS us directly and our team will assist you right away.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer free consultations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! We provide a free initial consultation to discuss your real estate goals and show you how we can help. Book your consultation today.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What areas do you service?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We proudly service Melbourne CBD and surrounding suburbs within a 50km radius. Excitingly, we're also preparing to expand into regional Victoria soon.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can you help with property valuations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! Our team offers professional property valuations for sales, refinancing, and investment purposes. Get in touch today to book your valuation.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What makes your property management different?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We are a boutique agency that prides itself on personalised service, transparent communication, and proven results. You won't get lost in the crowd with us—we treat every property as if it were our own.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.5}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do you handle tenant selection and screening?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We carefully screen all tenants through background checks, rental history reviews, and references, ensuring the right fit for your property.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you arrange repairs and maintenance?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes. We coordinate with a trusted network of licensed tradespeople to handle repairs and maintenance promptly, keeping your property in excellent condition.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.7}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How often do you conduct routine inspections?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We complete detailed routine inspection in the 3rd month and every 6 months thereafter, with full written reports and photos provided to you.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.8}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are your management fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our low fees are very competitive and are tailored to each property. Contact us today for a transparent, no-obligation quote.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.9}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">When do I receive my rental income?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rental income is disbursed upon the receipt of rent payments on a monthly cycle directly to your nominated account.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={1.0}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if my tenant falls behind in rent?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We follow a strict arrears process in line with Victorian legislation and keep you informed every step of the way. If needed, we represent you at VCAT.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={1.1}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I switch to your agency from another manager?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! We make switching simple by handling the entire handover process on your behalf. It's stress-free for you.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={1.2}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you manage both residential and commercial properties?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes—we manage residential rentals, commercial properties, storage units, and carparks.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={1.3}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are you fully licensed and insured?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes. We are a fully licensed real estate agency and carry professional indemnity insurance for your peace of mind.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={1.4}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you help with landlord insurance claims?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we assist owners with landlord insurance claims, making the process smoother and less stressful.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={1.5}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do you ensure compliance with Victorian tenancy laws?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our team stays up to date with Victorian Residential Tenancies Act requirements and other legislation, ensuring your property is always compliant.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={1.6}>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">I heard about the promotion — $500 Visa gift card or cashback. Is this correct?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! When you switch your property management to us, you'll receive a $500 Visa gift card or cashback as a welcome bonus. It's our way of saying thank you for trusting us with your property. If you have a carpark or storage unit, we will still offer you a $100 Visa gift card or cashback as our appreciation for your support. Enquire today to claim your offer.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>
    </div>
  )
}
