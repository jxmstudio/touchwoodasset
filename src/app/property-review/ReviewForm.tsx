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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, ShieldCheck } from 'lucide-react'
import { submitToJxmForms } from '@/lib/jxm-forms'
import { attributionSummary, trackLeadStart } from '@/lib/tracking'

// Deliberately short: every extra field on a cold-traffic funnel costs leads.
const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  suburb: z.string().min(2, 'Please enter the property suburb'),
  portfolioSize: z.enum(['1', '2-3', '4-9', '10+']),
  currentSituation: z.enum([
    'AGENCY_MANAGED',
    'SELF_MANAGED',
    'VACANT',
    'BUYING_SOON',
  ]),
})

type ReviewFormData = z.infer<typeof schema>

const SITUATION_LABELS: Record<ReviewFormData['currentSituation'], string> = {
  AGENCY_MANAGED: 'Managed by another agency',
  SELF_MANAGED: 'I manage it myself',
  VACANT: 'Currently vacant',
  BUYING_SOON: 'Buying / settling soon',
}

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
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      suburb: '',
      portfolioSize: '1',
      currentSituation: 'AGENCY_MANAGED',
    },
  })

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true)
    try {
      const result = await submitToJxmForms({
        _form: 'property-review',
        name: data.name,
        email: data.email,
        phone: data.phone,
        suburb: data.suburb,
        portfolioSize: data.portfolioSize,
        currentSituation: SITUATION_LABELS[data.currentSituation],
        // Carries utm_source / fbclid etc. into the lead record so each lead
        // can be traced back to the ad or campaign that produced it.
        message: `Free property performance review requested via /property-review. Source: ${attributionSummary()}`,
        _gotcha: honeypotRef.current?.value ?? '',
      })

      if (!result.success) {
        throw new Error(result.error || 'Submission failed')
      }

      // The conversion event fires on the thank-you page, not here, so it only
      // counts submissions that genuinely completed.
      const params = new URLSearchParams({
        suburb: data.suburb,
        size: data.portfolioSize,
      })
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
        Get your free property review
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Takes 30 seconds. We&apos;ll call you for a 2-minute chat — no
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
                  <Input placeholder="Jane Smith" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder="jane@example.com"
                      autoComplete="email"
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="0413 889 388"
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="suburb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property suburb</FormLabel>
                <FormControl>
                  <Input placeholder="South Melbourne" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="portfolioSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Properties owned</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 property</SelectItem>
                      <SelectItem value="2-3">2–3 properties</SelectItem>
                      <SelectItem value="4-9">4–9 properties</SelectItem>
                      <SelectItem value="10+">10+ properties</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentSituation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Right now it&apos;s…</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(
                        Object.keys(SITUATION_LABELS) as Array<
                          keyof typeof SITUATION_LABELS
                        >
                      ).map((key) => (
                        <SelectItem key={key} value={key}>
                          {SITUATION_LABELS[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full text-base font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              'Get my free review'
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
