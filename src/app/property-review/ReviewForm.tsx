'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { Loader2, ShieldCheck } from 'lucide-react'
import { submitToJxmForms } from '@/lib/jxm-forms'
import {
  attributionSummary,
  setAdvancedMatching,
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

export function ReviewForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startedTracked, setStartedTracked] = useState(false)
  // Honeypot: hidden from humans, bots auto-fill it. Its value is sent as
  // `_gotcha` and JXM Forms drops any submission where it's non-empty.
  const honeypotRef = useRef<HTMLInputElement>(null)

  // Fire once, when the visitor first touches the form. The ratio of starts to
  // completions is what tells you whether the form itself is the problem.
  const handleFirstInteraction = () => {
    if (startedTracked) return
    setStartedTracked(true)
    trackLeadStart('property_review')
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
    try {
      const result = await submitToJxmForms({
        _form: 'property-review',
        name: data.name,
        phone: mobile,
        suburb: data.suburb,
        // Carries utm_source / fbclid etc. into the lead record so each lead
        // can be traced back to the ad or campaign that produced it.
        message: `Free rental appraisal requested via /property-review. Source: ${attributionSummary()}`,
        _gotcha: honeypotRef.current?.value ?? '',
      })

      if (!result.success) {
        throw new Error(result.error || 'Submission failed')
      }

      // The Meta `Lead` event fires on the thank-you page, not here, so it
      // only counts submissions that genuinely completed. (Verify with Meta
      // Pixel Helper or Events Manager → Test Events.) Set the advanced
      // matching data now, while we still have it — the thank-you page
      // doesn't see the form values.
      setAdvancedMatching({ name: data.name, phone: mobile })
      const params = new URLSearchParams({ suburb: data.suburb })
      router.push(`/property-review/thank-you?${params.toString()}`)
    } catch (error) {
      console.error('Property review submission failed:', error)
      toast.error(
        'Sorry — that did not go through. Please try again, or call us on +61 413 889 388.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Get your free rental appraisal
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Takes 15 seconds. We&apos;ll call you back within one business day — no
        obligation to switch.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onFocusCapture={handleFirstInteraction}
          className="mt-6 space-y-4"
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
                    inputMode="tel"
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
              'Get my free appraisal'
            )}
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            Your details stay with Touchwood. No spam, no obligation.
          </p>
        </form>
      </Form>
    </div>
  )
}
