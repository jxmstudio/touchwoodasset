# Google Sheets Integration Setup

This project includes a Next.js proxy to handle Google Sheets webhook submissions while avoiding CORS issues and keeping secrets server-side.

## Environment Variables

Add these to your `.env.local` file:

```env
# Google Sheets Webhook Configuration
SHEETS_WEBHOOK=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
FORM_SHARED_SECRET=your-long-random-secret-string
```

## How It Works

1. **Client-side forms** submit data to `/api/sheets-webhook`
2. **Next.js proxy** forwards the request to your Google Apps Script webhook
3. **Google Sheets** receives the data and processes it
4. **Response** is sent back through the proxy to the client

## API Endpoints

### POST `/api/sheets-webhook`

Forwards form submissions to Google Sheets.

**Request Body:**
```json
{
  "type": "contact",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0412345678",
  "subject": "Property Inquiry",
  "message": "I'm interested in your services...",
  "enquiryType": "GENERAL"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

## Usage in Components

### Contact Form
```typescript
import { submitContactForm } from '@/lib/sheets-webhook'

const result = await submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '0412345678',
  subject: 'Property Inquiry',
  message: 'I\'m interested in your services...',
  enquiryType: 'GENERAL'
})
```

### Inspection Form
```typescript
import { submitInspectionForm } from '@/lib/sheets-webhook'

const result = await submitInspectionForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '0412345678',
  propertyAddress: '123 Main St, Melbourne',
  preferredDate: '2024-01-15',
  preferredTime: '10:00 AM',
  message: 'Additional details...'
})
```

### Valuation Form
```typescript
import { submitValuationForm } from '@/lib/sheets-webhook'

const result = await submitValuationForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '0412345678',
  propertyAddress: '123 Main St, Melbourne',
  propertyType: 'house',
  bedrooms: 3,
  bathrooms: 2,
  carSpaces: 2,
  message: 'Additional details...'
})
```

## Google Apps Script Setup

1. Create a new Google Apps Script project
2. Set up a web app with the following structure:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Verify shared secret
    if (data.sharedSecret !== 'your-long-random-secret-string') {
      return ContentService
        .createTextOutput(JSON.stringify({error: 'Unauthorized'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Process the form data
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = [
      data.timestamp,
      data.type,
      data.name,
      data.email,
      data.phone,
      data.subject || '',
      data.message || '',
      data.enquiryType || '',
      // Add other fields as needed
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Deploy as a web app with execute permissions for "Anyone"
4. Copy the web app URL to your `SHEETS_WEBHOOK` environment variable

## Benefits

- ✅ **No CORS issues** - Server-side proxy handles cross-origin requests
- ✅ **Secrets stay secure** - Webhook URL and shared secret are server-side only
- ✅ **Easy to use** - Simple utility functions for each form type
- ✅ **Type-safe** - TypeScript interfaces for all form data
- ✅ **Error handling** - Comprehensive error handling and user feedback
- ✅ **Flexible** - Easy to add new form types or modify existing ones

## Testing

Test the integration by submitting a form on your website. Check your Google Sheet to verify the data is being saved correctly.

For debugging, check the browser console and server logs for any error messages.
