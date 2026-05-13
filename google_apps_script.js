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
  'task_id',
  'reviewer',
  'run_a_key',
  'run_b_key',
  'env_files_ok',
  'env_not_hindered',
  'env_notes',
  'total_criteria',
  'run_a_agree',
  'run_a_disagree',
  'run_a_unsure',
  'run_a_pending',
  'run_b_agree',
  'run_b_disagree',
  'run_b_unsure',
  'run_b_pending',
  'overall_agree_pct',
  'overall_disagree_pct',
  'other_notes',
  'overall_quality',
  'timestamp'
];

function pullFromFirebase() {
  var response = UrlFetchApp.fetch(FIREBASE_URL);
  var audits = JSON.parse(response.getContentText());
  if (!audits) { Logger.log('No audit data in Firebase.'); return; }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  var rows = [HEADERS];

  for (var taskKey in audits) {
    var state = audits[taskKey];
    if (!state) continue;

    var criteria = state.criteria || {};
    var critKeys = Object.keys(criteria);
    var total = critKeys.length;

    var runACounts = { agree: 0, disagree: 0, unsure: 0, pending: 0 };
    var runBCounts = { agree: 0, disagree: 0, unsure: 0, pending: 0 };

    for (var i = 0; i < critKeys.length; i++) {
      var crit = criteria[critKeys[i]];
      var aOp = (crit.runA && crit.runA.opinion) || '';
      var bOp = (crit.runB && crit.runB.opinion) || '';

      if (aOp === 'agree') runACounts.agree++;
      else if (aOp === 'disagree') runACounts.disagree++;
      else if (aOp === 'unsure') runACounts.unsure++;
      else runACounts.pending++;

      if (bOp === 'agree') runBCounts.agree++;
      else if (bOp === 'disagree') runBCounts.disagree++;
      else if (bOp === 'unsure') runBCounts.unsure++;
      else runBCounts.pending++;
    }

    var totalOpinions = (runACounts.agree + runACounts.disagree + runACounts.unsure +
                         runBCounts.agree + runBCounts.disagree + runBCounts.unsure);
    var totalAgree = runACounts.agree + runBCounts.agree;
    var totalDisagree = runACounts.disagree + runBCounts.disagree;
    var agreePct = totalOpinions > 0 ? Math.round(totalAgree / totalOpinions * 100) + '%' : '';
    var disagreePct = totalOpinions > 0 ? Math.round(totalDisagree / totalOpinions * 100) + '%' : '';

    var envFiles = state.envFilesOk === true ? 'YES' : state.envFilesOk === false ? 'NO' : '';
    var envHindered = state.envNotHindered === true ? 'YES' : state.envNotHindered === false ? 'NO' : '';

    rows.push([
      taskKey,
      state.reviewer || '',
      state.auditRunAKey || '',
      state.auditRunBKey || '',
      envFiles,
      envHindered,
      state.envNotes || '',
      total,
      runACounts.agree,
      runACounts.disagree,
      runACounts.unsure,
      runACounts.pending,
      runBCounts.agree,
      runBCounts.disagree,
      runBCounts.unsure,
      runBCounts.pending,
      agreePct,
      disagreePct,
      state.otherNotes || '',
      state.overallQuality || '',
      state.timestamp || ''
    ]);
  }

  sheet.clear();
  sheet.getRange(1, 1, rows.length, HEADERS.length).setValues(rows);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);

  Logger.log('Synced ' + (rows.length - 1) + ' tasks from Firebase.');
}
