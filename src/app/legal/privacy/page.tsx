import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Touchwood Asset Management collects, uses, stores and discloses personal information, in line with the Australian Privacy Principles.',
  alternates: { canonical: '/legal/privacy' },
}

const LAST_UPDATED = '13 August 2026'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mb-10 text-sm text-gray-500">
          Last updated {LAST_UPDATED}
        </p>

        <div className="space-y-10 text-gray-700 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:font-semibold [&_h3]:text-gray-900 [&_li]:mb-1.5 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          <section>
            <p className="leading-relaxed">
              {SITE_NAME} (ABN to be confirmed) respects your privacy. This
              policy explains how we collect, hold, use and disclose personal
              information, and how we comply with the{' '}
              <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
              Principles (APPs).
            </p>
            <p className="leading-relaxed">
              By using this website or submitting an enquiry, you agree to the
              handling of your personal information as described below.
            </p>
          </section>

          <section>
            <h2>1. What we collect</h2>
            <p>We collect personal information that you give us directly, including:</p>
            <ul>
              <li>
                <strong>Contact details</strong> — your name, email address and
                phone number, when you submit an enquiry, book an inspection,
                request a valuation or request a property review.
              </li>
              <li>
                <strong>Property information</strong> — the address or suburb of
                a property, its type and size, the number of properties you own,
                and details of any current management arrangement.
              </li>
              <li>
                <strong>Correspondence</strong> — the content of messages you
                send us by form, email or phone.
              </li>
            </ul>
            <p>
              We also collect certain information automatically when you visit
              the site, as described in section 4.
            </p>
            <p>
              You may deal with us anonymously or under a pseudonym where it is
              lawful and practicable. In most cases we will need your contact
              details to respond to an enquiry.
            </p>
          </section>

          <section>
            <h2>2. Why we collect it</h2>
            <p>We use personal information to:</p>
            <ul>
              <li>respond to your enquiry and provide the service you asked for;</li>
              <li>
                prepare property reviews, appraisals, valuations and management
                proposals;
              </li>
              <li>arrange and conduct property inspections;</li>
              <li>manage properties, leases and tenancies where we act for you;</li>
              <li>
                send you information about our services, where you have asked
                for it or would reasonably expect it;
              </li>
              <li>improve this website and understand how it is used;</li>
              <li>meet our legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2>3. Who we disclose it to</h2>
            <p>We may disclose your personal information to:</p>
            <ul>
              <li>
                service providers who help us operate our business — including
                website hosting, email, customer relationship and spreadsheet
                platforms;
              </li>
              <li>
                trades, contractors and inspectors, where required to carry out
                work on a property we manage for you;
              </li>
              <li>
                landlords, tenants, prospective tenants or purchasers, where
                relevant to a transaction you are party to;
              </li>
              <li>
                professional advisers, and government or regulatory bodies where
                required or authorised by law.
              </li>
            </ul>
            <p>
              We do not sell your personal information. We do not disclose it to
              third parties for their own marketing purposes.
            </p>
            <h3>Overseas disclosure</h3>
            <p>
              Some of our service providers — including analytics and
              advertising platforms — store data on servers outside Australia,
              including in the United States. Where we disclose information to
              an overseas recipient, we take reasonable steps to ensure it is
              handled consistently with the APPs.
            </p>
          </section>

          <section>
            <h2>4. Cookies, analytics and advertising</h2>
            <p>
              This website uses cookies and similar technologies to operate the
              site and understand how it is used.
            </p>
            <h3>Google Analytics</h3>
            <p>
              We use Google Analytics to collect information about pages
              visited, time on site, approximate location and the referring
              source. This data is aggregated and is not used to identify you
              personally. You can opt out using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-primary underline underline-offset-4"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
            <h3>Meta Pixel</h3>
            <p>
              We use the Meta Pixel so that we can measure the results of
              advertising on Facebook and Instagram, and show relevant ads to
              people who have visited this site. The pixel records page views
              and actions such as submitting an enquiry form, and shares this
              with Meta Platforms, Inc. You can control how ads are targeted to
              you through your{' '}
              <a
                href="https://www.facebook.com/adpreferences"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-primary underline underline-offset-4"
              >
                Facebook ad preferences
              </a>
              .
            </p>
            <h3>Managing cookies</h3>
            <p>
              Most browsers let you refuse or delete cookies. Blocking cookies
              may affect how parts of this website function.
            </p>
          </section>

          <section>
            <h2>5. How we hold and protect it</h2>
            <p>
              Personal information is held in electronic form on services
              operated by us and our providers. We take reasonable steps to
              protect it from misuse, loss, unauthorised access, modification
              and disclosure — including access controls, encrypted connections
              and limiting access to staff who need it.
            </p>
            <p>
              No method of transmission or storage is completely secure. We
              cannot guarantee absolute security of information transmitted to
              us over the internet.
            </p>
            <p>
              We keep personal information only as long as needed for the
              purposes described above, or as required by law, after which we
              take reasonable steps to destroy or de-identify it.
            </p>
          </section>

          <section>
            <h2>6. Direct marketing</h2>
            <p>
              We may send you information about our services where you would
              reasonably expect it. Every marketing message includes an
              unsubscribe option, and you can opt out at any time by contacting
              us at{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-primary underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
              . We will action the request promptly and at no cost.
            </p>
          </section>

          <section>
            <h2>7. Accessing and correcting your information</h2>
            <p>
              You may request access to the personal information we hold about
              you, and ask us to correct it if it is inaccurate, out of date or
              incomplete. Contact us using the details below. We will respond
              within a reasonable period, and will tell you the reason if we
              refuse a request.
            </p>
          </section>

          <section>
            <h2>8. Complaints</h2>
            <p>
              If you believe we have breached the Australian Privacy Principles,
              contact us first using the details below. We will acknowledge your
              complaint and aim to resolve it within 30 days.
            </p>
            <p>
              If you are not satisfied with our response, you may complain to
              the Office of the Australian Information Commissioner at{' '}
              <a
                href="https://www.oaic.gov.au"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-primary underline underline-offset-4"
              >
                oaic.gov.au
              </a>{' '}
              or on 1300 363 992.
            </p>
          </section>

          <section>
            <h2>9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The current version
              is always published on this page with the date it was last
              updated.
            </p>
          </section>

          <section>
            <h2>10. Contact us</h2>
            <p>
              {SITE_NAME}
              <br />
              1423/1 Queens Road, Melbourne VIC 3004
              <br />
              Email:{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-primary underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
              <br />
              Phone:{' '}
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-primary underline underline-offset-4"
              >
                {CONTACT.phoneDisplay}
              </a>
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
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
