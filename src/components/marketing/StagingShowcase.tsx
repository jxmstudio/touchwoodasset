import { BadgeCheck, Eye, Tag } from 'lucide-react'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { stagingShowcase, type StagingCaseStudy } from '@/data/showcase'

interface StagingShowcaseProps {
  /** Where the closing button sends the visitor (in-page anchor on funnels). */
  ctaHref: string
  ctaLabel: string
  caseStudy?: StagingCaseStudy
  /** Set on above-the-fold placements only; defaults to lazy images. */
  priority?: boolean
  className?: string
}

// [COPY REVIEW NEEDED] — the three supporting points below are drafted from
// Eamon's brief ("fresh photos and video", staged images tagged Unfurnished).
// Confirm each is true of every managed property before launch.
const points = [
  {
    icon: Eye,
    title: 'Photos that stop the scroll',
    body: 'Renters skim hundreds of listings. A furnished room reads as a home in a split second; an empty one reads as a chore.',
  },
  {
    icon: Tag,
    title: 'Honest by design',
    body: 'Every staged image carries an “Unfurnished” tag, so nobody arrives at an inspection expecting the furniture.',
  },
  {
    icon: BadgeCheck,
    title: 'Part of the service',
    body: 'Fresh photography, virtual staging and video are how we present every property we manage — not an add-on invoice.',
  },
]

/**
 * Dark full-width band: two drag-to-compare sliders showing how a property was
 * advertised by its previous agency versus the Touchwood campaign. Used on
 * /landlords and both funnel landing pages; the funnels pass an in-page
 * anchor as `ctaHref` so there are no exit ramps off paid traffic.
 */
export function StagingShowcase({
  ctaHref,
  ctaLabel,
  caseStudy = stagingShowcase,
  priority = false,
  className = '',
}: StagingShowcaseProps) {
  return (
    <section
      className={`bg-gray-950 py-14 text-white lg:py-24 ${className}`}
      aria-labelledby="staging-showcase-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How we market your property
          </p>
          <h2
            id="staging-showcase-heading"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Same home. Same rooms. A very different listing.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            {caseStudy.context}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {caseStudy.pairs.map((pair, i) => (
            <figure key={pair.id}>
              <BeforeAfterSlider
                before={pair.before}
                after={pair.after}
                beforeLabel="Previous agency"
                afterLabel="Touchwood"
                initialPosition={i === 0 ? 55 : 45}
                priority={priority && i === 0}
              />
              <figcaption className="mt-3 flex items-center justify-between text-sm text-gray-400">
                <span className="font-medium text-gray-200">{pair.room}</span>
                <span>{caseStudy.address}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Drag the handle to compare. Staged images are digitally furnished and
          tagged “Unfurnished” on the listing.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p.icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={ctaHref}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
