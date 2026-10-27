const SECRET_TOKEN = "nrm_tracker_sk_2024_aB7xK9mL3pQ8vW5zN2jD6fH4tR1cY";
const SPREADSHEET_ID = "1k7nSIIs-CPI0aeLKIoUp_bT52y7Df3B8cCAtY5gc6GI";
const SHEET_NAME = "Sheet1";
const COLUMN_COUNT = 20;

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getDataSheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
}

function doPost(e) {
  if (e.parameter.token !== SECRET_TOKEN) {
    return jsonOut({error: "Unauthorized"});
  }

  try {
    const body = JSON.parse(e.postData.contents);
    const deals = (body.deals || []).filter(d => Array.isArray(d) && d.some(v => v !== "" && v !== null));
    if (deals.some(d => d.length !== COLUMN_COUNT)) {
      return jsonOut({error: "Each deal must have " + COLUMN_COUNT + " values"});
    }

    const sheet = getDataSheet();
    deals.forEach(d => sheet.appendRow(d));

    return jsonOut({success: true, saved: deals.length});
  } catch (error) {
    return jsonOut({error: error.toString()});
  }
}

function doGet(e) {
  if (e.parameter.token !== SECRET_TOKEN) {
    return jsonOut({error: "Unauthorized"});
  }

  try {
    const sheet = getDataSheet();
    const lastRow = sheet.getLastRow();
    const rows = lastRow < 2 ? [] : sheet.getRange(2, 1, lastRow - 1, COLUMN_COUNT).getValues();
    return jsonOut({rows: rows});
  } catch (error) {
    return jsonOut({error: error.toString()});
  }
}
