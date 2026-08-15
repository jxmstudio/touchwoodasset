import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_URL, CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms on which Touchwood Asset Management provides this website and its property management, sales and leasing services.',
  alternates: { canonical: '/legal/terms' },
}

const LAST_UPDATED = '13 August 2026'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          Terms of Service
        </h1>
        <p className="mb-10 text-sm text-gray-500">
          Last updated {LAST_UPDATED}
        </p>

        <div className="space-y-10 text-gray-700 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_li]:mb-1.5 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          <section>
            <p className="leading-relaxed">
              These terms govern your use of {SITE_URL.replace(/^https?:\/\//, '')}{' '}
              and any enquiry you make through it. By using this website you
              accept these terms. If you do not accept them, please do not use
              the site.
            </p>
          </section>

          <section>
            <h2>1. About us</h2>
            <p>
              This website is operated by {SITE_NAME}, a property asset
              management business located at 1423/1 Queens Road, Melbourne VIC
              3004. In these terms, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
              &ldquo;our&rdquo; mean {SITE_NAME}.
            </p>
          </section>

          <section>
            <h2>2. Information on this site is general only</h2>
            <p>
              Content on this website — including property listings, rental
              figures, availability, sizes, images, floor plans and any
              indicative appraisal or review — is provided for general
              information. It does not take account of your objectives,
              financial situation or needs, and is not financial, investment,
              legal or taxation advice.
            </p>
            <p>
              You should obtain your own independent advice, and satisfy
              yourself as to the accuracy of any information, before making a
              decision.
            </p>
          </section>

          <section>
            <h2>3. Listings, availability and pricing</h2>
            <p>
              Property, car park and storage listings are subject to change
              without notice. Availability, rent, price and terms are indicative
              and are not an offer capable of acceptance. Measurements, sizes
              and floor plans are approximate. Images may include staging or be
              indicative of a property type rather than the exact unit shown.
            </p>
            <p>
              No listing on this site constitutes a contract. All arrangements
              are subject to a separate written agreement, and to the owner&apos;s
              approval.
            </p>
          </section>

          <section>
            <h2>4. Free property review</h2>
            <p>
              Where we offer a complimentary property review or appraisal, it is
              provided free of charge and without obligation on either side. Any
              rent benchmark, fee comparison or recommendation in a review is an
              opinion based on the information available to us at the time. It
              is not a formal valuation, is not prepared by a certified
              practising valuer, and must not be relied on for finance,
              accounting, insurance or legal purposes.
            </p>
          </section>

          <section>
            <h2>5. Enquiries and your information</h2>
            <p>
              When you submit a form you warrant that the information you give
              is accurate and that you are entitled to provide it. We handle
              personal information in accordance with our{' '}
              <Link
                href="/legal/privacy"
                className="text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              Submitting an enquiry does not create a client relationship or
              oblige us to provide services.
            </p>
          </section>

          <section>
            <h2>6. Acceptable use</h2>
            <p>You must not:</p>
            <ul>
              <li>use this site for any unlawful purpose;</li>
              <li>
                scrape, harvest or systematically extract content or listing
                data without our written permission;
              </li>
              <li>
                attempt to gain unauthorised access to any part of the site, its
                servers or connected systems;
              </li>
              <li>
                interfere with the operation of the site or introduce malicious
                code;
              </li>
              <li>
                reproduce, republish or commercially exploit our content without
                permission.
              </li>
            </ul>
          </section>

          <section>
            <h2>7. Intellectual property</h2>
            <p>
              All content on this site — including text, photography, floor
              plans, video, graphics, logos and the Touchwood name — is owned by
              us or our licensors and is protected by copyright and trade mark
              law. You may view and print pages for your own personal,
              non-commercial use.
            </p>
          </section>

          <section>
            <h2>8. Third-party links</h2>
            <p>
              This site may link to third-party websites. We do not control them
              and are not responsible for their content, availability or privacy
              practices. A link is not an endorsement.
            </p>
          </section>

          <section>
            <h2>9. Liability</h2>
            <p>
              Nothing in these terms excludes, restricts or modifies any
              guarantee, right or remedy you have under the Australian Consumer
              Law that cannot lawfully be excluded.
            </p>
            <p>
              Subject to that, we provide this website on an &ldquo;as is&rdquo;
              basis and do not warrant that it will be uninterrupted or
              error-free, or that information on it is complete or current. To
              the extent permitted by law, we are not liable for any indirect or
              consequential loss arising from your use of, or reliance on, this
              website. Where liability cannot be excluded, it is limited to
              re-supplying the relevant service or paying the cost of doing so.
            </p>
          </section>

          <section>
            <h2>10. Changes</h2>
            <p>
              We may change these terms at any time by publishing an updated
              version on this page. The version in force is the one published
              when you use the site.
            </p>
          </section>

          <section>
            <h2>11. Governing law</h2>
            <p>
              These terms are governed by the laws of Victoria, Australia. You
              submit to the non-exclusive jurisdiction of the courts of that
              state.
            </p>
          </section>

          <section>
            <h2>12. Contact</h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-primary underline underline-offset-4"
              >
                {CONTACT.email}
              </a>{' '}
              or{' '}
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-primary underline underline-offset-4"
              >
                {CONTACT.phoneDisplay}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
