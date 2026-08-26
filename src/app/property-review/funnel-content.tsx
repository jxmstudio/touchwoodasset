import type { PastWorkItem } from './PastWorkCarousel'
import {
  BarChart3,
  Receipt,
  CalendarClock,
  ClipboardList,
  BadgeDollarSign,
  MessageCircle,
  MapPin,
} from 'lucide-react'

// Content shared between the two funnel landing pages: /property-review
// (organic, appraisal-first) and /switch (paid Meta traffic, $500-offer-first).
// Copy edits here show up on both pages.

export const deliverables = [
  {
    icon: BarChart3,
    title: 'Rent benchmark',
    body: 'What comparable properties in your suburb are actually leasing for right now — not what the listing price said.',
  },
  {
    icon: Receipt,
    title: 'Fee audit',
    body: 'Every management fee, letting fee and add-on charge, laid out against what the rest of the market charges.',
  },
  {
    icon: CalendarClock,
    title: 'Vacancy & arrears check',
    body: 'How many days your property sat empty last cycle, and what that cost you against the local average.',
  },
  {
    icon: ClipboardList,
    title: 'A short action list',
    body: 'Three to five specific, costed moves to lift your net return — yours to keep whether you switch or not.',
  },
]

// [COPY REVIEW NEEDED] — three "why switch" benefits. The claims below are
// drafted from existing site copy; confirm each one is true before launch.
export const benefits = [
  {
    icon: BadgeDollarSign,
    title: 'Fair, transparent fees',
    body: 'One management fee, no hidden add-on charges. We show you exactly what you pay and what the market charges before you commit.',
  },
  {
    icon: MessageCircle,
    title: 'One point of contact, 24/7',
    body: 'You deal with one person who knows your property — not a call centre. Urgent issues get answered around the clock.',
  },
  {
    icon: MapPin,
    title: 'Melbourne locals, 220+ assets',
    body: 'We manage apartments, car parks and storage across inner Melbourne, so we see real leasing outcomes weekly — not portal asking prices.',
  },
]

// Real client reviews from Touchwood's previous Google Business Profile —
// also published on the homepage, so keep src/app/HomeClient.tsx in sync.
export const testimonials = [
  {
    quote:
      'Touchwood made our property investment journey seamless. Their expertise in the Melbourne market is unmatched.',
    author: 'Sarah Chen',
    role: 'Property Investor',
  },
  {
    quote:
      'Professional service from start to finish. They found us the perfect commercial space for our business.',
    author: 'Michael Roberts',
    role: 'Business Owner',
  },
  {
    quote:
      'Outstanding property management services. They take care of everything so we don’t have to worry.',
    author: 'Lisa Wong',
    role: 'Property Owner',
  },
]

// Real outcomes pulled from src/data/listings.ts — keep in sync if a
// property's status or numbers change there. /switch shows only the
// residential leased items (residentialLeasedWork): a sale price or a car
// park block is off-message for an audience switching a rental's management.
export const pastWork: PastWorkItem[] = [
  {
    image: '/15088/Living%20room.jpg',
    alt: 'Renovated living room with city views at 1508/8 Franklin Street, Melbourne',
    badge: 'Sold',
    title: '1508/8 Franklin Street, Melbourne',
    stat: 'Sold $427,500 · 7.7% gross yield',
    body: 'Renovated turn-key two-bedroom in The Milano, sold with the rental numbers doing the talking.',
  },
  {
    image: '/6-1070-sydney-rd-fawkner/Living-room-1.jpg',
    alt: 'Open plan living area at 6/1070 Sydney Road, Fawkner',
    badge: 'Leased',
    title: '6/1070 Sydney Road, Fawkner',
    stat: 'Leased at $500/week',
    body: 'Boutique townhouse leased quickly — the owner moved their management across to Touchwood in the same step.',
  },
  {
    image: '/1316-lonsdale/Living%20room.jpg',
    alt: 'Furnished living area at 1316/39 Lonsdale Street, Melbourne',
    badge: 'Leased',
    title: '1316/39 Lonsdale Street, Melbourne',
    stat: 'Furnished 2-bed · Melbourne CBD',
    body: 'Fully furnished CBD apartment leased with minimal vacancy between tenancies.',
  },
  {
    image: '/150-Albert-Rd-SOUTH-MELBOURNE-1.jpg',
    alt: 'Building at 150 Albert Road, South Melbourne',
    badge: 'Leased',
    title: '150 Albert Road, South Melbourne',
    stat: '7 car parks leased',
    body: 'A block of seven secure car parks leased out for one owner — income from every corner of the asset.',
  },
]

export const residentialLeasedWork: PastWorkItem[] = pastWork.filter(
  (item) => item.badge === 'Leased' && !item.stat.includes('car parks')
)

export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Google">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
