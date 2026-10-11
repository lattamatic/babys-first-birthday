// Renders the page from CONTENT (see content.js). Edit content.js, not this file.

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function monthLabel(month) {
  if (month === 0) return "Newborn";
  if (month === 12) return "Year 1";
  return `Month ${month}`;
}

function monthId(month) {
  return `month-${String(month).padStart(2, "0")}`;
}

function thumbPath(imagePath) {
  return imagePath.replace("/story/", "/story/thumbs/");
}

function renderHero() {
  document.getElementById("chapter-label").textContent = CONTENT.chapter.label;
  document.getElementById("hero-headline").textContent = CONTENT.party.headline;
  document.getElementById("hero-name").textContent = CONTENT.baby.name;
  document.getElementById("party-date").textContent = CONTENT.party.date;
  document.getElementById("party-time").textContent = CONTENT.party.time;
  document.getElementById("party-location").textContent = CONTENT.party.location;
  document.getElementById("party-note").textContent = CONTENT.party.note;

  const photo = document.getElementById("hero-photo");
  photo.src = CONTENT.hero.image;
  photo.alt = CONTENT.hero.alt;
  photo.style.objectPosition = CONTENT.hero.focus;
}

function renderAbout() {
  document.getElementById("about-blurb").textContent = CONTENT.aboutBlurb;
}

function renderStory() {
  document.getElementById("story-title").textContent = CONTENT.story.title;
  document.getElementById("story-subtitle").textContent = CONTENT.story.subtitle;

  const strip = document.getElementById("story-strip");
  const list = document.getElementById("story-list");

  CONTENT.story.chapters.forEach((chapter) => {
    const id = monthId(chapter.month);

    const stripItem = el("li");
    const stripLink = el("a");
    stripLink.href = `#${id}`;
    stripLink.setAttribute("aria-label", monthLabel(chapter.month));
    const stripImg = el("img");
    stripImg.src = thumbPath(chapter.image);
    stripImg.alt = "";
    stripImg.width = 64;
    stripImg.height = 64;
    stripImg.loading = "lazy";
    stripLink.appendChild(stripImg);
    stripLink.appendChild(el("span", "", chapter.month === 12 ? "1 yr" : String(chapter.month)));
    stripItem.appendChild(stripLink);
    strip.appendChild(stripItem);

    const item = el("li", "chapter");
    item.id = id;

    const figure = el("figure", "chapter-photo");
    const fullLink = el("a");
    fullLink.href = chapter.image;
    fullLink.target = "_blank";
    fullLink.rel = "noopener";
    fullLink.setAttribute("aria-label", `View the full photo: ${monthLabel(chapter.month)}`);
    const img = el("img");
    img.src = chapter.image;
    img.alt = chapter.alt;
    img.loading = "lazy";
    img.style.objectPosition = chapter.focus;
    fullLink.appendChild(img);
    figure.appendChild(fullLink);

    const text = el("div", "chapter-text");
    const number = el("p", "chapter-number", String(chapter.month).padStart(2, "0"));
    number.setAttribute("aria-hidden", "true");
    text.appendChild(number);
    text.appendChild(el("p", "chapter-month", monthLabel(chapter.month)));
    text.appendChild(el("h3", "chapter-title", chapter.title));
    text.appendChild(el("p", "chapter-caption", chapter.caption));

    item.appendChild(figure);
    item.appendChild(text);
    list.appendChild(item);
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
renderStory();
renderGifts();
renderFooter();
