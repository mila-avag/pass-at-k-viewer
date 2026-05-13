/**
 * Google Apps Script — Pass@k Audit Receiver
 *
 * SETUP:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire file, replacing any existing code
 * 4. Click Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL
 * 6. Paste it into the "Google Apps Script URL" field in the viewer sidebar
 *
 * The script creates/updates a sheet called "Audit Results" with one row
 * per criterion per task.
 */

const SHEET_NAME = "Audit Results";
const HEADERS = [
  "task_id", "criterion_id", "criterion_title", "weight",
  "grader_verdict", "grader_pass_count", "grader_fail_count",
  "reviewer_opinion", "reviewer_notes",
  "env_files_ok", "env_not_hindered", "env_notes",
  "other_notes", "overall_quality", "reviewer_name", "timestamp"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = JSON.parse(e.postData.contents);
    const rows = payload.rows || [];

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const data = sheet.getDataRange().getValues();
    const taskIdCol = 0;
    const criterionIdCol = 1;

    const existingIndex = {};
    for (let i = 1; i < data.length; i++) {
      const key = data[i][taskIdCol] + "::" + data[i][criterionIdCol];
      existingIndex[key] = i + 1;
    }

    for (const row of rows) {
      const values = HEADERS.map(h => row[h] !== undefined ? row[h] : "");
      const key = row.task_id + "::" + row.criterion_id;

      if (existingIndex[key]) {
        const rowNum = existingIndex[key];
        sheet.getRange(rowNum, 1, 1, values.length).setValues([values]);
      } else {
        sheet.appendRow(values);
        existingIndex[key] = sheet.getLastRow();
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", rowsProcessed: rows.length })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Audit receiver is running. Use POST to submit data." })
  ).setMimeType(ContentService.MimeType.JSON);
}
