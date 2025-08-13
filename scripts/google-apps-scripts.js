/**
 * Google Apps Script for handling career page CV submissions
 *
 * This script receives form data, saves CV files to Google Drive,
 * and logs application data to Google Sheets.
 *
 * Deploy as Web App with:
 * - Execute as: Me
 * - Access: Anyone
 *
 * Note: The declarations below are mock objects for linting purposes only.
 * In the actual Google Apps Script environment, these are built-in services
 * that will override these declarations.
 */

// Mock declarations for linting (overridden by Google Apps Script built-ins)
const DriveApp = {}
const SpreadsheetApp = {}
const ContentService = {}
const Utilities = {}

// Configuration - Replace these with your actual IDs

const DRIVE_FOLDER_ID = "1S7aB_KmFOu6cS0p7Rn_TfHs_-b4GyeMr" // Create a folder in Drive and copy its ID
const SHEET_ID = "14DoLjSXhtY9h5Vhz8VvUauhcScoNCIFuyWC6FEd4jdE" // Create a sheet and copy its ID


/**
 * Handles CORS preflight requests and GET requests
 * @param {Object} e - The event object
 * @returns {ContentService.TextOutput} Response with CORS headers
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "ready" }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    })
}

/**
 * Handles POST requests from the career page form
 * @param {Object} e - The event object containing POST data
 * @returns {ContentService.TextOutput} JSON response
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)

    // Extract file data
    const fileData = data.cvFileData
    const fileName = data.cvFileName
    const mimeType = getMimeType(fileName)

    // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
    const base64Data = fileData.split(",")[1]

    // Create blob from base64 data
    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName)

    // Save file to Drive folder
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
    const file = folder.createFile(blob)
    const fileUrl = file.getUrl()

    // Open the Google Sheet and append data
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()

    // Ensure headers exist (run this once manually or check if row 1 is empty)
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 7)
        .setValues([["Timestamp", "Name", "Email", "Phone", "Position", "CV File Name", "CV Drive URL"]])
    }

    // Append the application data
    sheet.appendRow([new Date(data.timestamp), data.name, data.email, data.phone, data.position, fileName, fileUrl])

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Application submitted successfully",
        fileUrl: fileUrl,
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      })
  } catch (error) {
    // Log error for debugging
    console.error("Error processing application:", error)

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error processing application: " + error.toString(),
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      })
  }
}

/**
 * Determines MIME type based on file extension
 * @param {string} fileName - The name of the file
 * @returns {string} The MIME type
 */
function getMimeType(fileName) {
  const extension = fileName.split(".").pop().toLowerCase()
  const mimeTypes = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  }
  return mimeTypes[extension] || "application/octet-stream"
}

/**
 * Test function for debugging (optional)
 * Run this function manually to test the script
 */
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "+1234567890",
        position: "Software Developer",
        coverLetter: "This is a test application",
        cvFileName: "test-cv.pdf",
        cvFileData:
          "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSA4IFRmCjEwMCA3MDAgVGQKKFRlc3QgQ1YpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAzMjQgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MTYKJSVFT0Y=",
        timestamp: new Date().toISOString(),
      }),
    },
  }

  console.log(doPost(testData))
}

