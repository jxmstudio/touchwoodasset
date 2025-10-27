'use client'

import React, { useState, useCallback } from 'react'
import DatePicker from 'react-datepicker'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import 'react-datepicker/dist/react-datepicker.css'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  appointmentType: z.string().min(1, 'Please select an appointment type'),
  preferredDate: z.date({
    required_error: 'Please select a preferred date',
  }),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  message: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingCalendarProps {
  type: 'landlord' | 'seller' | 'buyer' | 'tenant'
  propertyId?: string
  className?: string
  onSubmit?: (data: BookingFormData) => void
}

export function BookingCalendar({
  type,
  propertyId,
  className = '',
  onSubmit,
}: BookingCalendarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const selectedDate = watch('preferredDate')

  // Available time slots
  const timeSlots = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
  ]

  // Appointment types based on user type
  const getAppointmentTypes = () => {
    switch (type) {
      case 'landlord':
        return [
          'Property Management Consultation',
          'Rental Appraisal',
          'Property Inspection',
          'Maintenance Discussion',
          'Lease Renewal Meeting',
        ]
      case 'seller':
        return [
          'Property Valuation',
          'Sale Strategy Consultation',
          'Market Analysis Meeting',
          'Property Styling Consultation',
          'Pre-sale Inspection',
        ]
      case 'buyer':
        return [
          'Property Viewing',
          'Buyer Consultation',
          'Finance Pre-approval Meeting',
          'Property Research Session',
          'Settlement Support',
        ]
      case 'tenant':
        return [
          'Property Viewing',
          'Application Support',
          'Lease Discussion',
          'Property Condition Report',
          'Tenancy Information Session',
        ]
      default:
        return ['General Consultation']
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'landlord':
        return 'Book a Property Management Consultation'
      case 'seller':
        return 'Schedule Your Property Valuation'
      case 'buyer':
        return 'Book a Property Viewing'
      case 'tenant':
        return 'Schedule a Property Inspection'
      default:
        return 'Book an Appointment'
    }
  }

  const getDescription = () => {
    switch (type) {
      case 'landlord':
        return 'Get expert advice on maximizing your property investment returns with our comprehensive management services.'
      case 'seller':
        return 'Receive a professional property valuation and personalized selling strategy from our experienced team.'
      case 'buyer':
        return 'Schedule a viewing or consultation to find your perfect property with guidance from our expert agents.'
      case 'tenant':
        return 'Book an inspection or get support with your rental application process.'
      default:
        return 'Schedule a consultation with our property experts.'
    }
  }

  const onFormSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    try {
      // Format the data for submission
      const submissionData = {
        ...data,
        type,
        propertyId,
        preferredDateTime: new Date(
          data.preferredDate.getFullYear(),
          data.preferredDate.getMonth(),
          data.preferredDate.getDate(),
          parseInt(data.preferredTime.split(':')[0]) +
            (data.preferredTime.includes('PM') &&
            !data.preferredTime.startsWith('12')
              ? 12
              : 0),
          parseInt(data.preferredTime.split(':')[1].split(' ')[0])
        ),
      }

      if (onSubmit) {
        onSubmit(submissionData)
      } else {
        // Default API submission
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        })

        if (!response.ok) {
          throw new Error('Failed to submit booking')
        }
      }

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      console.error('Booking submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter out past dates and weekends
  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Only allow future dates and weekdays
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6
  }

  if (submitSuccess) {
    return (
      <motion.div
        className={`bg-white rounded-xl shadow-lg p-8 text-center ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for your booking request. We&apos;ll contact you within 24
          hours to confirm your appointment details.
        </p>
        <Button onClick={() => setSubmitSuccess(false)}>
          Book Another Appointment
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`${className} max-w-3xl mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white shadow-xl rounded-2xl border">
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {getTitle()}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {getDescription()}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-0">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    className="pl-10"
                    placeholder="Enter your full name"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    placeholder="Enter your email"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    placeholder="Enter your phone number"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="appointmentType">Appointment Type *</Label>
                <Select
                  onValueChange={(value) => setValue('appointmentType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAppointmentTypes().map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.appointmentType && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.appointmentType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Preferred Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => date && setValue('preferredDate', date)}
                    filterDate={isDateAvailable}
                    minDate={new Date()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholderText="Select a date"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.preferredDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Select
                    onValueChange={(value) => setValue('preferredTime', value)}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.preferredTime && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="message"
                  className="pl-10 min-h-[140px]"
                  placeholder="Any specific requirements or questions..."
                  {...register('message')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Book Appointment'}
            </Button>
          </form>

          {/* Contact Information */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Need immediate assistance?
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Call us:{' '}
                <a
                  href="tel:+61413889388"
                  className="text-primary hover:underline"
                >
                  +61 413 889 388
                </a>
              </p>
              <p className="text-sm font-medium">
                Email:{' '}
                <a
                  href="mailto:admin@touchwoodasset.com"
                  className="text-primary hover:underline"
                >
                  admin@touchwoodasset.com
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
