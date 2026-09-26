# Baby's First Birthday Website

A single-page site: milestones, a photo/video gallery, and gift/registry links —
built so it's easy to edit now and turn into "Chapter 2" for next year's birthday.

## Files you'll actually touch

- **`content.js`** — all the text: baby's name, party details, milestones, and
  the gift list. Edit this file for 95% of updates.
- **`images/`** — drop real photos here.
- **`videos/`** — drop real video clips here.
- **`gift-ideas.md`** — a broader brainstorm list (more ideas than are on the
  site), for your own reference or to share directly if someone asks.

Everything else (`index.html`, `gifts.html`, `css/style.css`, `js/main.js`,
`js/gifts.js`) is layout/design — you shouldn't need to touch it for routine
updates.

## Pages

- **`index.html`** — the main party page (hero, milestones, gallery, and a
  short gifts teaser that links onward).
- **`gifts.html`** — the full gift list, with filter chips by category and a
  "hide claimed items" toggle. This is its own page so it can grow past a
  handful of items without cluttering the homepage.

## Adding a real photo or video

1. Copy the file into `images/` (photos) or `videos/` (videos).
2. Open `content.js`, find the `gallery` array, and update one entry:
   ```js
   { type: "photo", caption: "Her first steps!", src: "images/first-steps.jpg" }
   ```
3. Save and refresh the page.

## The gift list (pseudo-registry)

There's no Amazon Registry / Babylist here since those aren't available in
France. Instead, `content.js` has a `gifts.items` array — real products with
real links to French/EU retailers (Etsy France, Nature & Découvertes,
Vertbaudet, Amazon.fr, etc.).

**Claiming is manual, on purpose — no backend, no accounts:**
1. A guest messages you saying "I'll get the wooden xylophone."
2. You open `content.js`, find that item, and set:
   ```js
   claimed: true,
   claimedBy: "Aunt Claire",   // optional
   ```
3. Save and redeploy (see below). The site now shows it as claimed and greys
   it out so no one else buys the same thing.

Add or remove items from the `items` array the same way — each one just needs
`name`, `description`, `price`, `store`, `url`, `category`, and `claimed`.
Adding a new `category` value automatically creates a new filter chip on
`gifts.html` — nothing else to wire up.

## Affiliate links (optional)

`content.js` has a `gifts.affiliate.amazonAssociateTag` field, empty by
default. If you sign up for **Amazon Partenaires** (Amazon Associates France)
and get a tracking tag, paste it in there — every `amazon.fr` link in the
gift list will automatically include it, and the site will automatically show
a small "may earn a commission" disclosure on the gift page (required by
Amazon's program rules). No tag set = no tracking, no disclosure, links work
exactly as normal.

Note: signing up for the affiliate program itself is something only you can
do (it needs your own identity/payment details) — this just wires in your tag
once you have one. Other French retailers here (Etsy, Vertbaudet, Nature &
Découvertes) generally run affiliate programs through third-party networks
(e.g. Awin, Effiliation) rather than a simple URL parameter — if you get
approved with one of those, replace that item's `url` directly with the
tracking link they give you.

## Viewing it locally

Just double-click `index.html` to open it in a browser — no install needed.

## Publishing it for guests

Any static-site host works since there's no backend. Easiest options:
- **Netlify** (netlify.com) — drag-and-drop the whole folder in their dashboard.
- **Vercel** (vercel.com) — same idea, or connect a GitHub repo.
- **GitHub Pages** — push this folder to a GitHub repo and enable Pages.

Any of these give you a free link you can text or email to guests.

## Next year: adding "Chapter 2"

When birthday #2 comes around:
1. Duplicate this whole folder (e.g. `babys-website-year-2`).
2. Update `content.js` with the new year's milestones, gallery, and party details.
3. Optionally add a small nav on the hero linking back to last year's chapter,
   once both are published, so the site becomes a running memory book.
