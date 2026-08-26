import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ReviewForm } from '../property-review/ReviewForm'
import { PastWorkCarousel } from '../property-review/PastWorkCarousel'
import { StickyCta } from '../property-review/StickyCta'
import { TrustStats } from '../property-review/TrustStats'
import {
  GoogleLogo,
  benefits,
  deliverables,
  residentialLeasedWork,
  testimonials,
} from '../property-review/funnel-content'
import { CallLink } from '@/components/analytics/CallLink'
import { ViewContentTracker } from '@/components/analytics/ViewContentTracker'
import { SITE_NAME, CONTACT } from '@/lib/site'
import { Phone, Star } from 'lucide-react'

// Paid-traffic variant of /property-review, message-matched to the live Meta
// ads ("Get $500 to Switch Property Managers"). /property-review stays the
// indexed organic page with the appraisal-first framing; this page is noindex
// and exists only as an ad destination, so its copy can lead with the offer.
export const metadata: Metadata = {
  title: 'Get $500 to Switch Property Managers — Melbourne',
  description:
    'Get $500 when you transfer your Melbourne investment property to Touchwood, plus a free rental appraisal. We handle the entire handover. T&Cs apply.',
  // Ad landing page: never indexed, never in the sitemap (src/app/sitemap.ts
  // is a static allowlist that deliberately omits this route).
  robots: { index: false, follow: true },
}

// The switch-first FAQ. Reuses /property-review answers where they fit, but
// note the copy rule for this page: "no obligation to switch" appears exactly
// once, in the form micro-copy — never here.
const faqs = [
  {
    q: 'How does the $500 switch offer work?',
    a: 'When you transfer the management of an investment property to Touchwood, you receive a $500 Visa gift card or cashback, plus $100 for each car park or storage unit you bring across. We handle the entire handover with your current agency — you don’t lift a finger. It’s a limited-time offer and terms apply; we’ll run through the details on the call.',
  },
  {
    q: 'Will my current agency make it hard to leave?',
    a: 'No. Standard notice periods under your current management agreement apply, and Touchwood serves the notice and manages the file transfer with your current agency. You sign one authority form — we handle everything else, and your tenants barely notice the change.',
  },
  {
    q: 'How much does the appraisal cost?',
    a: 'Nothing. The free rental appraisal comes with the switch offer — rent benchmark, fee audit, vacancy check and action list — and you keep the report either way.',
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

const steps = [
  {
    n: '1',
    title: 'Drop your details',
    body: 'Fifteen seconds. Name, mobile and the suburb your property is in.',
  },
  {
    n: '2',
    title: 'We call for 2 minutes',
    body: 'A quick chat to confirm the property and the current lease.',
  },
  {
    n: '3',
    title: 'We handle the handover',
    body: 'We contact your current agency, serve the notice and transfer the file. Your $500 Visa gift card or cashback is issued on completion.*',
  },
]

export default function SwitchPage() {
  return (
    <>
      <ViewContentTracker contentName="switch" contentCategory="switch-500" />

      <div className="min-h-screen bg-white pb-24 lg:pb-0">
        {/* Minimal funnel header — logo (deliberately NOT a link: no exit
            ramps off a paid-traffic funnel) and click-to-call only. No $500
            top strip here: unlike /property-review, the H1 itself repeats the
            ad's offer, and the strip would just tax first-screen height. */}
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
              location="switch_header"
              className="flex min-h-12 items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary sm:text-base"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{CONTACT.phoneDisplay}</span>
              <span className="sm:hidden">Call us</span>
            </CallLink>
          </div>
        </header>

        {/* Hero — same above-the-fold discipline as /property-review: at
            390×844 the eyebrow, H1 and the whole form (three fields + submit)
            must fit the first screen. Subhead and trust stats move below the
            form on phones. No hero image/video. */}
        <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6 sm:pt-8 lg:py-20">
            <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Melbourne investment property owners
                </p>
                <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl sm:leading-[1.12]">
                  Get $500 when you switch your property management to
                  Touchwood*
                </h1>
                <p className="mt-4 hidden text-lg leading-relaxed text-gray-600 lg:block">
                  Plus a free rental appraisal — rent benchmark, fee audit,
                  vacancy check. We handle the entire handover with your
                  current agency.
                </p>

                {/* Trust bar — counts up when scrolled into view */}
                <div className="hidden lg:block">
                  <TrustStats />
                </div>
              </div>

              <div id="review-form" data-review-form className="scroll-mt-4">
                <ReviewForm variant="switch" />
              </div>

              {/* Phone-only: the reassurance the left column shows on desktop,
                  now after the form instead of in front of it. */}
              <div className="lg:hidden">
                <p className="text-base leading-relaxed text-gray-600">
                  Plus a free rental appraisal — rent benchmark, fee audit,
                  vacancy check. We handle the entire handover with your
                  current agency.
                </p>
                <TrustStats />
              </div>
            </div>
          </div>
        </section>

        {/* How the switch works — up top, because "is switching painful?" is
            this audience's real objection, not "is the appraisal any good?". */}
        <section className="py-14 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How the switch works
              </h2>
            </div>

            <ol className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5 md:flex-col md:gap-4">
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
        </section>

        {/* Why owners switch — same three blocks as /property-review */}
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
                Claim my $500 + free appraisal
              </a>
            </div>
          </div>
        </section>

        {/* The free appraisal — reframed as the consolation prize */}
        <section className="border-t border-gray-100 py-14 lg:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Not ready to switch? Get the numbers anyway.
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Every enquiry gets a free appraisal — four numbers most owners
                have never been shown about their own property.
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

        {/* Social proof — testimonials + residential leased results only.
            The $427k sale and the car park block are off-message for an
            audience switching a rental's management. */}
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

            <div className="mt-12">
              <PastWorkCarousel items={residentialLeasedWork} />
            </div>
          </div>
        </section>

        {/* FAQ + closing CTA */}
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
                $500 for switching. Free appraisal either way.*
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-gray-300">
                Drop your details and we&apos;ll call you back within one
                business day.
              </p>
              <a
                href="#review-form"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Claim my $500 + free appraisal
              </a>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              *The $500 switch offer is a Visa gift card or cashback, issued
              once the management transfer completes. Limited-time offer;
              terms and conditions apply.
            </p>
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

      {/* Sticky mobile CTA — appears only once the form is off screen,
          and retires after a submission. */}
      <StickyCta label="Claim my $500 + free appraisal" />
    </>
  )
}
