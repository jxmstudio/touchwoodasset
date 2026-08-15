import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Refunds & Cancellations',
  description:
    'How cancellations, refunds and service issues are handled for Touchwood Asset Management services, including your rights under the Australian Consumer Law.',
  alternates: { canonical: '/legal/returns' },
}

const LAST_UPDATED = '13 August 2026'

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          Refunds &amp; Cancellations
        </h1>
        <p className="mb-10 text-sm text-gray-500">
          Last updated {LAST_UPDATED}
        </p>

        <div className="space-y-10 text-gray-700 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_li]:mb-1.5 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          <section>
            <p className="leading-relaxed">
              {SITE_NAME} provides services rather than physical goods, so this
              policy explains how cancellations, refunds and service issues are
              handled across our property management, leasing and sales
              services.
            </p>
          </section>

          <section>
            <h2>1. Free services</h2>
            <p>
              Property reviews, rental appraisals, market appraisals and initial
              consultations are provided free of charge. No payment is taken, so
              no refund arises. You may stop the process at any time by telling
              us.
            </p>
          </section>

          <section>
            <h2>2. Management and leasing agreements</h2>
            <p>
              Where we manage a property for you, fees and the notice required
              to end the arrangement are set out in your signed management
              agreement. That agreement prevails over this page.
            </p>
            <p>Generally:</p>
            <ul>
              <li>
                management fees are charged in arrears on rent collected, and
                are not charged for periods after termination takes effect;
              </li>
              <li>
                letting and leasing fees are earned when a tenancy is secured
                and are not refundable once the tenant has taken possession;
              </li>
              <li>
                marketing and advertising costs already incurred on your
                instruction are not refundable;
              </li>
              <li>
                fees paid in advance for a period not yet served are refunded on
                a pro-rata basis.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Storage and car park licences</h2>
            <p>
              Storage units and car park bays are offered on flexible
              month-to-month terms unless agreed otherwise. To end a licence,
              give us notice in line with your agreement — one calendar month
              unless stated otherwise. Rent paid for a period beyond the
              effective end date is refunded pro-rata. Any bond or deposit is
              refunded once the space is vacated, cleared and inspected, less
              any amount owing for damage, cleaning or unpaid rent.
            </p>
          </section>

          <section>
            <h2>4. Bookings and inspections</h2>
            <p>
              Inspections and appointments can be rescheduled or cancelled at no
              cost. We ask for as much notice as you can give so the time can be
              offered to someone else.
            </p>
          </section>

          <section>
            <h2>5. Your rights under the Australian Consumer Law</h2>
            <p>
              Our services come with guarantees that cannot be excluded under
              the Australian Consumer Law. Services must be provided with due
              care and skill, be fit for the purpose you told us about, and be
              supplied within a reasonable time.
            </p>
            <p>
              If a service falls short, you are entitled to have the problem
              fixed. If the failure is major, you may cancel the service and
              obtain a refund for the unused portion, and you may be entitled to
              compensation for reasonably foreseeable loss.
            </p>
          </section>

          <section>
            <h2>6. If something has gone wrong</h2>
            <p>
              Contact us first — most issues are resolved quickly. Email{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-primary underline underline-offset-4"
              >
                {CONTACT.email}
              </a>{' '}
              or call{' '}
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-primary underline underline-offset-4"
              >
                {CONTACT.phoneDisplay}
              </a>
              , describing what happened and what outcome you are seeking. We
              aim to acknowledge within two business days and resolve within 30
              days.
            </p>
            <p>
              If we cannot resolve it, you can contact Consumer Affairs Victoria
              on 1300 55 81 81, or the Victorian Civil and Administrative
              Tribunal for tenancy matters.
            </p>
          </section>

          <section>
            <h2>7. Approved refunds</h2>
            <p>
              Where a refund is agreed, it is paid to the original payment
              method or nominated bank account within 10 business days of
              agreement.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              See also our{' '}
              <Link
                href="/legal/terms"
                className="text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/legal/privacy"
                className="text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
