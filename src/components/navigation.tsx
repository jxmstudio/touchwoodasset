'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Menu,
  Building2,
  Home,
  Info,
  Phone,
  Search,
  User,
  FileText,
  Archive,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Services', href: '/services', icon: Building2 },
  { name: 'Listings', href: '/listings', icon: Search },
  { name: 'Prime Hosting', href: '/prime-hosting', icon: Sparkles },
  { name: 'The Archive', href: '/the-archive', icon: Archive },
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
          <div className="flex items-center -ml-6 md:-ml-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-touchwood.png"
                alt="Touchwood Asset Management"
                width={156}
                height={42}
                className="h-10 w-auto rounded-md sm:h-12"
                style={{ height: 'auto', width: 'auto' }}
                priority
                suppressHydrationWarning
              />
            </Link>
          </div>

          {/* Desktop Navigation - Ray White style */}
          <div className="hidden md:flex md:items-center ml-12">
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
            {specialPages.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-normal text-gray-600 transition-colors hover:text-gray-900 uppercase tracking-wide whitespace-nowrap ml-8"
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
                className="w-[320px] sm:w-[420px] bg-gradient-to-br from-gray-50 to-white border-l border-gray-200"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Header with logo */}
                  <div className="flex items-center p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
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
                        style={{ height: 'auto', width: 'auto' }}
                        priority
                        suppressHydrationWarning
                      />
                    </Link>
                  </div>

                  {/* Navigation content with scroll */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-2">
                      {navigation.map((item, index) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-4 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-xl py-4 px-4 group"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-primary/10 transition-colors duration-200">
                            <item.icon className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors duration-200" />
                          </div>
                          <span className="flex-1">{item.name}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Quick Access Section */}
                    <div className="px-6 pb-6">
                      <div className="bg-gradient-to-r from-primary/5 to-brand-50/50 rounded-2xl p-6 border border-primary/10">
                        <p className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          Quick Access
                        </p>
                        <div className="space-y-3">
                          {specialPages.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center space-x-4 text-base font-semibold text-primary hover:text-brand-600 transition-colors duration-200 rounded-lg py-3 px-4 hover:bg-white/60 group"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                                <item.icon className="h-4 w-4 text-primary" />
                              </div>
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
