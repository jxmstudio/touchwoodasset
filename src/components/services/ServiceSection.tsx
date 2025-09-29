import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { ServiceList } from './ServiceList'

interface ServiceSectionProps {
  title: string
  intro: string
  imageSrc: string
  imageAlt: string
  whatWeOffer: string[]
  keyBenefits: string[]
  ctaText: string
  ctaLink: string
  reverse?: boolean
  priority?: boolean
}

export function ServiceSection({
  title,
  intro,
  imageSrc,
  imageAlt,
  whatWeOffer,
  keyBenefits,
  ctaText,
  ctaLink,
  reverse = false,
  priority = false
}: ServiceSectionProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
      reverse ? 'lg:grid-flow-col-dense' : ''
    }`}>
      {/* Content */}
      <FadeIn delay={0.2}>
        <div className={reverse ? 'lg:col-start-2' : ''}>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h3>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {intro}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">What We Offer</h4>
              <ServiceList items={whatWeOffer} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Key Benefits</h4>
              <ServiceList items={keyBenefits} />
            </div>
          </div>
          
          <Link href={ctaLink}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 h-auto group">
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </FadeIn>
      
      {/* Image */}
      <FadeIn delay={0.4}>
        <div className={reverse ? 'lg:col-start-1' : ''}>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg relative group">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
