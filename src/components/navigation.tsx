'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  Phone,
  Search,
  FileText,
  Archive,
  Sparkles,
  MapPin,
  ChevronDown,
  Users,
  ClipboardList,
  Calculator,
  Calendar,
} from 'lucide-react'
import Image from 'next/image'

type NavChild = { name: string; href: string; icon?: React.ElementType; description?: string }
type NavItem =
  | { name: string; href: string; children?: never }
  | { name: string; href: string; children: NavChild[] }

const navItems: NavItem[] = [
  { name: 'Listings', href: '/listings' },
  {
    name: 'Locations',
    href: '/locations',
    children: [
      { name: 'All Locations', href: '/locations', icon: MapPin, description: 'Overview of all suburbs' },
      { name: 'East Melbourne', href: '/locations/east-melbourne', icon: MapPin, description: 'Tribeca car parks, near MCG' },
      { name: 'South Melbourne', href: '/locations/south-melbourne', icon: MapPin, description: 'Stead St & Albert Rd' },
      { name: 'Melbourne CBD', href: '/locations/melbourne-cbd', icon: MapPin, description: 'Parking + The Archive storage' },
      { name: 'St Kilda', href: '/locations/st-kilda', icon: MapPin, description: 'St Kilda Tower, Queens Lane' },
    ],
  },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'All Services', href: '/services', icon: Building2, description: 'Full service overview' },
      { name: 'Prime Hosting', href: '/prime-hosting', icon: Sparkles, description: 'Short-stay rental management' },
      { name: 'For Landlords', href: '/landlords', icon: Users, description: 'Investment property management' },
      { name: 'For Sellers', href: '/sellers', icon: Home, description: 'Sales & appraisal services' },
      { name: 'Property Valuation', href: '/valuation', icon: Calculator, description: 'Free property appraisal' },
      { name: 'Book Inspection', href: '/inspection', icon: Calendar, description: 'Schedule a viewing' },
    ],
  },
  { name: 'The Archive', href: '/the-archive' },
  { name: 'Articles', href: '/blog' },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b border-gray-100">
      <nav
        className="container mx-auto max-w-7xl px-4 md:px-6"
        aria-label="Main navigation"
      >
        <div className="flex h-18 items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 -ml-2">
            <Image
              src="/logo-touchwood.png"
              alt="Touchwood Asset Management"
              width={156}
              height={42}
              className="h-10 w-auto rounded-md sm:h-11"
              style={{ height: 'auto', width: 'auto' }}
              priority
              suppressHydrationWarning
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-1 flex-1 justify-center">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase tracking-wide rounded-md transition-colors whitespace-nowrap ${
                      pathname.startsWith(item.href)
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group/item"
                        >
                          {child.icon && (
                            <child.icon className="h-4 w-4 text-gray-400 group-hover/item:text-primary mt-0.5 shrink-0 transition-colors" />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 group-hover/item:text-primary transition-colors whitespace-nowrap">
                              {child.name}
                            </div>
                            {child.description && (
                              <div className="text-xs text-gray-500 mt-0.5">{child.description}</div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium uppercase tracking-wide rounded-md transition-colors whitespace-nowrap ${
                    pathname === item.href
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex shrink-0">
            <Button asChild size="sm">
              <Link href="/contact" className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                Contact
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Mobile header */}
                <div className="flex items-center p-5 border-b">
                  <Link href="/" onClick={() => setMobileOpen(false)}>
                    <Image
                      src="/logo-touchwood.png"
                      alt="Touchwood Asset Management"
                      width={140}
                      height={38}
                      className="h-9 w-auto rounded-md"
                      style={{ height: 'auto', width: 'auto' }}
                      priority
                      suppressHydrationWarning
                    />
                  </Link>
                </div>

                {/* Mobile links */}
                <div className="overflow-y-auto flex-1 py-4">
                  {navItems.map((item) =>
                    item.children ? (
                      <div key={item.name}>
                        <button
                          className="flex items-center justify-between w-full px-5 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wide hover:text-primary transition-colors"
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.name ? null : item.name
                            )
                          }
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              mobileExpanded === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {mobileExpanded === item.name && (
                          <div className="bg-gray-50 px-5 py-2 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.icon && (
                                  <child.icon className="h-4 w-4 text-gray-400 shrink-0" />
                                )}
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-5 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wide hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>

                {/* Mobile CTA */}
                <div className="p-5 border-t">
                  <Button asChild className="w-full" size="lg">
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
