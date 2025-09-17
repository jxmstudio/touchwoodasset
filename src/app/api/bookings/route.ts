import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  appointmentType: z.string().min(1, 'Please select an appointment type'),
  preferredDateTime: z.string().transform((str) => new Date(str)),
  message: z.string().optional(),
  type: z.enum(['landlord', 'seller', 'buyer', 'tenant']),
  propertyId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate the request body
    const validatedData = bookingSchema.parse(body)
    
    // Create enquiry in database
    const enquiry = await prisma.enquiry.create({
      data: {
        type: 'GENERAL', // Map to existing enum or extend as needed
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: `
Appointment Type: ${validatedData.appointmentType}
Preferred Date/Time: ${validatedData.preferredDateTime.toLocaleString()}
User Type: ${validatedData.type}
${validatedData.propertyId ? `Property ID: ${validatedData.propertyId}` : ''}

${validatedData.message || ''}
        `.trim(),
        preferredDate: validatedData.preferredDateTime,
        listingId: validatedData.propertyId || null,
      },
    })

    // TODO: Send confirmation emails
    // TODO: Add to calendar system
    // TODO: Notify sales team

    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking request submitted successfully',
        enquiryId: enquiry.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid data provided',
          errors: error.issues 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit booking request' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Booking API endpoint' },
    { status: 200 }
  )
}
