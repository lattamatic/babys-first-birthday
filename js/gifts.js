// Renders the filterable gift list (gifts.html) from CONTENT (see content.js),
// and handles the live "I've chosen this" buttons when a claims endpoint is set.

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const state = {
  category: "All",
  priceBand: "All",
  hideClaimed: false,
};

// Price bands are derived from the free-text `price` field (e.g. "~20-35€",
// "€41", "varies") rather than a separate field — so adding a new gift to
// content.js never requires maintaining a band by hand.
const PRICE_BANDS = [
  { label: "Under €12", max: 12 },
  { label: "€12–19", max: 20 },
  { label: "€20–39", max: 40 },
  { label: "€40–79", max: 80 },
  { label: "€80–149", max: 150 },
  { label: "€150+", max: Infinity },
];

function getPriceBand(priceStr) {
  const numbers = (priceStr.match(/\d+(\.\d+)?/g) || []).map(Number);
  if (numbers.length === 0) return "Varies";
  const value = numbers.length === 1 ? numbers[0] : (numbers[0] + numbers[1]) / 2;
  const band = PRICE_BANDS.find((b) => value < b.max);
  return band.label;
}

// Appends your Amazon Associates tag to amazon.* links, if one is set in
// content.js. Every other retailer link is returned unchanged.
function withAffiliateTag(url) {
  const tag = CONTENT.gifts.affiliate && CONTENT.gifts.affiliate.amazonAssociateTag;
  if (!tag) return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("amazon.")) {
      parsed.searchParams.set("tag", tag);
      return parsed.toString();
    }
  } catch (e) {
    // Not a valid absolute URL — return as-is.
  }
  return url;
}

// ---------- Live claims (Google Sheet backend, see apps-script/Code.gs) ----------

const ENDPOINT = (CONTENT.gifts.claims && CONTENT.gifts.claims.endpoint) || "";
const STORAGE_KEY = "giftClaims.v1";

const claims = {
  taken: new Set(), // gift ids the server says are taken
  loaded: false,
  codeRequired: false,
};

// What this browser remembers: its own undo keys, the guest's name, and the party code.
function readStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") return { tokens: {}, name: "", code: "", ...saved };
  } catch (e) {
    // Storage blocked or corrupt — start fresh.
  }
  return { tokens: {}, name: "", code: "" };
}

let store = readStore();

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    // Private mode etc. — choosing still works, only "undo from this phone" is lost on reload.
  }
}

function isTaken(item) {
  return Boolean(item.claimed) || claims.taken.has(item.id);
}

function isMine(item) {
  if (!store.tokens[item.id]) return false;
  return claims.loaded ? claims.taken.has(item.id) : true;
}

// A plain text/JSON body with no custom headers keeps these "simple" requests,
// which Apps Script answers; a JSON content-type would trigger a preflight it can't handle.
async function apiList() {
  const response = await fetch(`${ENDPOINT}?action=list&t=${Date.now()}`);
  return response.json();
}

async function apiPost(payload) {
  const response = await fetch(ENDPOINT, { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

async function refreshClaims() {
  if (!ENDPOINT) return;
  try {
    const result = await apiList();
    if (!result.ok) throw new Error("bad response");
    claims.taken = new Set(result.claimed);
    claims.codeRequired = Boolean(result.codeRequired);
    claims.loaded = true;
    // Forget undo keys for gifts that were released from the sheet.
    Object.keys(store.tokens).forEach((id) => {
      if (!claims.taken.has(id)) delete store.tokens[id];
    });
    saveStore();
  } catch (e) {
    if (!claims.loaded) showStatus("We couldn't check which gifts are taken just now, so the list below may be a little out of date.");
  }
  renderGrid();
}

function showStatus(message) {
  const status = document.getElementById("gift-status");
  status.textContent = message;
  status.hidden = !message;
  if (message) status.focus({ preventScroll: true });
}

// ---------- Choosing a gift ----------

const dialog = document.getElementById("claim-dialog");
const form = document.getElementById("claim-form");
const nameInput = document.getElementById("claim-name");
const codeInput = document.getElementById("claim-code");
const codeField = document.getElementById("claim-code-field");
const errorBox = document.getElementById("claim-error");
const confirmButton = document.getElementById("claim-confirm");
let dialogItem = null;

function showDialogError(message) {
  errorBox.textContent = message;
  errorBox.hidden = !message;
}

function openClaimDialog(item) {
  dialogItem = item;
  document.getElementById("claim-item").textContent = item.name;
  nameInput.value = store.name;
  codeInput.value = "";
  codeField.hidden = !(claims.codeRequired && !store.code);
  showDialogError("");
  confirmButton.disabled = false;
  dialog.showModal();
  (nameInput.value ? confirmButton : nameInput).focus();
}

function closeClaimDialog() {
  dialog.close();
  dialogItem = null;
}

document.getElementById("claim-cancel").addEventListener("click", closeClaimDialog);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!dialogItem) return;

  const name = nameInput.value.trim();
  if (!name) {
    showDialogError("Please add your name so we know who to thank.");
    nameInput.focus();
    return;
  }

  const item = dialogItem;
  const code = store.code || codeInput.value.trim();
  if (claims.codeRequired && !code) {
    showDialogError("Please enter the party code from your invitation.");
    codeInput.focus();
    return;
  }

  confirmButton.disabled = true;
  showDialogError("");
  try {
    const result = await apiPost({ action: "claim", id: item.id, item: item.name, name, code });
    if (result.ok) {
      store.tokens[item.id] = result.token;
      store.name = name;
      if (claims.codeRequired) store.code = code;
      saveStore();
      claims.taken.add(item.id);
      closeClaimDialog();
      renderGrid();
      showStatus(`Thank you, ${name}! "${item.name}" is marked as taken. You can undo it here at any time.`);
    } else if (result.error === "taken") {
      claims.taken.add(item.id);
      closeClaimDialog();
      renderGrid();
      showStatus(`Sorry, someone just chose "${item.name}". Have a look at the others.`);
    } else if (result.error === "bad_code") {
      store.code = "";
      saveStore();
      codeField.hidden = false;
      codeInput.value = "";
      showDialogError("That party code doesn't look right. Please check your invitation.");
      codeInput.focus();
      confirmButton.disabled = false;
    } else {
      showDialogError("Something went wrong on our side. Please try again in a moment.");
      confirmButton.disabled = false;
    }
  } catch (e) {
    showDialogError("We couldn't reach the server. Please check your connection and try again.");
    confirmButton.disabled = false;
  }
});

async function undoChoice(item) {
  if (!window.confirm(`Release "${item.name}" so someone else can choose it?`)) return;
  try {
    const result = await apiPost({ action: "release", id: item.id, token: store.tokens[item.id] });
    // "not_found" means it's already released, which is the outcome we wanted.
    if (!result.ok && result.error !== "not_found") throw new Error(result.error);
    claims.taken.delete(item.id);
    delete store.tokens[item.id];
    saveStore();
    renderGrid();
    showStatus(`"${item.name}" is available again.`);
  } catch (e) {
    showStatus("We couldn't release that one just now. Please try again in a moment.");
  }
}

// ---------- Page ----------

function renderStaticText() {
  document.getElementById("chapter-label").textContent = CONTENT.chapter.label;
  document.getElementById("gifts-intro").textContent = CONTENT.gifts.intro;
  document.getElementById("gifts-ideas-note").textContent = CONTENT.gifts.fallbackNote;
  document.getElementById("footer-chapter").textContent = CONTENT.chapter.label;

  const hasAffiliateTag = Boolean(CONTENT.gifts.affiliate && CONTENT.gifts.affiliate.amazonAssociateTag);
  const disclosure = document.getElementById("affiliate-disclosure");
  if (hasAffiliateTag) {
    disclosure.textContent = "As an Amazon Associate, we may earn a small commission from qualifying purchases made through the Amazon links below — at no extra cost to you.";
    disclosure.hidden = false;
  }
}

function getCategories() {
  const categories = new Set(CONTENT.gifts.items.map((item) => item.category));
  return ["All", ...Array.from(categories)];
}

function getPriceBandOptions() {
  const present = new Set(CONTENT.gifts.items.map((item) => getPriceBand(item.price)));
  const ordered = [...PRICE_BANDS.map((b) => b.label), "Varies"].filter((label) => present.has(label));
  return ["All", ...ordered];
}

function renderFilterGroup(containerId, options, stateKey) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  options.forEach((option) => {
    const chip = el("button", "filter-chip", option);
    chip.type = "button";
    if (option === state[stateKey]) chip.classList.add("filter-chip-active");
    chip.addEventListener("click", () => {
      state[stateKey] = option;
      renderFilters();
      renderGrid();
    });
    container.appendChild(chip);
  });
}

function renderFilters() {
  renderFilterGroup("category-filters", getCategories(), "category");
  renderFilterGroup("price-filters", getPriceBandOptions(), "priceBand");
}

function renderGrid() {
  const grid = document.getElementById("gift-grid");
  const emptyState = document.getElementById("empty-state");
  grid.innerHTML = "";

  const items = CONTENT.gifts.items.filter((item) => {
    if (state.hideClaimed && isTaken(item) && !isMine(item)) return false;
    if (state.category !== "All" && item.category !== state.category) return false;
    if (state.priceBand !== "All" && getPriceBand(item.price) !== state.priceBand) return false;
    return true;
  });

  emptyState.hidden = items.length > 0;

  items.forEach((item) => {
    const taken = isTaken(item);
    const mine = taken && isMine(item);

    const card = el("div", "gift-card" + (taken && !mine ? " gift-card-claimed" : ""));

    let badgeClass = "gift-badge";
    let badgeText = "Available";
    if (mine) {
      badgeClass += " gift-badge-mine";
      badgeText = "You chose this";
    } else if (taken) {
      badgeClass += " gift-badge-claimed";
      badgeText = "Taken";
    }
    card.appendChild(el("span", badgeClass, badgeText));

    card.appendChild(el("span", "gift-category", item.category));
    card.appendChild(el("p", "gift-name", item.name));
    card.appendChild(el("p", "gift-description", item.description));
    card.appendChild(el("p", "gift-meta", `${item.price} · ${item.store}`));

    const actions = el("div", "gift-actions");

    const link = el("a", "gift-link", taken && !mine ? "View item" : "View & buy →");
    link.href = withAffiliateTag(item.url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    actions.appendChild(link);

    if (ENDPOINT && item.id) {
      if (mine) {
        const undo = el("button", "gift-undo", "Undo");
        undo.type = "button";
        undo.setAttribute("aria-label", `Undo: release ${item.name}`);
        undo.addEventListener("click", () => undoChoice(item));
        actions.appendChild(undo);
      } else if (!taken) {
        const choose = el("button", "gift-choose", "I've chosen this");
        choose.type = "button";
        choose.setAttribute("aria-label", `I've chosen this: ${item.name}`);
        choose.addEventListener("click", () => openClaimDialog(item));
        actions.appendChild(choose);
      }
    }

    card.appendChild(actions);
    grid.appendChild(card);
  });
}

document.getElementById("hide-claimed-checkbox").addEventListener("change", (e) => {
  state.hideClaimed = e.target.checked;
  renderGrid();
});

// Pick up choices made by other guests while this page sat open in a tab.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refreshClaims();
});

renderStaticText();
renderFilters();
renderGrid();
refreshClaims();
