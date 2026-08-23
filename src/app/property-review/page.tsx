import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ReviewForm } from './ReviewForm'
import { PastWorkCarousel, type PastWorkItem } from './PastWorkCarousel'
import { CallLink } from '@/components/analytics/CallLink'
import { SITE_NAME, CONTACT, absoluteUrl } from '@/lib/site'
import {
  BarChart3,
  Receipt,
  CalendarClock,
  ClipboardList,
  Phone,
  Star,
  BadgeDollarSign,
  MessageCircle,
  MapPin,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Rental Appraisal — Melbourne Investment Property',
  description:
    'Get a free rental appraisal for your Melbourne investment property. Rent benchmark, fee audit and vacancy check from Touchwood Asset Management — 2-minute call, no obligation to switch.',
  keywords: [
    'free rental appraisal Melbourne',
    'investment property appraisal',
    'free property review Melbourne',
    'property management review',
    'am I charging enough rent Melbourne',
    'switch property manager Melbourne',
  ],
  alternates: { canonical: '/property-review' },
  openGraph: {
    title: `Free Rental Appraisal — Melbourne Investment Property | ${SITE_NAME}`,
    description:
      'Get a free rental appraisal for your Melbourne investment property — rent benchmark, fee audit and vacancy check. No obligation.',
    url: '/property-review',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does the $500 switch offer work?',
    a: 'When you transfer the management of an investment property to Touchwood, you receive a $500 Visa gift card or cashback, plus $100 for each car park or storage unit you bring across. We handle the entire handover with your current agency — you don’t lift a finger. It’s a limited-time offer and terms apply; we’ll run through the details on the call.',
  },
  {
    q: 'How much does the appraisal cost?',
    a: 'Nothing. The appraisal is free and there is no obligation to switch agencies. We do it because a meaningful share of owners who see the numbers choose to move their management to us — but plenty do not, and that is fine.',
  },
  {
    q: 'Do I have to leave my current property manager?',
    a: 'No. Many owners use the appraisal purely as a second opinion, then take the findings back to their existing agency. You keep the report either way.',
  },
  {
    q: 'How long does it take?',
    a: 'The initial call takes about two minutes. If you want the full written review, we send it within two business days once we have the property address and current lease details.',
  },
  {
    q: 'What does the appraisal actually cover?',
    a: 'Four things: what your property should be renting for against comparable Melbourne listings, what you are paying in management and hidden fees, how your vacancy and arrears history compares to the market, and a short list of specific actions to lift your net return.',
  },
  {
    q: 'Which areas of Melbourne do you cover?',
    a: 'Touchwood manages property across Melbourne CBD, East Melbourne, South Melbourne, St Kilda, Carlton, Docklands, Southbank and the surrounding suburbs, with more than 220 assets under management.',
  },
]

const deliverables = [
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
const benefits = [
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
const testimonials = [
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
// property's status or numbers change there.
const pastWork: PastWorkItem[] = [
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

const steps = [
  {
    n: '1',
    title: 'Drop your details',
    body: 'Fifteen seconds. Name, mobile and the suburb your property is in.',
  },
  {
    n: '2',
    title: 'We call you for 2 minutes',
    body: 'A quick chat to understand the property, the lease and what you want out of it.',
  },
  {
    n: '3',
    title: 'You get the appraisal',
    body: 'A written summary with your rent benchmark, fee comparison and action list within two business days.',
  },
]

// Trust bar. All three are Touchwood's established claims, used sitewide
// and in the live ad creatives.
const trustStats: Array<[string, string]> = [
  ['220+', 'Properties under management'],
  ['260+', 'Owners served'],
  ['25+', 'Years combined experience'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Free Rental Appraisal',
          item: absoluteUrl('/property-review'),
        },
      ],
    },
    {
      // FAQPage markup is what earns "People also ask" placement and gives
      // answer engines (ChatGPT Search, Perplexity, Gemini) extractable Q&A.
      '@type': 'FAQPage',
      '@id': absoluteUrl('/property-review#faq'),
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'Service',
      '@id': absoluteUrl('/property-review#service'),
      name: 'Free Rental Appraisal for Melbourne Investment Property',
      serviceType: 'Rental appraisal and property management review',
      provider: { '@id': absoluteUrl('/#organization') },
      areaServed: { '@type': 'City', name: 'Melbourne, VIC, Australia' },
      audience: { '@type': 'Audience', audienceType: 'Residential property investors' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        url: absoluteUrl('/property-review'),
      },
    },
  ],
}

function GoogleLogo({ className }: { className?: string }) {
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

export default function PropertyReviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white pb-24 lg:pb-0">
        {/* Offer strip — the "$500 to switch" ads land here, so the page's
            first pixels must repeat the promise the ad made. Wording matches
            the established offer copy on /contact and OwnerPromo. Sticky so
            the offer stays visible the whole way down the page. */}
        <div className="sticky top-0 z-40 bg-primary px-4 py-2.5 text-center">
          <p className="text-sm font-semibold text-primary-foreground">
            Switching agencies? Get a $500 Visa gift card or cashback when you
            transfer your management to Touchwood.
            <span className="font-normal opacity-80"> *Terms apply</span>
          </p>
        </div>

        {/* Minimal funnel header — logo (deliberately NOT a link: no exit
            ramps off a paid-traffic funnel) and click-to-call only. */}
        <header className="border-b border-gray-200">
          <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <Image
              src="/logo-touchwood.png"
              alt={SITE_NAME}
              width={180}
              height={73}
              priority
              className="h-8 w-auto sm:h-11"
            />
            <CallLink
              location="funnel_header"
              className="flex min-h-12 items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary sm:text-base"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{CONTACT.phoneDisplay}</span>
              <span className="sm:hidden">Call us</span>
            </CallLink>
          </div>
        </header>

        {/* Hero — offer, one-line subhead, then the form itself. On mobile the
            headline + CTA fill the first screen and the form is one short
            scroll (or one tap on the CTA) away. No hero image/video: text
            paints instantly, which is the whole LCP budget on 4G. */}
        <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:py-20">
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  Free · No obligation
                </span>
                {/* [COPY REVIEW NEEDED] — headline wording per brief, confirm final */}
                <h1 className="mt-4 text-[2rem] font-bold leading-[1.12] tracking-tight text-gray-900 sm:text-5xl">
                  Get a free rental appraisal for your Melbourne investment
                  property
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Find out what your property should really be renting for —
                  and what you&apos;re overpaying in fees. One 2-minute call.
                </p>

                {/* Full-width jump CTA — the first-screen action on mobile.
                    Hidden on desktop, where the form sits right alongside. */}
                <a
                  href="#review-form"
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition hover:opacity-90 lg:hidden"
                >
                  Get my free appraisal
                </a>

                {/* Trust bar */}
                <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-gray-200 py-5">
                  {trustStats.map(([value, label]) => (
                    <div key={label} className="flex flex-col-reverse">
                      <dt className="text-xs text-gray-600 sm:text-sm">{label}</dt>
                      <dd className="text-xl font-bold text-gray-900 sm:text-3xl">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* scroll margin clears the sticky offer strip when jumping to the form
                  (it wraps to two lines on mobile, one on desktop) */}
              <div id="review-form" className="scroll-mt-24 lg:scroll-mt-16">
                <ReviewForm />
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-14 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What&apos;s in your free appraisal
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Four numbers most owners have never been shown about their own
                property.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {deliverables.map((d) => (
                <div
                  key={d.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-primary/40 hover:shadow-md"
                >
                  <d.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why switch — 3 short benefit blocks */}
        <section className="border-t border-gray-100 bg-gray-50 py-14 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Melbourne owners switch to Touchwood
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <b.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="#review-form"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
              >
                Get my free appraisal
              </a>
            </div>
          </div>
        </section>

        {/* Past work — real sold / leased outcomes, no links out of the funnel */}
        <section className="border-t border-gray-100 py-14 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Recent results, not promises
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                A few of the properties we&apos;ve sold and leased for Melbourne
                owners recently.
              </p>
            </div>

            <div className="mt-12">
              <PastWorkCarousel items={pastWork} />
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-t border-gray-100 bg-gray-50 py-14 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What owners say about us
              </h2>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500">
                <GoogleLogo className="h-4 w-4" />
                Reviews from Google
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.author}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1" aria-label="Rated 5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <GoogleLogo className="h-5 w-5" />
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* How it works + repeated form, so a visitor who reads to the bottom
            never has to scroll back up to convert. */}
        <section className="border-t border-gray-100 py-14 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  How it works
                </h2>
                <ol className="mt-8 space-y-8">
                  {steps.map((s) => (
                    <li key={s.n} className="flex gap-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {s.title}
                        </h3>
                        <p className="mt-1 leading-relaxed text-gray-600">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* top-14 clears the sticky offer strip (~40px on desktop) */}
              <div className="lg:sticky lg:top-14 lg:self-start">
                <ReviewForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-100 py-14 lg:py-24">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Questions owners ask
            </h2>
            <dl className="mt-10 divide-y divide-gray-200 border-t border-gray-200">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-lg font-semibold text-gray-900">{f.q}</dt>
                  <dd className="mt-2 leading-relaxed text-gray-600">{f.a}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 rounded-2xl bg-gray-900 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Two minutes now, or another year of not knowing.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-gray-300">
                Drop your details and let&apos;s have a quick chat.
              </p>
              <a
                href="#review-form"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Get my free appraisal
              </a>
            </div>
          </div>
        </section>

        {/* Minimal funnel footer. The Privacy Policy link stays: a lead form
            collecting personal details needs a reachable privacy policy. */}
        <footer className="border-t border-gray-200 py-8">
          <div className="container mx-auto max-w-6xl px-4 text-center text-sm text-gray-500 sm:px-6">
            <p>
              {SITE_NAME} · 1423/1 Queens Road, Melbourne VIC 3004 ·{' '}
              <a href={`tel:${CONTACT.phone}`} className="hover:text-gray-900">
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <p className="mt-2">
              <Link href="/legal/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
            </p>
          </div>
        </footer>
      </div>

      {/* Sticky mobile CTA — the funnel's main conversion path on phones */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <a
          href="#review-form"
          className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg"
        >
          Get my free appraisal
        </a>
      </div>
    </>
  )
}
