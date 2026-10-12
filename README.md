# Baby's First Birthday Website

A party page with a month-by-month photo story and a filterable gift list —
built so it's easy to edit now and turn into "Chapter 2" for next year's birthday.

## Files you'll actually touch

- **`content.js`** — all the text: baby's name, party details, the photo
  story titles, and the gift list. Edit this file for 95% of updates.
- **`apps-script/Code.gs`** — the small script behind the "I've chosen this"
  buttons. It lives in your Google Sheet, not on the website (see below).
- **`images/story/`** — the web-ready photos used by the story (see below).
- **`images/gifts/`** — one photo per gift for the gift list (see below).
- **`videos/`** — empty for now; the story is photos only.
- **`gift-ideas.md`** — a broader brainstorm list (more ideas than are on the
  site), for your own reference or to share directly if someone asks.

Everything else (`index.html`, `gifts.html`, `css/style.css`, `js/main.js`,
`js/gifts.js`) is layout/design — you shouldn't need to touch it for routine
updates.

## Pages

- **`index.html`** — the main party page (hero, the month-by-month photo
  story, and a short gifts teaser that links onward).
- **`gifts.html`** — the gift list: a grid of cards, each with a photo and a name
  guests can search for in any shop, plus an "I've chosen this" button and a "hide
  gifts that are already taken" toggle.

## The photo story

The story on the homepage is the `story.chapters` list in `content.js` — one
entry per photo, in order (`month` 0 = newborn, 12 = first birthday). Each one
has a title, the photo, an `alt` description for screen readers (not shown on
the page), and a `focus` that says which part of the photo stays in frame when
it's cropped to a portrait card ("50% 0%" keeps the top, "50% 100%" keeps the
bottom).

**Swapping or adding a photo:** the originals are phone photos (many are HEIC,
which most browsers can't show, and they carry camera metadata like model and
timestamps). Don't drop those straight into the site. Ask Claude to prepare
them, or convert/resize them to JPEGs (about 900px wide) with metadata removed,
save them in `images/story/`, and add a tight, square face-only crop (about
200px) to `images/story/thumbs/` with the same file name for the row of faces at
the top.

The chapter marked `featured: true` (the first-birthday photo) isn't a small
card like the others: it gets its own section at the end and is shown large and
uncropped, edge to edge on a phone.

The original HEIC/JPG files in `images/` are ignored by git on purpose, so only
the cleaned copies ever get published.

## The gift list

There are no shop links on purpose: each card shows a **photo and a name**, and
guests find the item themselves. The list is `gifts.items` in `content.js`; each
gift has:

- `id` — lowercase letters, numbers and hyphens (like `wooden-xylophone`).
  **Never change it once guests start choosing**, it's how a choice stays
  attached to the right gift.
- `name` — what the card says (and what guests will search for).
- `image` — the picture, like `"images/gifts/wooden-xylophone.jpg"`. Leave it
  `""` to show a "Photo coming soon" tile.
- `claimed` — `false`, or `true` to mark a gift Taken by hand.

**Adding or replacing a photo:** save a square-ish JPEG (about 700px) in
`images/gifts/`, named after the gift's `id`, and point `image` at it. Product
photos belong to the shops that took them, so for a family party site it's fine,
but don't reuse them for anything public or commercial.

## Letting guests choose a gift ("I've chosen this")

Guests tap **I've chosen this**, type their name, and that gift shows as
**Taken** for everyone else. They can **Release this gift** from the same phone. Choices are
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
3. Click the save icon. In the function menu at the top, pick **setup** and
   click **Run**. Google asks you to authorize it: choose your account, and if it
   says the app isn't verified click **Advanced > Go to (project name)** (that's
   normal for your own script), then **Allow**. A **Claims** tab now exists in
   the sheet.
4. Click **Deploy > New deployment**. Click the gear next to "Select type" and
   pick **Web app**. Set **Execute as: Me** and **Who has access: Anyone**, then
   **Deploy**. Copy the **Web app URL** (it ends in `/exec`).
5. Paste that URL into `content.js` as `gifts.claims.endpoint`, then publish.
6. Test it: choose a gift on the live page and check that a row appears in the
   sheet, then press **Release this gift** and check that it disappears.

**Day to day you do nothing.** Choices appear in the sheet by themselves. To
release a gift for someone, delete its row. **Keep the sheet private**: the
"Undo key" column lets whoever holds a key release that gift.

If you ever edit the script, redeploy it: **Deploy >
Manage deployments > pencil icon > Version: New version > Deploy**. The URL
stays the same.

If you'd rather mark a gift taken yourself, setting `claimed: true` on it in
`content.js` still works and shows it as Taken.

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
