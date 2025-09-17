'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { Search, Loader2, Building2, MapPin, Calendar, Clock } from 'lucide-react'

const inspectionFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  propertyAddress: z.string().min(10, 'Please enter the full property address'),
  suburb: z.string().min(2, 'Please enter the suburb'),
  postcode: z.string().min(4, 'Please enter a valid postcode'),
  inspectionType: z.enum(['PRE_PURCHASE', 'PRE_SALE', 'MAINTENANCE', 'OTHER']),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.enum(['MORNING', 'AFTERNOON', 'EVENING', 'FLEXIBLE']),
  urgency: z.enum(['STANDARD', 'URGENT', 'VERY_URGENT']),
  additionalInfo: z.string().optional(),
})

type InspectionFormData = z.infer<typeof inspectionFormSchema>

export function InspectionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      propertyAddress: '',
      suburb: '',
      postcode: '',
      inspectionType: 'PRE_PURCHASE',
      preferredDate: '',
      preferredTime: 'MORNING',
      urgency: 'STANDARD',
      additionalInfo: '',
    },
  })

  const onSubmit = async (data: InspectionFormData) => {
    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: 'INSPECTION',
          message: `Inspection request for ${data.propertyAddress}, ${data.suburb} ${data.postcode}. Type: ${data.inspectionType}. Date: ${data.preferredDate}. Time: ${data.preferredTime}. Urgency: ${data.urgency}. Additional info: ${data.additionalInfo || 'None'}`,
          preferredDate: data.preferredDate,
        }),
      })

      if (response.ok) {
        toast.success('Thank you for your inspection request! We\'ll contact you within 24 hours to confirm the appointment.')
        form.reset()
      } else {
        throw new Error('Failed to submit inspection request')
      }
    } catch (error) {
      console.error('Error submitting inspection request:', error)
      toast.error('Sorry, there was an error submitting your inspection request. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-blue-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Urgency Level *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STANDARD">Standard (3-5 business days)</SelectItem>
                      <SelectItem value="URGENT">Urgent (1-2 business days)</SelectItem>
                      <SelectItem value="VERY_URGENT">Very Urgent (Same day if possible)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Property Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-blue-600" />
            Property Information
          </h3>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="propertyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the full property address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="suburb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suburb *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter suburb" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postcode *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter postcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="inspectionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspection Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inspection type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PRE_PURCHASE">Pre-Purchase Inspection</SelectItem>
                      <SelectItem value="PRE_SALE">Pre-Sale Inspection</SelectItem>
                      <SelectItem value="MAINTENANCE">Maintenance Inspection</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Scheduling Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-600" />
            Scheduling Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MORNING">Morning (9:00 AM - 12:00 PM)</SelectItem>
                      <SelectItem value="AFTERNOON">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                      <SelectItem value="EVENING">Evening (5:00 PM - 7:00 PM)</SelectItem>
                      <SelectItem value="FLEXIBLE">Flexible (Any time)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Search className="mr-2 h-5 w-5 text-blue-600" />
            Additional Information
          </h3>
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please provide any additional information about the property, specific areas of concern, or special requirements for the inspection..."
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Booking Inspection...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Book Inspection
            </>
          )}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          By submitting this form, you agree to our{' '}
          <a href="/legal/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          . We'll never share your information with third parties.
        </p>
      </form>
    </Form>
  )
}
