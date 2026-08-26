'use client'

import { useEffect, useState } from 'react'

/**
 * Sticky bottom CTA for phones. Appears only once every on-page form has
 * scrolled out of view — while a form is visible the bar would either cover
 * it or just duplicate the submit button next to it. Retires for good when
 * the visitor submits (ReviewForm dispatches `tw-lead-submitted`).
 */
export function StickyCta({
  label = 'Get my free appraisal',
}: {
  label?: string
}) {
  const [formsOffScreen, setFormsOffScreen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const forms = document.querySelectorAll('[data-review-form]')
    if (forms.length === 0) return

    const visible = new Set<Element>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setFormsOffScreen(visible.size === 0)
      },
      // Fire while any slice of a form is on screen, so the bar never
      // overlaps the bottom edge of a form the visitor is filling in.
      { threshold: 0 }
    )
    forms.forEach((f) => obs.observe(f))

    const onSubmitted = () => setSubmitted(true)
    window.addEventListener('tw-lead-submitted', onSubmitted)
    return () => {
      obs.disconnect()
      window.removeEventListener('tw-lead-submitted', onSubmitted)
    }
  }, [])

  if (submitted || !formsOffScreen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <a
        href="#review-form"
        className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg"
      >
        {label}
      </a>
    </div>
  )
}
