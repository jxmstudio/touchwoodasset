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
              Get in touch with our expert team. We're here to help with all your property management needs.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn delay={0}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly do you respond to enquiries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We aim to respond to all enquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
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
                  Yes, we offer free initial consultations to discuss your property management 
                  needs and how we can help you.
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
                  We primarily service Melbourne and surrounding Victoria areas, including the 
                  Yarra Valley, Mornington Peninsula, and Greater Melbourne.
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
                  Absolutely! We offer professional property valuations for sales, 
                  refinancing, and investment purposes.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>
    </div>
  )
}
