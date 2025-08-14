/**
 * Google Apps Script for handling career page CV submissions
 *
 * Deploy:  Deploy > Manage deployments > Web app
 *   - Execute as: Me
 *   - Who has access: Anyone
 *   - Copy the "/exec" URL into your React code
 */

// ---- CONFIG: put your IDs here ----
const DRIVE_FOLDER_ID = "1S7aB_KmFOu6cS0p7Rn_TfHs_-b4GyeMr"; // e.g. 1AbC... (from the folder URL)
const SHEET_ID = "14DoLjSXhtY9h5Vhz8VvUauhcScoNCIFuyWC6FEd4jdE";               // e.g. 1AbC... (from the sheet URL)

// Optional health check
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // We send "text/plain" from the client with JSON content
    const data = JSON.parse(e.postData.contents);

    // Validate minimal fields (optional)
    if (!data.cvFileData || !data.cvFileName) {
      throw new Error("Missing file data or file name.");
    }

    // Prepare blob from base64 data URL
    const fileName = String(data.cvFileName);
    const mimeType = getMimeType(fileName);
    const base64Data = String(data.cvFileData).split(",")[1]; // strip "data:...;base64,"
    const bytes = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(bytes, mimeType, fileName);

    // Save CV into Drive folder
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const file = folder.createFile(blob);
    const fileUrl = file.getUrl();

    // Append row into the first sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      // Create headers once (row 1)
      sheet.getRange(1, 1, 1, 10).setValues([[
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Position",
        "linkedInURL",
        "GitHub URL",
        "personIntroduction",
        "CV File Name",
        "CV Drive URL"
      ]]);
    }

    sheet.appendRow([
      new Date(data.timestamp || new Date()),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.position || "",
      data.linkedInURL || "",
      data.gitHubURL || "",
      data.personIntroduction || "",
      fileName,
      fileUrl
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "OK", fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("Error processing application:", err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getMimeType(fileName) {
  const ext = String(fileName).split(".").pop().toLowerCase();
  const map = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return map[ext] || "application/octet-stream";
}
