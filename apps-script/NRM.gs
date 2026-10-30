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

function dealKeys(row) {
  const keys = [];
  if (row[4] !== "" && row[4] != null) keys.push("chassis:" + String(row[4]).trim().toUpperCase());
  if (row[1] !== "" && row[1] != null) keys.push("invoice:" + String(row[1]).trim().toUpperCase());
  return keys;
}

function updateDeal(match, deal) {
  if (!Array.isArray(deal) || deal.length !== COLUMN_COUNT) {
    throw new Error("A deal must have " + COLUMN_COUNT + " values");
  }
  const sh = getDataSheet();
  const last = sh.getLastRow();
  if (last < 2) return null;
  const data = sh.getRange(2, 1, last - 1, COLUMN_COUNT).getValues();
  const up = v => String(v == null ? "" : v).trim().toUpperCase();
  const find = (value, col) => value ? data.findIndex(r => up(r[col]) === up(value)) : -1;
  let i = find(match.chassis, 4);
  if (i < 0) i = find(match.invNo, 1);
  if (i < 0) i = find(match.bookingNo, 0);
  if (i < 0) return null;
  sh.getRange(i + 2, 1, 1, COLUMN_COUNT).setValues([deal]);
  return i + 2;
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

    if (body.action === "updateDeal") {
      const row = updateDeal(body.match || {}, body.deal);
      if (!row) return jsonOut({error: "That deal is no longer in the sheet. Refresh and try again."});
      return jsonOut({success: true, row: row});
    }

    const deals = (body.deals || []).filter(d => Array.isArray(d) && d.some(v => v !== "" && v !== null));
    if (deals.some(d => d.length !== COLUMN_COUNT)) {
      return jsonOut({error: "Each deal must have " + COLUMN_COUNT + " values"});
    }

    const sheet = getDataSheet();
    const seen = new Set();
    const lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      sheet.getRange(2, 1, lastRow - 1, COLUMN_COUNT).getValues().forEach(r => dealKeys(r).forEach(k => seen.add(k)));
    }
    const fresh = [];
    deals.forEach(d => {
      const keys = dealKeys(d);
      if (keys.some(k => seen.has(k))) return;
      keys.forEach(k => seen.add(k));
      fresh.push(d);
    });
    if (fresh.length) sheet.getRange(sheet.getLastRow() + 1, 1, fresh.length, COLUMN_COUNT).setValues(fresh);

    return jsonOut({success: true, saved: fresh.length, skipped: deals.length - fresh.length});
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
    const tz = Session.getScriptTimeZone();
    return jsonOut({rows: rows.map(r => r.map(v => v instanceof Date ? Utilities.formatDate(v, tz, "yyyy-MM-dd") : v))});
  } catch (error) {
    return jsonOut({error: error.toString()});
  }
}
