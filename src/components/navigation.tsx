'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Menu,
  X,
  Building2,
  Home,
  Info,
  Phone,
  Search,
  User,
  FileText,
} from 'lucide-react'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Services', href: '/services', icon: Building2 },
  { name: 'Listings', href: '/listings', icon: Search },
  { name: 'Articles', href: '/blog', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Phone },
]

const specialPages = [
  { name: 'For Landlords', href: '/landlords', icon: Building2 },
  { name: 'For Sellers', href: '/sellers', icon: Home },
]

export function Navigation() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 transition-shadow duration-300">
      <nav
        className="container mx-auto max-w-7xl px-4 md:px-6"
        aria-label="Main navigation"
      >
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-touchwood.png"
                alt="Touchwood Asset Management"
                width={156}
                height={42}
                className="h-10 w-auto rounded-md sm:h-12"
                priority
                suppressHydrationWarning
              />
            </Link>
          </div>

          {/* Desktop Navigation - Ray White style */}
          <div className="hidden md:flex md:items-center">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-normal text-gray-600 transition-colors hover:text-gray-900 uppercase tracking-wide whitespace-nowrap ${
                  index > 0 ? 'ml-8' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Authentication buttons removed */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-white"
              >
                <div className="flex flex-col space-y-8">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Image
                        src="/logo-touchwood.png"
                        alt="Touchwood Asset Management"
                        width={156}
                        height={42}
                        className="h-8 w-auto rounded-md"
                        priority
                        suppressHydrationWarning
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-4 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-6 w-6" />
                        <span>{item.name}</span>
                      </Link>
                    ))}

                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <p className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                        Quick Access
                      </p>
                      <div className="space-y-4">
                        {specialPages.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-4 text-lg font-medium text-primary transition-colors hover:text-primary/80 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon className="h-6 w-6" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Authentication section removed */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
