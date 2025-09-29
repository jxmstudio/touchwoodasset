import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Mail } from 'lucide-react'

interface ContactStripProps {
  className?: string
  variant?: 'primary' | 'secondary'
}

export function ContactStrip({ 
  className = '', 
  variant = 'primary' 
}: ContactStripProps) {
  const isPrimary = variant === 'primary'
  
  return (
    <section className={`py-8 ${isPrimary ? 'bg-primary text-white' : 'bg-gray-50 text-gray-900'} ${className}`}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-sm md:text-base opacity-90">
              Let us help you maximize your property investment with our comprehensive management services.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className={`${
                isPrimary 
                  ? 'bg-white hover:bg-gray-100 text-primary font-semibold' 
                  : 'bg-primary hover:bg-primary/90 text-white font-semibold'
              } px-6 py-3 h-auto`}
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Us Today
              </Link>
            </Button>
            
            <Button
              asChild
              variant={isPrimary ? 'outline' : 'secondary'}
              size="lg"
              className={`${
                isPrimary 
                  ? 'border-white text-white hover:bg-white hover:text-primary' 
                  : 'bg-white hover:bg-gray-100 text-gray-900'
              } px-6 py-3 h-auto`}
            >
              <Link href="/listings" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                View Properties
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
