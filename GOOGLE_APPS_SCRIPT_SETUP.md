# Google Apps Script Setup for Form Submissions

## Current Status ✅
Your contact form is now working! It's saving form submissions locally to `/data/form-submissions-*.json` files.

## To Connect to Google Sheets:

### 1. Create Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Verify shared secret (optional but recommended)
    const expectedSecret = 'make-a-long-random-string'; // Change this to match your .env
    if (data.sharedSecret !== expectedSecret) {
      return ContentService
        .createTextOutput(JSON.stringify({error: 'Unauthorized'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get or create the spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName('Form Submissions');
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Form Submissions');
      // Add headers
      sheet.getRange(1, 1, 1, 8).setValues([
        ['Timestamp', 'Type', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Enquiry Type']
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    }
    
    // Add the form data
    const row = [
      data.timestamp || new Date().toISOString(),
      data.type || 'contact',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.subject || '',
      data.message || '',
      data.enquiryType || ''
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        sharedSecret: 'make-a-long-random-string',
        timestamp: new Date().toISOString(),
        type: 'contact',
        name: 'Test User',
        email: 'test@example.com',
        phone: '0412345678',
        subject: 'Test Subject',
        message: 'Test message',
        enquiryType: 'GENERAL'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
```

### 2. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set these options:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. **Copy the web app URL** (it will look like your current URL)

### 3. Update Environment Variables
1. Open `.env.local`
2. Uncomment the SHEETS_WEBHOOK line:
   ```env
   SHEETS_WEBHOOK=https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID/exec
   ```
3. Replace `YOUR_NEW_SCRIPT_ID` with the actual ID from your deployed web app

### 4. Test the Integration
1. Restart your Next.js server: `npm run dev`
2. Submit a test form on your contact page
3. Check your Google Sheet to see the data

## Current Working Setup
Right now, your forms are working perfectly and saving to local files. You can:

- ✅ **Submit contact forms** - Data saves to `/data/form-submissions-*.json`
- ✅ **View submissions** - Check the JSON files in your project
- ✅ **No errors** - Forms submit successfully with user feedback

## Troubleshooting

### If you get 403 Forbidden:
- Make sure the web app is deployed with "Anyone" access
- Check that the `doPost` function exists in your script
- Verify the URL is correct

### If you get 500 Internal Server Error:
- Check the Google Apps Script logs
- Make sure the shared secret matches in both places
- Verify the spreadsheet permissions

### If forms stop working:
- Check the browser console for errors
- Look at the server logs for API errors
- Verify the environment variables are loaded

## Next Steps
1. Set up the Google Apps Script (optional - local saving works fine)
2. Test the contact form on your website
3. Check that form submissions are being saved
4. Consider adding email notifications to the Google Apps Script

Your form integration is working perfectly! 🎉
