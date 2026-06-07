'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2 } from 'lucide-react'

interface ListingEnquiryFormProps {
  listingId: string
  listingTitle: string
}

export function ListingEnquiryForm({ listingId, listingTitle }: ListingEnquiryFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Enquiry: ${listingTitle}`,
          message: form.message.length < 20 ? form.message + '                    ' : form.message,
          type: 'GENERAL',
          listingId,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Sent!</h3>
        <p className="text-gray-600 max-w-sm">
          Thanks for reaching out. We&apos;ll be in touch with you shortly regarding{' '}
          <span className="font-medium">{listingTitle}</span>.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', message: '' }) }}
        >
          Send Another Enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enq-name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-name"
            name="name"
            type="text"
            required
            minLength={2}
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>
        <div>
          <label htmlFor="enq-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            required
            minLength={10}
            value={form.phone}
            onChange={handleChange}
            placeholder="04XX XXX XXX"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="enq-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="enq-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        />
      </div>

      <div>
        <label htmlFor="enq-message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="enq-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="I'm interested in this property and would like to know more..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto px-10"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending…
          </>
        ) : (
          'Send Enquiry'
        )}
      </Button>

      <p className="text-xs text-gray-400">
        By submitting this form you agree to our privacy policy. We never share your details.
      </p>
    </form>
  )
}
