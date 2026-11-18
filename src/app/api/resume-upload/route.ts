import { NextRequest, NextResponse } from 'next/server'
import { JXM_API_KEY, JXM_ENDPOINT } from '@/lib/jxm-forms'
import { RESUME_MAX_BYTES, resumeContentType } from '@/lib/resume-upload'

/**
 * Gets a signed URL the browser can PUT a resume to.
 *
 * JXM Forms' uploads endpoint has no CORS because it is meant to be called
 * server to server, so the application form comes through here. Only the
 * file's name and size pass through: the browser sends the file itself straight
 * to storage, which keeps it clear of Vercel's 4.5 MB request limit.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const filename = typeof body?.filename === 'string' ? body.filename : ''
  const size = typeof body?.size === 'number' ? body.size : 0
  const contentType = resumeContentType(filename)

  if (!contentType || size <= 0 || size > RESUME_MAX_BYTES) {
    return NextResponse.json(
      { error: 'A resume must be a PDF, DOC or DOCX of up to 10 MB' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${JXM_ENDPOINT}/uploads`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': JXM_API_KEY,
      },
      body: JSON.stringify({
        files: [{ filename, content_type: contentType, size }],
      }),
      signal: AbortSignal.timeout(10_000),
    })

    const result = await response.json().catch(() => null)
    const upload = result?.uploads?.[0]
    if (!response.ok || !upload?.signed_url) {
      console.error(
        'JXM Forms did not return a resume upload URL:',
        response.status,
        result?.error
      )
      return NextResponse.json(
        { error: 'Could not prepare the upload' },
        { status: 502 }
      )
    }

    return NextResponse.json({ upload })
  } catch (error) {
    console.error('JXM Forms resume upload URL request failed:', error)
    return NextResponse.json(
      { error: 'Could not prepare the upload' },
      { status: 502 }
    )
  }
}
