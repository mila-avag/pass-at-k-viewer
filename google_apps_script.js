/**
 * Google Apps Script — Firebase Audit → Google Sheet Sync
 *
 * SETUP:
 * 1. Open your Google Sheet (https://docs.google.com/spreadsheets/d/1n_JpffCCUkoaxlhJeZ24E0rQvBvwOs4PJcTxqrCpxwU)
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire file, replacing any existing code
 * 4. Click Run > pullFromFirebase (authorize when prompted)
 * 5. To auto-sync every 5 minutes: go to Triggers (clock icon on left)
 *    → Add Trigger → pullFromFirebase → Time-driven → Minutes timer → Every 5 minutes
 */

const FIREBASE_URL = 'https://passat-cb1ae-default-rtdb.firebaseio.com/audits.json';
const SHEET_NAME = 'Audit Results';

const HEADERS = [
  'task_id', 'reviewer', 'run_a_key', 'run_b_key',
  'env_files_ok', 'env_not_hindered', 'env_notes',
  'criterion_id', 'criterion_title', 'weight',
  'run_a_grader', 'run_a_opinion', 'run_a_notes',
  'run_b_grader', 'run_b_opinion', 'run_b_notes',
  'other_notes', 'overall_quality', 'timestamp'
];

function pullFromFirebase() {
  const response = UrlFetchApp.fetch(FIREBASE_URL);
  const audits = JSON.parse(response.getContentText());
  if (!audits) { Logger.log('No audit data in Firebase.'); return; }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const rows = [HEADERS];

  for (const [taskKey, state] of Object.entries(audits)) {
    if (!state || !state.criteria) continue;

    for (const [critId, critData] of Object.entries(state.criteria)) {
      const runA = critData.runA || {};
      const runB = critData.runB || {};
      rows.push([
        taskKey,
        state.reviewer || '',
        state.auditRunAKey || '',
        state.auditRunBKey || '',
        state.envFilesOk ? 'YES' : 'NO',
        state.envNotHindered ? 'YES' : 'NO',
        state.envNotes || '',
        critId,
        '', // criterion title not stored in Firebase state, can be joined from CSV
        '', // weight
        '', // run_a_grader (PASS/FAIL from the grader, not in audit state)
        runA.opinion || '',
        runA.notes || '',
        '', // run_b_grader
        runB.opinion || '',
        runB.notes || '',
        state.otherNotes || '',
        state.overallQuality || '',
        state.timestamp || ''
      ]);
    }
  }

  sheet.clear();
  sheet.getRange(1, 1, rows.length, HEADERS.length).setValues(rows);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);

  Logger.log('Synced ' + (rows.length - 1) + ' rows from Firebase.');
}
