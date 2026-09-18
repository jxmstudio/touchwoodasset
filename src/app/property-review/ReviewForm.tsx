'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import {
  CheckCircle2,
  Loader2,
  MessageSquareText,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { formatAuMobile, isFullName } from '@/lib/phone'
import { CONTACT } from '@/lib/site'
import {
  attributionSummary,
  newEventId,
  setAdvancedMatching,
  trackLead,
  trackLeadCodeSent,
  trackLeadStart,
} from '@/lib/tracking'

/**
 * Two-step funnel form.
 *
 *   1. Full name + AU mobile + suburb  →  POST /api/verify/start texts a code
 *   2. 6-digit code                    →  POST /api/lead confirms the code
 *                                          with Twilio and records the lead
 *
 * The lead is billed per submission with a real, reachable number and a full
 * name, so nothing is recorded until the visitor proves they hold the phone.
 * The server writes the "Phone verified" stamp; this component never gets
 * to claim a number is verified.
 */

// Exactly three fields, on purpose. This form takes cold Meta ad traffic on
// mobile; every extra field or dropdown measurably costs leads. Email,
// portfolio size and current situation were cut — the 2-minute call collects
// all of that anyway.
const schema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your full name')
    .refine(isFullName, 'Please enter your first and last name'),
  phone: z
    .string()
    .min(1, 'Mobile number is required')
    .refine(
      (value) => formatAuMobile(value) !== null,
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
    heading: string
    sub: string
    button: string
    confirmButton: string
    micro: string
    successBody: string
  }
> = {
  appraisal: {
    formName: 'property_review',
    heading: 'Get your free rental appraisal',
    sub: 'Takes 30 seconds. We’ll call you back within one business day — no obligation to switch.',
    button: 'Get my free appraisal',
    confirmButton: 'Confirm my number',
    micro: 'Your details stay with Touchwood. No spam, no obligation.',
    successBody:
      'Eamon will call you within one business day — watch for a call from ' +
      `${CONTACT.phoneDisplay}. The chat takes about two minutes, and your ` +
      'written appraisal follows within two business days.',
  },
  switch: {
    formName: 'switch_500',
    trackingVariant: 'switch-500',
    heading: 'Claim your $500 switch offer',
    sub: 'Takes 30 seconds. We call you back within one business day. *T&Cs apply.',
    button: 'Claim my $500 + free appraisal',
    confirmButton: 'Confirm & claim my $500',
    // The single allowed "no obligation to switch" on /switch lives here.
    micro: 'No obligation to switch. Your details stay with Touchwood.',
    successBody:
      'Eamon will call you within one business day — watch for a call from ' +
      `${CONTACT.phoneDisplay}. Two minutes to confirm the property and ` +
      'current lease, then we handle the entire handover with your current ' +
      'agency. Your $500 is issued once the transfer completes. *T&Cs apply.',
  },
}

const CALL_US = `or call us on ${CONTACT.phoneDisplay}.`

/** Visitor-facing copy for every error code the two API routes can return. */
const ERROR_COPY: Record<string, string> = {
  invalid_number:
    'That mobile number doesn’t look right. Please check it and try again.',
  not_sms_capable:
    'That number can’t receive text messages. Please enter a mobile number.',
  too_many_sends: `Too many codes have been sent to that number. Please wait 10 minutes, ${CALL_US}`,
  too_many_attempts: 'Too many incorrect codes. Please request a new one.',
  expired: 'That code has expired. Tap “Resend code” to get a new one.',
  wrong_code: 'That code isn’t right. Check the text message and try again.',
  blocked: `We couldn’t send a code to that number. Please try another mobile, ${CALL_US}`,
  provider_error: `We couldn’t send the code just now. Please try again in a moment, ${CALL_US}`,
  invalid_input: 'Please check your details and try again.',
  lead_failed: `Your number is confirmed but the submission didn’t go through. Please try again, ${CALL_US}`,
}

function errorCopy(code: unknown): string {
  return (
    (typeof code === 'string' && ERROR_COPY[code]) ||
    `Sorry — that did not go through. Please try again, ${CALL_US}`
  )
}

async function postJson(
  url: string,
  body: Record<string, unknown>
): Promise<{ ok: boolean; code?: string; dev?: boolean }> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const json = await response.json().catch(() => null)
    if (json && typeof json.ok === 'boolean') return json
    return { ok: false, code: response.ok ? 'provider_error' : 'lead_failed' }
  } catch {
    return { ok: false, code: 'provider_error' }
  }
}

const RESEND_COOLDOWN_S = 30

export function ReviewForm({
  variant = 'appraisal',
}: {
  variant?: ReviewFormVariant
}) {
  const copy = COPY[variant]
  const [step, setStep] = useState<'details' | 'code'>('details')
  const [details, setDetails] = useState<ReviewFormData | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState<string | null>(null)
  const [devMode, setDevMode] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [startedTracked, setStartedTracked] = useState(false)
  // Honeypot: hidden from humans, bots auto-fill it. Sent as `_gotcha`; both
  // API routes answer a fake success and record nothing when it's non-empty.
  const honeypotRef = useRef<HTMLInputElement>(null)
  const codeInputRef = useRef<HTMLInputElement>(null)

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

  // Resend cooldown ticker.
  useEffect(() => {
    if (resendIn <= 0) return
    const id = setInterval(() => setResendIn((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [resendIn])

  useEffect(() => {
    if (step === 'code') codeInputRef.current?.focus()
  }, [step])

  const mobile = details ? (formatAuMobile(details.phone) ?? details.phone) : ''

  /** Step 1: text the code. */
  const sendCode = async (data: ReviewFormData, isResend = false) => {
    setIsSending(true)
    try {
      const result = await postJson('/api/verify/start', {
        phone: data.phone,
        _gotcha: honeypotRef.current?.value ?? '',
      })
      if (!result.ok) {
        const message = errorCopy(result.code)
        if (result.code === 'invalid_number' || result.code === 'not_sms_capable') {
          // Send them back to the field rather than a toast they may miss.
          setStep('details')
          form.setError('phone', { message })
        } else {
          toast.error(message)
        }
        return
      }
      setDevMode(Boolean(result.dev))
      setDetails(data)
      setCode('')
      setCodeError(null)
      setResendIn(RESEND_COOLDOWN_S)
      if (isResend) {
        toast.success(`New code sent to ${formatAuMobile(data.phone)}`)
      } else {
        setStep('code')
        trackLeadCodeSent(copy.formName)
      }
    } finally {
      setIsSending(false)
    }
  }

  /** Step 2: confirm the code; the server records the lead if it's right. */
  const verifyCode = async (value: string) => {
    if (!details || isVerifying) return
    setIsVerifying(true)
    setCodeError(null)
    try {
      const result = await postJson('/api/lead', {
        variant,
        name: details.name,
        phone: details.phone,
        suburb: details.suburb,
        code: value,
        // Carries utm_source / fbclid etc. into the lead record so each lead
        // can be traced back to the ad or campaign that produced it.
        attribution: attributionSummary(),
        _gotcha: honeypotRef.current?.value ?? '',
      })

      if (!result.ok) {
        const message = errorCopy(result.code)
        if (
          result.code === 'wrong_code' ||
          result.code === 'expired' ||
          result.code === 'too_many_attempts'
        ) {
          setCodeError(message)
          setCode('')
          codeInputRef.current?.focus()
        } else {
          toast.error(message)
        }
        return
      }

      // Fire the Meta `Lead` in place, only after the backend confirmed the
      // (verified) submission — no navigation to a thank-you page, because on
      // a 4G phone that second page load is where conversions used to go to
      // die. Matching data goes first so fbevents hashes it into the Lead.
      setAdvancedMatching({ name: details.name, phone: mobile })
      trackLead({
        formName: copy.formName,
        suburb: details.suburb,
        variant: copy.trackingVariant,
        // One UUID shared by the browser pixel event and the CAPI event so
        // Meta dedupes them into a single Lead; user details are hashed
        // server-side for CAPI matching.
        eventId: newEventId(),
        user: { name: details.name, phone: mobile },
      })
      setSubmitted(true)
      // Tells the sticky mobile CTA to retire — its job is done.
      window.dispatchEvent(new Event('tw-lead-submitted'))
    } finally {
      setIsVerifying(false)
    }
  }

  const onCodeChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 6)
    setCode(digits)
    if (codeError) setCodeError(null)
    // iOS pastes the code from the SMS suggestion bar in one go — don't make
    // them find the button as well.
    if (digits.length === 6) void verifyCode(digits)
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

  if (step === 'code' && details) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-primary">
          <MessageSquareText className="h-5 w-5" />
          <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
            Check your texts
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          We sent a 6-digit code to{' '}
          <span className="font-semibold text-gray-900">{mobile}</span>. Enter
          it below to finish.
        </p>
        {devMode && (
          <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Dev mode — no SMS was sent. The code is in the server log.
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (code.length === 6) void verifyCode(code)
          }}
          className="mt-4 space-y-3 sm:mt-6 sm:space-y-4"
          data-verify-step
        >
          <div>
            <label htmlFor="sms-code" className="sr-only">
              6-digit code
            </label>
            <Input
              id="sms-code"
              ref={codeInputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="••••••"
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              disabled={isVerifying}
              aria-invalid={codeError ? 'true' : undefined}
              aria-describedby={codeError ? 'sms-code-error' : undefined}
              className="h-14 text-center text-2xl font-semibold tracking-[0.5em]"
            />
            {codeError && (
              <p
                id="sms-code-error"
                role="alert"
                className="mt-2 text-sm font-medium text-destructive"
              >
                {codeError}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={code.length < 6 || isVerifying}
            className="h-14 w-full text-base font-semibold"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming…
              </>
            ) : (
              copy.confirmButton
            )}
          </Button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => void sendCode(details, true)}
              disabled={resendIn > 0 || isSending}
              className="min-h-11 font-medium text-primary disabled:text-gray-400"
            >
              {isSending
                ? 'Sending…'
                : resendIn > 0
                  ? `Resend code in ${resendIn}s`
                  : 'Resend code'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('details')
                setCode('')
                setCodeError(null)
              }}
              className="min-h-11 font-medium text-gray-600 hover:text-gray-900"
            >
              Wrong number?
            </button>
          </div>

          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            One text, only to confirm your number. No marketing messages.
          </p>
        </form>
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
          onSubmit={form.handleSubmit((data) => sendCode(data))}
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
                <FormLabel>Full name</FormLabel>
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
                <FormDescription className="text-xs">
                  We’ll text a 6-digit code to confirm this number.
                </FormDescription>
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
            disabled={isSending}
            className="h-14 w-full text-base font-semibold"
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending your code…
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
