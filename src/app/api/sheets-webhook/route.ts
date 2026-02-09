import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get the webhook URL from environment variables
    const webhookUrl = process.env.SHEETS_WEBHOOK
    const sharedSecret = process.env.FORM_SHARED_SECRET
    
    if (!webhookUrl) {
      // Prevent file writes in production when webhook is not configured
      if (process.env.NODE_ENV === 'production') {
        console.error('SHEETS_WEBHOOK env var is not set in production')
        return NextResponse.json(
          { error: 'Server misconfiguration: Sheets webhook not set' },
          { status: 500 }
        )
      }
      console.log('Google Sheets webhook not configured. Saving to local file for development...')
      
      // In development, save to a local file instead
      const fs = require('fs')
      const path = require('path')
      
      try {
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }
        
        const filename = `form-submissions-${new Date().toISOString().split('T')[0]}.json`
        const filepath = path.join(dataDir, filename)
        
        let existingData = []
        if (fs.existsSync(filepath)) {
          existingData = JSON.parse(fs.readFileSync(filepath, 'utf8'))
        }
        
        existingData.push({
          timestamp: new Date().toISOString(),
          ...body
        })
        
        fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2))
        
        return NextResponse.json({
          success: true,
          message: 'Form saved locally (Google Sheets not configured)',
          note: 'Check /data/form-submissions-*.json files'
        })
      } catch (error) {
        console.error('Error saving to local file:', error)
        return NextResponse.json(
          { error: 'Google Sheets webhook not configured and local save failed' },
          { status: 500 }
        )
      }
    }
    
    // Add shared secret to the payload for verification (matching Apps Script format)
    const payload = {
      ...body,
      sharedSecret: sharedSecret
    }
    
    // Forward the request to Google Sheets webhook
    // IMPORTANT: redirect: 'follow' is required because Google Apps Script returns a 302 redirect
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })
    
    if (!response.ok) {
      console.error('Google Sheets webhook failed:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to submit to Google Sheets' },
        { status: response.status }
      )
    }
    
    const result = await response.json()
    
    return NextResponse.json(result, { status: 200 })
    
  } catch (error) {
    console.error('Error in sheets webhook proxy:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
