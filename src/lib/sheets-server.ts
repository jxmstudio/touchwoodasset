/**
 * Server-side forwarder to the Google Sheets Apps Script webhook.
 *
 * Shared by /api/sheets-webhook (the browser-facing proxy the contact,
 * valuation and inspection forms still use) and /api/lead (which records
 * verified funnel leads server-side). Falls back to a local JSON file when
 * SHEETS_WEBHOOK is unset outside production.
 */

export interface SheetsForwardResult {
  success: boolean
  /** HTTP status the proxy should answer with. */
  status: number
  /** Body to relay — the Apps Script response on success, an error otherwise. */
  body: Record<string, unknown>
}

export async function forwardToSheets(
  payload: Record<string, unknown>
): Promise<SheetsForwardResult> {
  const webhookUrl = process.env.SHEETS_WEBHOOK
  const sharedSecret = process.env.FORM_SHARED_SECRET

  if (!webhookUrl) {
    if (process.env.NODE_ENV === 'production') {
      console.error('SHEETS_WEBHOOK env var is not set in production')
      return {
        success: false,
        status: 500,
        body: { error: 'Server misconfiguration: Sheets webhook not set' },
      }
    }
    return saveLocally(payload)
  }

  try {
    // redirect: 'follow' is required — Apps Script answers with a 302.
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, sharedSecret }),
      redirect: 'follow',
    })

    if (!response.ok) {
      console.error(
        'Google Sheets webhook failed:',
        response.status,
        response.statusText
      )
      return {
        success: false,
        status: response.status,
        body: { error: 'Failed to submit to Google Sheets' },
      }
    }

    // Apps Script answers 200 for everything, including a rejected shared
    // secret and its own exceptions, and serves an HTML error page when the
    // deployment is stale. Parse the body before trusting the status, or a
    // lost lead looks exactly like a saved one.
    const raw = await response.text()
    let result: Record<string, unknown>
    try {
      result = JSON.parse(raw)
    } catch {
      console.error('Google Sheets webhook returned non-JSON:', raw.slice(0, 500))
      return {
        success: false,
        status: 502,
        body: { error: 'Sheets webhook returned an unexpected response' },
      }
    }

    if (result?.error || result?.success === false) {
      console.error('Google Sheets webhook rejected submission:', result)
      return {
        success: false,
        status: 502,
        body: {
          error:
            (typeof result?.error === 'string' && result.error) ||
            'Sheets webhook rejected the submission',
        },
      }
    }

    return { success: true, status: 200, body: result }
  } catch (error) {
    console.error('Error forwarding to sheets webhook:', error)
    return {
      success: false,
      status: 500,
      body: { error: 'Internal server error' },
    }
  }
}

/** Development only: append to /data/form-submissions-<date>.json. */
async function saveLocally(
  payload: Record<string, unknown>
): Promise<SheetsForwardResult> {
  console.log(
    'Google Sheets webhook not configured. Saving to local file for development...'
  )
  try {
    const fs = await import('fs')
    const path = await import('path')
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

    const filename = `form-submissions-${new Date().toISOString().split('T')[0]}.json`
    const filepath = path.join(dataDir, filename)

    let existing: unknown[] = []
    if (fs.existsSync(filepath)) {
      existing = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    }
    existing.push({ timestamp: new Date().toISOString(), ...payload })
    fs.writeFileSync(filepath, JSON.stringify(existing, null, 2))

    return {
      success: true,
      status: 200,
      body: {
        success: true,
        message: 'Form saved locally (Google Sheets not configured)',
        note: 'Check /data/form-submissions-*.json files',
      },
    }
  } catch (error) {
    console.error('Error saving to local file:', error)
    return {
      success: false,
      status: 500,
      body: {
        error: 'Google Sheets webhook not configured and local save failed',
      },
    }
  }
}
