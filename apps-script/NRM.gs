const SECRET_TOKEN = "nrm_tracker_sk_2024_aB7xK9mL3pQ8vW5zN2jD6fH4tR1cY";
const SPREADSHEET_ID = "1k7nSIIs-CPI0aeLKIoUp_bT52y7Df3B8cCAtY5gc6GI";
const SHEET_NAME = "Sheet1";
const MAPPINGS_SHEET = "Mappings";
const LOG_SHEET = "Mapping Log";
const COLUMN_COUNT = 20;

const NAME_CORRECTIONS = [
  ["KANNDRA", "KANENDRA"],
  ["KARNAIL", "KARNAIL SINGH"],
  ["RITESH", "RITESH PANDEY"]
];

const EXECUTIVE_TO_TL = [
  ["NAVNEET", "HEMANT"],
  ["NIKHIL KUMAR GUPTA", "HEMANT"],
  ["LOKESH", "HEMANT"],
  ["RAHUL CHAUHAN", "HEMANT"],
  ["CHETAN", "HEMANT"],
  ["TUSHAR LAMBA", "HEMANT"],
  ["PRIYANSHU", "HEMANT"],
  ["KANENDRA", "RADHIKA"],
  ["KARNAIL SINGH", "RADHIKA"],
  ["GAURAV", "RADHIKA"],
  ["SUMIT", "RADHIKA"],
  ["JYOTI TOMAR", "SUBODH"],
  ["SAURABH GULIA", "NAVEEN"],
  ["RITESH PANDEY", "NAVEEN"],
  ["ANUJ GULIA", "RAJESH"],
  ["SHIVANI", "RAJESH"],
  ["MANISH KUMAR", "RAJESH"],
  ["RISHABH SHARMA", "RAJESH"],
  ["SUMIT YADAV", "RAJESH"],
  ["NITIN", "HARSHIT TIWARI"],
  ["AKASH", "SANDEEP THAKRAN"]
];

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getDataSheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
}

function getOrCreateSheet(name, header) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

function readMappings() {
  const sh = getOrCreateSheet(MAPPINGS_SHEET, ["Type", "Wrong", "Right"]);
  const lastRow = sh.getLastRow();
  return lastRow < 2 ? [] : sh.getRange(2, 1, lastRow - 1, 3).getValues();
}

function writeMappings(rows) {
  const sh = getOrCreateSheet(MAPPINGS_SHEET, ["Type", "Wrong", "Right"]);
  sh.clear();
  sh.getRange(1, 1, 1, 3).setValues([["Type", "Wrong", "Right"]]).setFontWeight("bold");
  sh.setFrozenRows(1);
  if (rows.length) sh.getRange(2, 1, rows.length, 3).setValues(rows);
}

function logMappingChanges(by, oldRows, newRows) {
  const key = r => r[0] + "|" + r[1];
  const oldMap = {};
  oldRows.forEach(r => { oldMap[key(r)] = r[2]; });
  const newMap = {};
  newRows.forEach(r => { newMap[key(r)] = r[2]; });

  const now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  const log = [];
  newRows.forEach(r => {
    const k = key(r);
    if (!(k in oldMap)) log.push([now, by, "Added", r[0], r[1], r[2], ""]);
    else if (oldMap[k] !== r[2]) log.push([now, by, "Changed", r[0], r[1], r[2], oldMap[k]]);
  });
  oldRows.forEach(r => {
    if (!(key(r) in newMap)) log.push([now, by, "Deleted", r[0], r[1], "", r[2]]);
  });

  if (log.length) {
    const sh = getOrCreateSheet(LOG_SHEET, ["Timestamp", "By", "Action", "Type", "Wrong", "Right", "Previous Right"]);
    sh.getRange(sh.getLastRow() + 1, 1, log.length, 7).setValues(log);
  }
}

function setupMappings() {
  writeMappings(
    NAME_CORRECTIONS.map(r => ["Name correction", r[0], r[1]])
      .concat(EXECUTIVE_TO_TL.map(r => ["Executive to TL", r[0], r[1]]))
  );
}

function doPost(e) {
  if (e.parameter.token !== SECRET_TOKEN) {
    return jsonOut({error: "Unauthorized"});
  }

  try {
    const body = JSON.parse(e.postData.contents);

    if (body.action === "saveMappings") {
      const newRows = (body.rows || []).filter(r => r[1] && r[2]);
      const oldRows = readMappings();
      logMappingChanges(body.by || "Unknown", oldRows, newRows);
      writeMappings(newRows);
      return jsonOut({success: true, saved: newRows.length});
    }

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
    if (e.parameter.action === "mappings") {
      return jsonOut({rows: readMappings()});
    }

    const sheet = getDataSheet();
    const lastRow = sheet.getLastRow();
    const rows = lastRow < 2 ? [] : sheet.getRange(2, 1, lastRow - 1, COLUMN_COUNT).getValues();
    return jsonOut({rows: rows});
  } catch (error) {
    return jsonOut({error: error.toString()});
  }
}
