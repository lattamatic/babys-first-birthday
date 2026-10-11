/**
 * Gift-claim backend for the birthday site. Paste this into the Apps Script
 * editor of a Google Sheet (Extensions > Apps Script) and deploy it as a web
 * app. Setup steps are in the project README.
 *
 * The sheet gets one row per chosen gift. Delete a row to release that gift.
 */

// Shared code printed on the invitation. Guests type it once. Leave "" for no code.
const PARTY_CODE = "";

const SHEET_NAME = "Claims";
const HEADERS = ["Chosen at", "Gift ID", "Gift", "Chosen by", "Undo key"];
const MAX_CLAIMS = 300;

/** Run once from the editor to authorize the script and create the sheet tab. */
function setup() {
  claimsSheet_();
}

function doGet() {
  return json_(listClaims_());
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad_request" });
  }

  // The lock makes two simultaneous clicks on one gift resolve one at a time.
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return json_({ ok: false, error: "busy" });
  }
  try {
    if (body.action === "claim") return json_(claim_(body));
    if (body.action === "release") return json_(release_(body));
    return json_({ ok: false, error: "bad_request" });
  } finally {
    lock.releaseLock();
  }
}

function claim_(body) {
  const id = String(body.id || "");
  const name = String(body.name || "").trim().slice(0, 60);
  const item = String(body.item || "").trim().slice(0, 120);

  if (!/^[a-z0-9-]{1,80}$/.test(id) || !name) return { ok: false, error: "bad_request" };
  if (PARTY_CODE && String(body.code || "").trim().toLowerCase() !== PARTY_CODE.toLowerCase()) {
    return { ok: false, error: "bad_code" };
  }

  const sheet = claimsSheet_();
  const rows = readRows_(sheet);
  if (rows.some((r) => r[1] === id)) return { ok: false, error: "taken" };
  if (rows.length >= MAX_CLAIMS) return { ok: false, error: "full" };

  const undoKey = Utilities.getUuid();
  const when = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  sheet.appendRow([when, id, item, name, undoKey]);
  return { ok: true, token: undoKey };
}

function release_(body) {
  const id = String(body.id || "");
  const token = String(body.token || "");
  const sheet = claimsSheet_();
  const rows = readRows_(sheet);
  const index = rows.findIndex((r) => r[1] === id && r[4] === token);
  if (!token || index === -1) return { ok: false, error: "not_found" };
  sheet.deleteRow(index + 2); // +1 for the header row, +1 because sheets are 1-indexed
  return { ok: true };
}

// Only gift IDs are public. Names and undo keys never leave the sheet.
function listClaims_() {
  const rows = readRows_(claimsSheet_());
  return { ok: true, claimed: rows.map((r) => r[1]), codeRequired: PARTY_CODE !== "" };
}

function readRows_(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  return sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
}

function claimsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Plain-text columns so a guest typing "=1+1" as their name can't become a formula.
    sheet.getRange("A:E").setNumberFormat("@");
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
