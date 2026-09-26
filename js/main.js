// Renders the page from CONTENT (see content.js). Edit content.js, not this file.

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderHero() {
  document.getElementById("chapter-label").textContent = CONTENT.chapter.label;
  document.getElementById("hero-headline").textContent = CONTENT.party.headline;
  document.getElementById("hero-name").textContent = CONTENT.baby.name;
  document.getElementById("party-date").textContent = CONTENT.party.date;
  document.getElementById("party-time").textContent = CONTENT.party.time;
  document.getElementById("party-location").textContent = CONTENT.party.location;
  document.getElementById("party-note").textContent = CONTENT.party.note;
}

function renderAbout() {
  document.getElementById("about-blurb").textContent = CONTENT.aboutBlurb;
}

function renderTimeline() {
  const list = document.getElementById("timeline");
  CONTENT.milestones.forEach((m) => {
    const item = el("li", "timeline-item");

    const icon = el("div", "timeline-icon", m.icon || "🎈");

    const content = el("div", "timeline-content");
    content.appendChild(el("p", "timeline-month", m.month));
    content.appendChild(el("p", "timeline-title", m.title));
    content.appendChild(el("p", "timeline-description", m.description));

    item.appendChild(icon);
    item.appendChild(content);
    list.appendChild(item);
  });
}

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  CONTENT.gallery.forEach((item) => {
    const card = el("div", "gallery-card");

    if (item.src) {
      if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        card.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.caption || "";
        card.appendChild(img);
      }
    } else {
      const placeholder = el("div", "gallery-placeholder");
      placeholder.appendChild(
        el("div", "gallery-placeholder-icon", item.type === "video" ? "🎬" : "📷")
      );
      placeholder.appendChild(el("p", "gallery-caption", item.caption));
      card.appendChild(placeholder);
    }

    grid.appendChild(card);
  });
}

function renderGifts() {
  document.getElementById("gifts-intro").textContent = CONTENT.gifts.intro;
}

function renderFooter() {
  document.getElementById("footer-chapter").textContent = CONTENT.chapter.label;
}

renderHero();
renderAbout();
renderTimeline();
renderGallery();
renderGifts();
renderFooter();
