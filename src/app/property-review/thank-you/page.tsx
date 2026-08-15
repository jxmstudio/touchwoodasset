import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ThankYouTracking } from './ThankYouTracking'
import { CallLink } from '@/components/analytics/CallLink'
import { SITE_NAME, CONTACT } from '@/lib/site'
import { CheckCircle2, Phone, Clock, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thanks — your property review is booked',
  description:
    'Your free investment property review request has been received. Touchwood will call you within one business day.',
  // Confirmation pages must never be indexed: they are thin, they are not an
  // entry point, and an indexed one skews conversion reporting badly.
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Fires the Meta `Lead` and GA4 `generate_lead` conversions.
          Suspense is required: it reads search params, which would otherwise
          opt the whole page out of static prerendering. */}
      <Suspense fallback={null}>
        <ThankYouTracking />
      </Suspense>

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
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary sm:text-base"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{CONTACT.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-xl text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            You&apos;re booked in.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Eamon will call you within one business day to run through your
            property. It takes about two minutes — no obligation, and nothing
            to prepare.
          </p>

          <div className="mt-10 space-y-4 text-left">
            {[
              {
                icon: Phone,
                title: 'Watch for a Melbourne number',
                body: `We call from ${CONTACT.phoneDisplay}. If you miss it, we'll text you a time to call back.`,
              },
              {
                icon: Clock,
                title: 'The call takes about two minutes',
                body: 'Enough to understand the property, the current lease and what you want out of it.',
              },
              {
                icon: FileText,
                title: 'Your written review follows',
                body: 'Rent benchmark, fee comparison and a short action list — within two business days of the call.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h2 className="font-semibold text-gray-900">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-gray-900 p-6 text-center">
            <p className="text-gray-300">Would rather not wait?</p>
            <CallLink
              location="thank_you_primary"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              <Phone className="h-4 w-4" />
              Call {CONTACT.phoneDisplay}
            </CallLink>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            While you wait —{' '}
            <Link
              href="/listings"
              className="font-medium text-primary underline underline-offset-4"
            >
              see what we currently manage
            </Link>
            .
          </p>
        </div>
      </main>

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
  )
}
