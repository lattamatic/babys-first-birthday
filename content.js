/*
  EDIT ME — this is the only file you should need to touch to update the site's text and photos.
  Everything below is placeholder content. Replace it with the real details.

  To add real photos/videos:
    1. Drop image files into the /images folder, video files into /videos.
    2. In the `gallery` array below, change type to "photo" or "video" and
       set `src` to the filename, e.g. src: "images/first-steps.jpg".
    3. Leave `src` empty ("") to keep showing a placeholder card.
*/

const CONTENT = {
  baby: {
    name: "Baby's Name",
    birthDate: "Month Day, Year",
  },

  party: {
    headline: "We're turning ONE!",
    date: "Saturday, Month Day, Year",
    time: "2:00 PM",
    location: "Address / venue name here",
    note: "Come celebrate with us — all we ask is you bring your happiest self.",
  },

  aboutBlurb:
    "Ask anyone who's met her — she's the happiest, friendliest baby around. " +
    "A smile for every stranger, a wave for every dog, and giggles that make " +
    "a hard day instantly better. This year has been a joy, and we can't wait " +
    "to celebrate her with the people who've loved her along the way.",

  milestones: [
    {
      month: "Month 1",
      title: "Hello, world!",
      description: "Placeholder — swap in her actual first milestone.",
      icon: "🌞",
    },
    {
      month: "Month 3",
      title: "First real smile",
      description: "Placeholder — the moment she started smiling on purpose.",
      icon: "😊",
    },
    {
      month: "Month 6",
      title: "Sitting up",
      description: "Placeholder — first time she sat up unassisted.",
      icon: "🧸",
    },
    {
      month: "Month 8",
      title: "First giggle fit",
      description: "Placeholder — the milestone that made everyone laugh too.",
      icon: "😂",
    },
    {
      month: "Month 10",
      title: "First steps",
      description: "Placeholder — wobbly, brave, and unstoppable.",
      icon: "👣",
    },
    {
      month: "Month 12",
      title: "One whole year!",
      description: "Placeholder — the party this site is all about.",
      icon: "🎂",
    },
  ],

  gallery: [
    { type: "photo", caption: "Placeholder — swap in a real photo", src: "" },
    { type: "video", caption: "Placeholder — swap in a real video", src: "" },
    { type: "photo", caption: "Placeholder — swap in a real photo", src: "" },
    { type: "photo", caption: "Placeholder — swap in a real photo", src: "" },
    { type: "video", caption: "Placeholder — swap in a real video", src: "" },
    { type: "photo", caption: "Placeholder — swap in a real photo", src: "" },
  ],

  /*
    This is our own "pseudo-registry" — real items with real links, since
    Amazon Registry / Babylist etc. aren't available in France.

    Claiming is manual (no live guest-facing "claim" button): when someone
    tells you they're getting an item, set claimed: true (and optionally
    claimedBy) and redeploy the site. That's it — no backend needed.
  */
  gifts: {
    intro:
      "Your presence at her party is the only present we need. If you'd like to bring " +
      "something for her, here's a real list with links — message us before buying so " +
      "we can mark it as taken and avoid doubles.",

    /*
      Affiliate links (optional, off by default).

      If you sign up for Amazon Partenaires (Amazon Associates France) and get
      your own tracking tag (looks like "yourtag-21"), paste it below. Every
      amazon.fr link in `items` will then automatically get your tag appended
      — you don't need to edit each URL by hand.

      Leaving this blank keeps all links exactly as-is, with no tracking.

      Note: Amazon's program rules require you to disclose this to visitors.
      When a tag is set, the site automatically shows a small disclosure line
      near the gift list — you don't need to add that yourself.
    */
    affiliate: {
      amazonAssociateTag: "", // e.g. "yourtag-21"
    },

    items: [
      {
        name: "Personalized wooden name puzzle",
        description: "A keepsake-y first toy with her name spelled out in wood — lots of French Etsy sellers make these to order.",
        price: "~20–35€",
        store: "Etsy France",
        url: "https://www.etsy.com/fr/market/puzzle_pr%C3%A9nom_en_bois",
        category: "Keepsake",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Wooden activity cube",
        description: "Five sides of shapes, beads, and gears to keep busy hands occupied — a classic 1st-birthday gift.",
        price: "~50–60€",
        store: "Nature & Découvertes",
        url: "https://www.natureetdecouvertes.com/enfant/jouets-eveil/jouets-enfilement/cube-d-activite-bois-bebe-kidkraft-91718850",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Rechargeable bubble machine",
        description: "For a baby who lights up around people — outdoor bubbles are an instant crowd-pleaser at parties.",
        price: "~15–20€",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/Machine-Automatique-Rechargeable-Soufflante-Souffleur/dp/B09Y1CVKQ4",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Wooden push walker",
        description: "She's on the verge of walking — this gives her something steady to push around.",
        price: "~40–70€",
        store: "Vertbaudet",
        url: "https://www.vertbaudet.fr/lnd/jouet-trotteur-bois.htm",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Wooden xylophone",
        description: "Real notes, small mallet, big noise — great for a baby who loves music and attention.",
        price: "~20–30€",
        store: "Nature & Découvertes",
        url: "https://www.natureetdecouvertes.com/enfant/jouets-eveil/instruments-musique/xylophone-en-bois-pour-bebe-91191360",
        category: "Music",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Ride-on toy (porteur)",
        description: "No pedals needed yet — just scoot-and-go, good for indoors or the garden.",
        price: "~30–60€",
        store: "Vertbaudet",
        url: "https://www.vertbaudet.fr/jouet/premier-age/bascules-chariots-de-marche-trotteurs-et-porteurs.htm",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Fabric sensory book",
        description: "Soft, chewable, washable — a good quiet-time or travel toy.",
        price: "~15–25€",
        store: "Nature & Découvertes",
        url: "https://www.natureetdecouvertes.com/v/livre-bebe",
        category: "Books",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Hand & footprint keepsake kit",
        description: "A clean, no-mess ink kit to capture her tiny hand and foot from this year.",
        price: "~20–30€",
        store: "Keep'Love",
        url: "https://www.keeplove.fr/products/kit-empreinte-bebe",
        category: "Keepsake",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Cité des Sciences family pass (experience gift)",
        description: "Unlimited access to the Cité des enfants in Paris for a year — a gift of outings, not stuff.",
        price: "varies",
        store: "Cité des Sciences",
        url: "https://www.cite-sciences.fr/fr/infos-pratiques/abonnement-pass",
        category: "Experience",
        claimed: false,
        claimedBy: "",
      },
    ],
    fallbackNote:
      "Prefer to pick something yourself, or thinking of a savings contribution " +
      "(Livret A, etc.) instead? Either is wonderful — just reach out to us directly.",
  },

  chapter: {
    label: "Chapter One — The First Year",
  },
};
