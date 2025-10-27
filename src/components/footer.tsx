import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-900 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo-touchwood.png"
                alt="Touchwood Asset Management"
                width={240}
                height={64}
                className="h-16 w-auto rounded-lg"
                suppressHydrationWarning
              />
            </div>
            <p className="text-gray-900 mb-6 max-w-md text-base font-medium">
              We are an AI-driven boutique real estate agency, specialising in
              residential sales and rentals, commercial leasing, and ancillary
              assets such as car parks and storage units across Melbourne and
              greater Victoria.
            </p>
            <div className="flex space-x-4">
              <Link
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '#'}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              {/* LinkedIn removed per request */}
              <Link
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-900 font-medium hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-900 font-medium hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-gray-900 font-medium hover:text-primary transition-colors"
                >
                  Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-900 font-medium hover:text-primary transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-900 font-medium hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-900 font-medium">
                  +61 413 889 388
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-900 font-medium">
                  admin@touchwoodasset.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-gray-900 font-medium">
                  1423/1 Queens Road, MELBOURNE VIC 3004
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-900 text-sm font-medium">
              © {new Date().getFullYear()} Touchwood Asset Management. All
              rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/legal/privacy"
                className="text-gray-900 hover:text-primary text-sm font-medium transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms"
                className="text-gray-900 hover:text-primary text-sm font-medium transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/returns"
                className="text-gray-900 hover:text-primary text-sm font-medium transition-colors"
              >
                Returns Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
