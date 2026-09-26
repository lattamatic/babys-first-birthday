// Renders the filterable gift list (gifts.html) from CONTENT (see content.js).

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const state = {
  category: "All",
  hideClaimed: false,
};

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

function renderFilters() {
  const container = document.getElementById("category-filters");
  container.innerHTML = "";

  getCategories().forEach((category) => {
    const chip = el("button", "filter-chip", category);
    chip.type = "button";
    if (category === state.category) chip.classList.add("filter-chip-active");
    chip.addEventListener("click", () => {
      state.category = category;
      renderFilters();
      renderGrid();
    });
    container.appendChild(chip);
  });
}

function renderGrid() {
  const grid = document.getElementById("gift-grid");
  const emptyState = document.getElementById("empty-state");
  grid.innerHTML = "";

  const items = CONTENT.gifts.items.filter((item) => {
    if (state.hideClaimed && item.claimed) return false;
    if (state.category !== "All" && item.category !== state.category) return false;
    return true;
  });

  emptyState.hidden = items.length > 0;

  items.forEach((item) => {
    const card = el("div", "gift-card" + (item.claimed ? " gift-card-claimed" : ""));

    const badge = el(
      "span",
      "gift-badge" + (item.claimed ? " gift-badge-claimed" : ""),
      item.claimed ? `Claimed${item.claimedBy ? " by " + item.claimedBy : ""}` : "Available"
    );
    card.appendChild(badge);

    const categoryTag = el("span", "gift-category", item.category);
    card.appendChild(categoryTag);

    card.appendChild(el("p", "gift-name", item.name));
    card.appendChild(el("p", "gift-description", item.description));

    const meta = el("p", "gift-meta", `${item.price} · ${item.store}`);
    card.appendChild(meta);

    const link = el("a", "gift-link", item.claimed ? "View item" : "View & buy →");
    link.href = withAffiliateTag(item.url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    card.appendChild(link);

    grid.appendChild(card);
  });
}

document.getElementById("hide-claimed-checkbox").addEventListener("change", (e) => {
  state.hideClaimed = e.target.checked;
  renderGrid();
});

renderStaticText();
renderFilters();
renderGrid();
