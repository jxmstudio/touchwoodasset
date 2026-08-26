'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { CheckCircle2, Loader2, Phone, ShieldCheck } from 'lucide-react'
import { submitToJxmForms } from '@/lib/jxm-forms'
import { submitToSheets } from '@/lib/sheets-webhook'
import { CONTACT } from '@/lib/site'
import {
  attributionSummary,
  newEventId,
  setAdvancedMatching,
  trackLead,
  trackLeadStart,
} from '@/lib/tracking'

// The mobile number IS the lead — the notification email carries no
// Reply-To, so a bad number means an unreachable lead. Normalise whatever
// the visitor types (spaces, dashes, parens, +61, missing leading 0) into
// a local 04xx xxx xxx number, or return null if it isn't a real AU mobile.
function normaliseAuMobile(value: string): string | null {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('0011')) digits = digits.slice(4) // 0011 61 4…
  if (digits.startsWith('61')) digits = `0${digits.slice(2)}` // +61 4…
  if (digits.length === 9 && digits.startsWith('4')) digits = `0${digits}` // 4…
  if (!/^04\d{8}$/.test(digits)) return null
  // Keyboard-mash junk: 0400 000 000, 0411 111 111 and friends.
  if (/^(\d)\1{7}$/.test(digits.slice(2))) return null
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
}

// Exactly three fields, on purpose. This form takes cold Meta ad traffic on
// mobile; every extra field or dropdown measurably costs leads. Email,
// portfolio size and current situation were cut — the 2-minute call collects
// all of that anyway.
const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z
    .string()
    .min(1, 'Mobile number is required')
    .refine(
      (value) => normaliseAuMobile(value) !== null,
      'Please enter a valid Australian mobile, e.g. 04xx xxx xxx'
    ),
  suburb: z.string().min(2, 'Please enter the property suburb'),
})

type ReviewFormData = z.infer<typeof schema>

// The same form serves both funnel pages; only the copy and the tracking
// labels differ. 'appraisal' is /property-review (organic), 'switch' is
// /switch (paid Meta traffic sold on the $500 offer).
export type ReviewFormVariant = 'appraisal' | 'switch'

const COPY: Record<
  ReviewFormVariant,
  {
    /** content_name on the pixel Lead + GA4 form_name */
    formName: string
    /** content_category override on the Lead (undefined = default) */
    trackingVariant?: string
    /** `_form` label in the JXM Forms dashboard / email subject */
    jxmForm: string
    heading: string
    sub: string
    button: string
    micro: string
    leadMessage: (suburb: string) => string
    successBody: string
  }
> = {
  appraisal: {
    formName: 'property_review',
    jxmForm: 'property-review',
    heading: 'Get your free rental appraisal',
    sub: 'Takes 15 seconds. We’ll call you back within one business day — no obligation to switch.',
    button: 'Get my free appraisal',
    micro: 'Your details stay with Touchwood. No spam, no obligation.',
    leadMessage: (suburb) =>
      `Free rental appraisal requested via /property-review. Suburb: ${suburb}. Source: ${attributionSummary()}`,
    successBody:
      'Eamon will call you within one business day — watch for a call from ' +
      `${CONTACT.phoneDisplay}. The chat takes about two minutes, and your ` +
      'written appraisal follows within two business days.',
  },
  switch: {
    formName: 'switch_500',
    trackingVariant: 'switch-500',
    jxmForm: 'switch-500',
    heading: 'Claim your $500 switch offer',
    sub: 'Takes 15 seconds. We call you back within one business day. *T&Cs apply.',
    button: 'Claim my $500 + free appraisal',
    // The single allowed "no obligation to switch" on /switch lives here.
    micro: 'No obligation to switch. Your details stay with Touchwood.',
    leadMessage: (suburb) =>
      `$500 switch offer claimed via /switch. Suburb: ${suburb}. Source: ${attributionSummary()}`,
    successBody:
      'Eamon will call you within one business day — watch for a call from ' +
      `${CONTACT.phoneDisplay}. Two minutes to confirm the property and ` +
      'current lease, then we handle the entire handover with your current ' +
      'agency. Your $500 is issued once the transfer completes. *T&Cs apply.',
  },
}

export function ReviewForm({
  variant = 'appraisal',
}: {
  variant?: ReviewFormVariant
}) {
  const copy = COPY[variant]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [startedTracked, setStartedTracked] = useState(false)
  // Honeypot: hidden from humans, bots auto-fill it. Its value is sent as
  // `_gotcha` and JXM Forms drops any submission where it's non-empty.
  const honeypotRef = useRef<HTMLInputElement>(null)

  // Fire once, on the visitor's first REAL interaction with the form — a
  // pointer press or a keystroke inside it. Not focus: Chrome autofill fires
  // focus events on inputs at page load, which made LeadFormStart fire one
  // second after PageView with nobody touching anything. The ratio of starts
  // to completions is what tells you whether the form itself is the problem.
  const handleFirstInteraction = () => {
    if (startedTracked) return
    setStartedTracked(true)
    trackLeadStart(copy.formName)
  }

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', suburb: '' },
  })

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true)
    // Schema guarantees this is non-null; send the normalised 04xx xxx xxx
    // form so the number in the notification email is always call-ready.
    const mobile = normaliseAuMobile(data.phone) ?? data.phone
    // Carries utm_source / fbclid etc. into the lead record so each lead
    // can be traced back to the ad or campaign that produced it.
    const message = copy.leadMessage(data.suburb)
    try {
      // JXM Forms is the lead of record (dashboard + notification email);
      // the Google Sheet is the ops view the team actually watches. Post to
      // both in parallel, but only JXM decides success — a sheet hiccup must
      // never cost the lead or show the visitor an error.
      const [result, sheetResult] = await Promise.all([
        submitToJxmForms({
          _form: copy.jxmForm,
          name: data.name,
          phone: mobile,
          suburb: data.suburb,
          message,
          _gotcha: honeypotRef.current?.value ?? '',
        }),
        submitToSheets({
          type: 'property-review',
          timestamp: new Date().toISOString(),
          name: data.name,
          phone: mobile,
          message,
        }).catch((error: unknown) => {
          console.error('Sheets webhook post failed:', error)
          return { success: false as const }
        }),
      ])

      if (!result.success) {
        throw new Error(result.error || 'Submission failed')
      }
      if (!sheetResult.success) {
        console.error('Lead saved to JXM Forms but the Google Sheet row failed')
      }

      // Fire the Meta `Lead` in place, only after the backend confirmed the
      // submission — no navigation to a thank-you page, because on a 4G phone
      // that second page load is where conversions (and their pixel events)
      // used to go to die. Matching data goes first so fbevents hashes it
      // into the Lead.
      setAdvancedMatching({ name: data.name, phone: mobile })
      trackLead({
        formName: copy.formName,
        suburb: data.suburb,
        variant: copy.trackingVariant,
        // One UUID shared by the browser pixel event and the CAPI event so
        // Meta dedupes them into a single Lead; user details are hashed
        // server-side for CAPI matching.
        eventId: newEventId(),
        user: { name: data.name, phone: mobile },
      })
      setSubmitted(true)
      // Tells the sticky mobile CTA to retire — its job is done.
      window.dispatchEvent(new Event('tw-lead-submitted'))
    } catch (error) {
      console.error('Property review submission failed:', error)
      toast.error(
        'Sorry — that did not go through. Please try again, or call us on +61 413 889 388.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          You&apos;re booked in.
        </h2>
        <p className="mt-2 leading-relaxed text-gray-600">{copy.successBody}</p>
        <a
          href={`tel:${CONTACT.phone}`}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-gray-800"
        >
          <Phone className="h-4 w-4" />
          Rather not wait? Call us now
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-8">
      {/* Hidden on phones: the page h1 sits directly above this card there,
          and repeating it costs ~60px of the one screen that must also fit
          the submit button. */}
      <h2 className="hidden text-lg font-bold text-gray-900 sm:block sm:text-2xl">
        {copy.heading}
      </h2>
      <p className="mt-1 text-sm text-gray-600 sm:mt-2">{copy.sub}</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onPointerDownCapture={handleFirstInteraction}
          onKeyDownCapture={handleFirstInteraction}
          className="mt-4 space-y-3 sm:mt-6 sm:space-y-4"
        >
          <input
            ref={honeypotRef}
            type="text"
            name="_gotcha"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  {/* h-12 = 48px minimum tap target for mobile */}
                  <Input
                    placeholder="Jane Smith"
                    autoComplete="name"
                    aria-required="true"
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    placeholder="04xx xxx xxx"
                    autoComplete="tel"
                    aria-required="true"
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="suburb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property suburb</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. South Melbourne"
                    autoComplete="address-level2"
                    aria-required="true"
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-14 w-full text-base font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              copy.button
            )}
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            {copy.micro}
          </p>
        </form>
      </Form>
    </div>
  )
}
