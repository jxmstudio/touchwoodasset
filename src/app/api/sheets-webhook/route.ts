import { NextRequest, NextResponse } from 'next/server'
import { forwardToSheets } from '@/lib/sheets-server'

/**
 * Browser-facing proxy to the Google Sheets Apps Script webhook. Keeps the
 * webhook URL and shared secret server-side and avoids CORS. The forwarding
 * logic lives in src/lib/sheets-server.ts so /api/lead can share it.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const result = await forwardToSheets(body)
  return NextResponse.json(result.body, { status: result.status })
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
