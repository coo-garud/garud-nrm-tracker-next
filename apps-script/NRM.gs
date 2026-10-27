const SECRET_TOKEN = "nrm_tracker_sk_2024_aB7xK9mL3pQ8vW5zN2jD6fH4tR1cY";
const SPREADSHEET_ID = "1k7nSIIs-CPI0aeLKIoUp_bT52y7Df3B8cCAtY5gc6GI";
const SHEET_NAME = "Sheet1";
const LOG_SHEET = "Mapping Log";
const COLUMN_COUNT = 20;

const NAME_TAB = { tab: "Name Corrections", type: "Name correction", left: "Wrong", right: "Right" };
const TL_TAB = { tab: "Executive TL", type: "Executive to TL", left: "Executive", right: "Team Leader" };
const MAPPING_TABS = [NAME_TAB, TL_TAB];

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

function readTab(cfg) {
  const sh = getOrCreateSheet(cfg.tab, [cfg.left, cfg.right]);
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return [];
  return sh.getRange(2, 1, lastRow - 1, 2).getValues()
    .filter(r => r[0] && r[1])
    .map(r => [cfg.type, String(r[0]), String(r[1])]);
}

function writeTab(cfg, rows) {
  const sh = getOrCreateSheet(cfg.tab, [cfg.left, cfg.right]);
  sh.clear();
  sh.getRange(1, 1, 1, 2).setValues([[cfg.left, cfg.right]]).setFontWeight("bold");
  sh.setFrozenRows(1);
  if (rows.length) sh.getRange(2, 1, rows.length, 2).setValues(rows.map(r => [r[1], r[2]]));
}

function readMappings() {
  return MAPPING_TABS.reduce((all, cfg) => all.concat(readTab(cfg)), []);
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
  writeTab(NAME_TAB, NAME_CORRECTIONS.map(r => [NAME_TAB.type, r[0], r[1]]));
  writeTab(TL_TAB, EXECUTIVE_TO_TL.map(r => [TL_TAB.type, r[0], r[1]]));
}

function doPost(e) {
  if (e.parameter.token !== SECRET_TOKEN) {
    return jsonOut({error: "Unauthorized"});
  }

  try {
    const body = JSON.parse(e.postData.contents);

    if (body.action === "saveMappings") {
      const incoming = (body.rows || []).filter(r => r[1] && r[2]);
      const by = body.by || "Unknown";
      MAPPING_TABS.forEach(cfg => {
        const newRows = incoming.filter(r => r[0] === cfg.type);
        logMappingChanges(by, readTab(cfg), newRows);
        writeTab(cfg, newRows);
      });
      return jsonOut({success: true, saved: incoming.length});
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
