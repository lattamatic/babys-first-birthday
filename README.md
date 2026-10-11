# Baby's First Birthday Website

A party page with a month-by-month photo story and a filterable gift list —
built so it's easy to edit now and turn into "Chapter 2" for next year's birthday.

## Files you'll actually touch

- **`content.js`** — all the text: baby's name, party details, the photo
  story titles, and the gift list. Edit this file for 95% of updates.
- **`apps-script/Code.gs`** — the small script behind the "I've chosen this"
  buttons. It lives in your Google Sheet, not on the website (see below).
- **`images/story/`** — the web-ready photos used by the story (see below).
- **`videos/`** — empty for now; the story is photos only.
- **`gift-ideas.md`** — a broader brainstorm list (more ideas than are on the
  site), for your own reference or to share directly if someone asks.

Everything else (`index.html`, `gifts.html`, `css/style.css`, `js/main.js`,
`js/gifts.js`) is layout/design — you shouldn't need to touch it for routine
updates.

## Pages

- **`index.html`** — the main party page (hero, the month-by-month photo
  story, and a short gifts teaser that links onward).
- **`gifts.html`** — the full gift list, with filter chips by category and a
  "hide gifts that are already taken" toggle. This is its own page so it can grow past a
  handful of items without cluttering the homepage.

## The photo story

The story on the homepage is the `story.chapters` list in `content.js` — one
entry per photo, in order (`month` 0 = newborn, 12 = first birthday). Each one
has a title, the photo, an `alt` description for screen readers (not shown on
the page), and a `focus` that says which part of the photo stays in frame when
it's cropped to a portrait card ("50% 0%" keeps the top, "50% 100%" keeps the
bottom). Clicking a photo opens the full uncropped version.

**Swapping or adding a photo:** the originals are phone photos (many are HEIC,
which most browsers can't show, and they carry camera metadata like model and
timestamps). Don't drop those straight into the site. Ask Claude to prepare
them, or convert/resize them to JPEGs (about 900px wide) with metadata removed,
save them in `images/story/`, and add a transparent PNG of just her head (no
background, no body) to `images/story/heads/` with the same file name but ending
in `.png`, for the row of faces at the top. The head cutouts need a background-
removal tool, so it's easiest to ask Claude to make them.

The chapter marked `featured: true` (the first-birthday photo) isn't a small
card like the others: it gets its own section at the end and is shown large and
uncropped, edge to edge on a phone.

The original HEIC/JPG files in `images/` are ignored by git on purpose, so only
the cleaned copies ever get published.

## The gift list (pseudo-registry)

There's no Amazon Registry / Babylist here since those aren't available in
France. Instead, `content.js` has a `gifts.items` array — real products with
real links to French/EU retailers (Etsy France, Nature & Découvertes,
Vertbaudet, Amazon.fr, etc.).

Each gift needs an `id` (lowercase letters, numbers and hyphens, like
`wooden-xylophone`), `name`, `description`, `price`, `store`, `url` and
`category`. **Never change a gift's `id` once guests start choosing** — it's how
a choice stays attached to the right gift. A new `category` value automatically
creates a new filter chip on `gifts.html`.

## Letting guests choose a gift ("I've chosen this")

Guests tap **I've chosen this**, type their name, and that gift shows as
**Taken** for everyone else. They can **Undo** from the same phone. Choices are
stored in a Google Sheet you own. Only gift IDs are public; names stay in the
sheet. If two families tap the same gift at once, the second one is politely
told it was just taken.

While `gifts.claims.endpoint` in `content.js` is blank, none of this shows and
the list works as a plain list. To turn it on, do this **once** (about 10
minutes):

1. Go to [sheets.google.com](https://sheets.google.com) and create a blank
   spreadsheet. Name it something like "Baby gift choices".
2. In the sheet, open **Extensions > Apps Script**. Delete the starter code,
   then paste in the whole of `apps-script/Code.gs` from this project.
3. *(Optional)* Near the top, set a party code: `const PARTY_CODE = "HappyOne";`
   Put the same code on the invitation. Guests type it once and their phone
   remembers it. Leave it `""` for no code. It keeps strangers who find the link
   from choosing gifts.
4. Click the save icon. In the function menu at the top, pick **setup** and
   click **Run**. Google asks you to authorize it: choose your account, and if it
   says the app isn't verified click **Advanced > Go to (project name)** (that's
   normal for your own script), then **Allow**. A **Claims** tab now exists in
   the sheet.
5. Click **Deploy > New deployment**. Click the gear next to "Select type" and
   pick **Web app**. Set **Execute as: Me** and **Who has access: Anyone**, then
   **Deploy**. Copy the **Web app URL** (it ends in `/exec`).
6. Paste that URL into `content.js` as `gifts.claims.endpoint`, then publish.
7. Test it: choose a gift on the live page and check that a row appears in the
   sheet, then press **Undo** and check that it disappears.

**Day to day you do nothing.** Choices appear in the sheet by themselves. To
release a gift for someone, delete its row. **Keep the sheet private**: the
"Undo key" column lets whoever holds a key release that gift.

If you ever edit the script (including the party code), redeploy it: **Deploy >
Manage deployments > pencil icon > Version: New version > Deploy**. The URL
stays the same.

If you'd rather mark a gift taken yourself, setting `claimed: true` on it in
`content.js` still works and shows it as Taken.

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
2. Update `content.js` with the new year's photo story and party details.
3. Optionally add a small nav on the hero linking back to last year's chapter,
   once both are published, so the site becomes a running memory book.
