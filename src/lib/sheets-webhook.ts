/**
 * Utility function to submit form data to Google Sheets via our Next.js proxy
 * This avoids CORS issues and keeps the webhook URL secret
 */

export interface FormSubmissionData {
  [key: string]: any
}

export interface SheetsWebhookResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Submit form data to Google Sheets via our proxy API
 * @param data - The form data to submit
 * @returns Promise with the response from Google Sheets
 */
export async function submitToSheets(data: FormSubmissionData): Promise<SheetsWebhookResponse> {
  try {
    const response = await fetch('/api/sheets-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error || 'Failed to submit form'
      }
    }

    const result = await response.json()
    return {
      success: true,
      message: result.message || 'Form submitted successfully'
    }

  } catch (error) {
    console.error('Error submitting to sheets:', error)
    return {
      success: false,
      error: 'Network error occurred while submitting form'
    }
  }
}

/**
 * Submit contact form data specifically
 * @param formData - Contact form data
 */
export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  enquiryType?: string
}) {
  return submitToSheets({
    type: 'contact',
    timestamp: new Date().toISOString(),
    ...formData
  })
}

/**
 * Submit inspection form data specifically
 * @param formData - Inspection form data
 */
export async function submitInspectionForm(formData: {
  name: string
  email: string
  phone: string
  propertyAddress: string
  preferredDate: string
  preferredTime: string
  message?: string
}) {
  return submitToSheets({
    type: 'inspection',
    timestamp: new Date().toISOString(),
    ...formData
  })
}

/**
 * Submit valuation form data specifically
 * @param formData - Valuation form data
 */
export async function submitValuationForm(formData: {
  name: string
  email: string
  phone: string
  propertyAddress: string
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  carSpaces?: number
  message?: string
}) {
  return submitToSheets({
    type: 'valuation',
    timestamp: new Date().toISOString(),
    ...formData
  })
}
