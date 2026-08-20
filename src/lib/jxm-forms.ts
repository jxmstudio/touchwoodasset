/**
 * JXM Forms — self-hosted form backend (contact, listing enquiry, booking,
 * application and /property-review funnel forms; the valuation and inspection
 * forms still post to /api/sheets-webhook).
 *
 * Pass `_form` to name the form — it shows in the dashboard and email subject.
 *
 * The endpoint and key are deliberately hardcoded client-side: JXM's design
 * treats the key as public (it only scopes submissions to this site's tenant),
 * and spam filtering happens on their side via the `_gotcha` honeypot.
 */

const JXM_ENDPOINT = 'https://jxm-forms.vercel.app/api/submit/touchwood'
const JXM_API_KEY = '5836O18ziLlYS52a6TTPfYKVD8M3gtgc'

export interface JxmSubmissionResult {
  success: boolean
  error?: string
}

/**
 * Submit a form payload to JXM Forms.
 *
 * Always include an `email` field — it becomes the Reply-To on the
 * notification email. Pass the (normally empty) honeypot value through as
 * `_gotcha` so bot-filled submissions get dropped server-side.
 */
export async function submitToJxmForms(
  data: Record<string, string | undefined>
): Promise<JxmSubmissionResult> {
  try {
    const response = await fetch(JXM_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': JXM_API_KEY,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return { success: false, error: `Form backend returned ${response.status}` }
    }

    const result = await response.json().catch(() => null)
    if (!result?.ok) {
      return { success: false, error: 'Form backend did not confirm the submission' }
    }

    return { success: true }
  } catch (error) {
    console.error('JXM Forms submission failed:', error)
    return { success: false, error: 'Network error occurred while submitting form' }
  }
}
