'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { CheckCircle, Loader2, Mail, Send } from 'lucide-react'
import {
  EITHER_ROLE,
  jobOpenings,
  LICENCE_NAME,
  resumeMailto,
  roleLabel,
} from '@/data/careers'
import { submitToJxmForms } from '@/lib/jxm-forms'
import { CONTACT } from '@/lib/site'

const jobApplicationSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number'),
  role: z.string().min(1, 'Please select a role'),
  experience: z
    .string()
    .trim()
    .min(20, 'Please tell us a little about your experience'),
  resumeLink: z
    .string()
    .trim()
    .max(300, 'Please keep this under 300 characters'),
  licence: z.boolean().refine((held) => held, {
    message: `A current ${LICENCE_NAME} is required for these roles`,
  }),
})

type JobApplicationData = z.infer<typeof jobApplicationSchema>

interface JobApplicationFormProps {
  role: string
  onRoleChange: (role: string) => void
}

export function JobApplicationForm({
  role,
  onRoleChange,
}: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRole, setSubmittedRole] = useState<string | null>(null)
  // Honeypot: hidden from humans, bots auto-fill it. Its value is sent as
  // `_gotcha` and JXM Forms drops any submission where it's non-empty.
  const honeypotRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const form = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
      experience: '',
      resumeLink: '',
      licence: false,
    },
  })

  // The role cards' Apply buttons preselect the role.
  useEffect(() => {
    if (role) form.setValue('role', role, { shouldValidate: true })
  }, [role, form])

  // The confirmation is much shorter than the form it replaces, so without this
  // the applicant is left looking at the footer.
  useEffect(() => {
    if (submittedRole) successRef.current?.scrollIntoView({ block: 'center' })
  }, [submittedRole])

  const onSubmit = async (data: JobApplicationData) => {
    setIsSubmitting(true)

    try {
      // No trackLead or setAdvancedMatching here, unlike the enquiry forms: a
      // job applicant is not a property lead, and a Lead event would teach the
      // Meta campaigns to find job seekers.
      const result = await submitToJxmForms({
        _form: 'job application',
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: roleLabel(data.role),
        licence: `Confirmed by applicant: holds a current ${LICENCE_NAME}`,
        experience: data.experience,
        resumeLink: data.resumeLink || undefined,
        _gotcha: honeypotRef.current?.value ?? '',
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to send application')
      }

      setSubmittedRole(roleLabel(data.role))
    } catch (error) {
      console.error('Error sending job application:', error)
      toast.error(
        `Sorry, there was an error sending your application. Please try again or email your resume to ${CONTACT.email}.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submittedRole) {
    return (
      <div
        ref={successRef}
        role="status"
        className="scroll-mt-20 rounded-xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          Application received
        </h3>
        <p className="mb-6 text-gray-600">
          Thanks for applying. The Touchwood team will review your details and
          contact you about next steps. If you have a resume ready, please email
          it through so we have it with your application.
        </p>
        <Button asChild variant="outline">
          <a href={resumeMailto(submittedRole)}>
            <Mail className="mr-2 h-4 w-4" />
            Email your resume
          </a>
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      {/* method="post" only matters if JS hasn't loaded: the browser's default
          GET would put the applicant's details in the URL, and from there in
          server logs and analytics. handleSubmit prevents it once hydrated. */}
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
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
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
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
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role *</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value)
                  onRoleChange(value)
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full bg-gray-100 hover:bg-gray-200">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobOpenings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                  {jobOpenings.length > 1 && (
                    <SelectItem value={EITHER_ROLE}>
                      {roleLabel(EITHER_ROLE)}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Your Experience *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your current or most recent role, years in property, and why you'd like to join Touchwood..."
                  className="min-h-[140px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resumeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn or Resume Link (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="LinkedIn profile, or a Google Drive or Dropbox link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="licence"
          render={({ field }) => (
            <FormItem className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                    className="mt-0.5 bg-white"
                  />
                </FormControl>
                <FormLabel className="leading-snug">
                  I hold a current {LICENCE_NAME} *
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Application...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          We&apos;ll use these details to assess your application. See our{' '}
          <a href="/legal/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </Form>
  )
}
