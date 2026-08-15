import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FunnelVideo } from './FunnelVideo'
import { ReviewForm } from './ReviewForm'
import { CallLink } from '@/components/analytics/CallLink'
import { SITE_NAME, CONTACT, absoluteUrl } from '@/lib/site'
import {
  BarChart3,
  Receipt,
  CalendarClock,
  ClipboardList,
  Phone,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Investment Property Review — Melbourne Landlords',
  description:
    'When was the last time anyone reviewed how your Melbourne investment property is actually performing? Get a free 2-minute rent, fee and vacancy review from Touchwood Asset Management. No obligation to switch agencies.',
  keywords: [
    'free property review Melbourne',
    'investment property performance review',
    'rental appraisal Melbourne',
    'property management review',
    'am I charging enough rent Melbourne',
    'switch property manager Melbourne',
  ],
  alternates: { canonical: '/property-review' },
  openGraph: {
    title: `Free Investment Property Review | ${SITE_NAME}`,
    description:
      'Get a free 2-minute review of how your Melbourne investment property is performing — rent benchmark, fee audit and vacancy check.',
    url: '/property-review',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How much does the property review cost?',
    a: 'Nothing. The review is free and there is no obligation to switch agencies. We do it because a meaningful share of owners who see the numbers choose to move their management to us — but plenty do not, and that is fine.',
  },
  {
    q: 'Do I have to leave my current property manager?',
    a: 'No. Many owners use the review purely as a second opinion, then take the findings back to their existing agency. You keep the report either way.',
  },
  {
    q: 'How long does the review take?',
    a: 'The initial call takes about two minutes. If you want the full written review, we send it within two business days once we have the property address and current lease details.',
  },
  {
    q: 'What does the review actually cover?',
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

const steps = [
  {
    n: '1',
    title: 'Drop your details',
    body: 'Thirty seconds. Name, number and the suburb your property is in.',
  },
  {
    n: '2',
    title: 'We call you for 2 minutes',
    body: 'A quick chat to understand the property, the lease and what you want out of it.',
  },
  {
    n: '3',
    title: 'You get the review',
    body: 'A written summary with your rent benchmark, fee comparison and action list within two business days.',
  },
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
          name: 'Free Property Review',
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
      name: 'Free Investment Property Performance Review',
      serviceType: 'Property management review',
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
    {
      '@type': 'VideoObject',
      name: 'Is your Melbourne investment property actually performing?',
      description:
        'A look inside a managed Melbourne investment apartment — the kind of property covered by the free rent, fee and vacancy review.',
      thumbnailUrl: absoluteUrl('/videos/property-review-poster.jpg'),
      contentUrl: absoluteUrl('/videos/property-review.mp4'),
      uploadDate: '2026-08-13',
      duration: 'PT20S',
      publisher: { '@id': absoluteUrl('/#organization') },
    },
  ],
}

export default function PropertyReviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white pb-24 lg:pb-0">
        {/* Minimal funnel header — logo and phone only, no nav links out */}
        <header className="border-b border-gray-200">
          <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" aria-label={`${SITE_NAME} home`}>
              <Image
                src="/logo-touchwood.png"
                alt={SITE_NAME}
                width={180}
                height={73}
                priority
                className="h-9 w-auto sm:h-11"
              />
            </Link>
            <CallLink
              location="funnel_header"
              className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary sm:text-base"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{CONTACT.phoneDisplay}</span>
              <span className="sm:hidden">Call</span>
            </CallLink>
          </div>
        </header>

        {/* Hero */}
        <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  For Melbourne property owners
                </span>
                <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl">
                  When was the last time anyone actually reviewed how your
                  investment property is performing?
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-gray-600">
                  If the answer is &ldquo;never&rdquo; or &ldquo;I can&apos;t
                  remember&rdquo;, it&apos;s costing you. We help owners across
                  Melbourne squeeze more out of the same property — without
                  lifting a finger.
                </p>

                <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-gray-200 py-6">
                  {[
                    ['220+', 'Assets managed'],
                    ['260+', 'Owners served'],
                    ['25+', 'Years experience'],
                  ].map(([value, label]) => (
                    <div key={label} className="flex flex-col-reverse">
                      <dt className="text-xs text-gray-600 sm:text-sm">
                        {label}
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 hidden lg:block">
                  <a
                    href="#review-form"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
                  >
                    Get my free review
                  </a>
                  <p className="mt-3 text-sm text-gray-500">
                    Free · 2-minute chat · No obligation to switch
                  </p>
                </div>
              </div>

              <div>
                <FunnelVideo />
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What&apos;s in the review
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

        {/* How it works + form */}
        <section id="review-form" className="scroll-mt-8 bg-gray-50 py-16 lg:py-24">
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

                {/* Factual credibility block. Intentionally NOT a testimonial:
                    drop a real, attributable client quote in here once you have
                    written permission to publish it. */}
                <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Why owners let us look
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    {[
                      'Touchwood manages 220+ assets across Melbourne — we see real leasing outcomes weekly, not portal asking prices.',
                      'We manage residential, commercial, car parks and storage, so the review covers every asset class you hold.',
                      'The review is yours to keep and act on, with or without us.',
                    ].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:sticky lg:top-8 lg:self-start">
                <ReviewForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
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
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Get my free review
              </a>
            </div>
          </div>
        </section>

        {/* Minimal funnel footer */}
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
          Get my free review
        </a>
      </div>
    </>
  )
}
