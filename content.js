/*
  EDIT ME — this is the only file you should need to touch to update the site's text and photos.

  To change a photo in the story: put the image in /images/story, then change
  `image` on that chapter. `focus` says which part of the photo stays in frame
  when it's cropped to a portrait card ("50% 0%" = keep the top, "50% 100%" =
  keep the bottom). The "view full photo" link always shows the whole picture.
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

  hero: {
    image: "images/story/month-11.jpg",
    focus: "50% 70%",
    alt: "Baby in a pink jacket riding a green spring toy in a playground, smiling at the camera.",
  },

  // One chapter per photo, in order. `month` 0 = newborn, 12 = her first birthday.
  // Captions are drafts written from what's in each photo — rewrite freely.
  story: {
    title: "Her First Year, Month by Month",
    subtitle: "From her very first day to her first birthday. Tap a face to jump to that month.",
    chapters: [
      {
        month: 0,
        title: "Hello, world",
        caption: "A tiny pink hat, a hand tucked under her chin, and a very serious first look at everything.",
        image: "images/story/month-00.jpg",
        focus: "50% 35%",
        alt: "Newborn in a pink knit hat, swaddled in a star-print sleep sack, one hand tucked under her chin.",
      },
      {
        month: 1,
        title: "Wide-eyed in purple silk",
        caption: "One month in, all dressed up in silk and gold, and already taking in every detail of the room.",
        image: "images/story/month-01.jpg",
        focus: "50% 0%",
        alt: "Baby in a purple silk dress with gold borders and a ruffled purple bonnet, looking wide-eyed at the camera.",
      },
      {
        month: 2,
        title: "Lace, legs and a little sign",
        caption: "Cream lace, a soft headband, and the \"2 months\" sign by her side. Kicking back like she owns the bed.",
        image: "images/story/month-02.jpg",
        focus: "50% 60%",
        alt: "Baby in a cream lace outfit and headband lying on a white blanket beside a wooden '2 months' sign.",
      },
      {
        month: 3,
        title: "Bonjour, Paris",
        caption: "Pom-pom hat, fluffy white coat, and the Eiffel Tower photobombing from behind.",
        image: "images/story/month-03.jpg",
        focus: "50% 0%",
        alt: "Baby in a pink pom-pom hat and white fleece coat with the Eiffel Tower behind her.",
      },
      {
        month: 4,
        title: "The first big smiles",
        caption: "A yellow bonnet and a grin that took over the whole photo.",
        image: "images/story/month-04.jpg",
        focus: "50% 0%",
        alt: "Baby grinning in a yellow bonnet and pink bunny-print top, sitting on a lap.",
      },
      {
        month: 5,
        title: "Silk, gold and big dark eyes",
        caption: "Dressed up again, held close, and watching everything that was going on around her.",
        image: "images/story/month-05.jpg",
        focus: "50% 0%",
        alt: "Close-up of baby in a purple silk top and red silk skirt, held in someone's hands.",
      },
      {
        month: 6,
        title: "A balloon party for one",
        caption: "Flat on her back in a sea of balloons, laughing at all of it. Half a year of pure joy.",
        image: "images/story/month-06.jpg",
        focus: "50% 30%",
        alt: "Baby in a black dress with a gold flower, laughing while lying among white and blue balloons.",
      },
      {
        month: 7,
        title: "Sitting up like a pro",
        caption: "Sparkly tutu, the \"7 months\" sign, and sitting up all on her own.",
        image: "images/story/month-07.jpg",
        focus: "50% 60%",
        alt: "Baby sitting up in a purple sparkly tutu dress with a wooden '7 months' sign, in front of a coral backdrop.",
      },
      {
        month: 8,
        title: "Her little princess moment",
        caption: "Cream tulle, a flower headband, and a very curious look at whoever was holding the camera.",
        image: "images/story/month-08.jpg",
        focus: "50% 40%",
        alt: "Baby sitting on the floor in a cream tulle dress with a white flower headband.",
      },
      {
        month: 9,
        title: "Standing on her own two feet",
        caption: "Bag over her shoulder, ready to head out, while someone behind her waves hello.",
        image: "images/story/month-09.jpg",
        focus: "50% 30%",
        alt: "Baby standing in an orange ikat dress with a canvas bag over her shoulder, with an adult's hands waving behind her.",
      },
      {
        month: 10,
        title: "Making a splash",
        caption: "Swim cap on, fruit-print swimsuit, and two tiny teeth showing in the biggest grin.",
        image: "images/story/month-10.jpg",
        focus: "50% 10%",
        alt: "Baby grinning in a black swim cap and orange fruit-print swimsuit, held up by two adult hands at a pool.",
      },
      {
        month: 11,
        title: "Playground adventures",
        caption: "Riding a spring frog like she's done it a hundred times, ponytail and all.",
        image: "images/story/month-11.jpg",
        focus: "50% 70%",
        alt: "Baby in a pink jacket riding a green spring toy in a playground, smiling at the camera.",
      },
      {
        month: 12,
        title: "One whole year",
        caption: "A twirly red dress and a quick look back over her shoulder. Just like that, she's one.",
        image: "images/story/month-12.jpg",
        focus: "50% 45%",
        alt: "Baby in a red tulle party dress with a topknot, walking across a wooden floor.",
      },
    ],
  },

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

      // --- Imported from Baby_1st_Birthday_Gift_Registry_France.xlsx ---
      {
        name: "La petite bibliothèque de mes 1 an",
        description: "Books / language · Ages 1–3 years",
        price: "€16.95",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=La+petite+biblioth%C3%A8que+de+mes+1+an",
        category: "Books",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "L'album de ma première année",
        description: "Memory / keepsake · Ages 1+",
        price: "€15.23",
        store: "Fnac",
        url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=album+premiere+annee+bebe",
        category: "Keepsake",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Vertbaudet children's hooded bath towel",
        description: "Practical · Ages 1–3 years",
        price: "€12.99",
        store: "La Redoute",
        url: "https://www.laredoute.fr/search.aspx?text=serviette+bain+enfant+vertbaudet",
        category: "Practical",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Silicone baby bib",
        description: "Mealtime · Ages 1–3 years",
        price: "~€10-15",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=bavoir+silicone+b%C3%A9b%C3%A9",
        category: "Practical",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Cubika wooden shape-sorting toy",
        description: "Fine motor / shapes · Ages 1–3 years",
        price: "€13.81",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/Cubika-15337-Couleurs-construction-enfants/dp/B09XQWGPNG",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Disney Mes Premières Histoires – 12 books",
        description: "Books / language · Ages 1–3 years",
        price: "€14.95",
        store: "Fnac",
        url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=Disney+Mes+Premieres+Histoires+12+livres",
        category: "Books",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "3-in-1 Montessori threading / sorting / stacking toy",
        description: "Fine motor / cognitive · Ages 2–4 years",
        price: "€18.99",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=Guopai+Jouet+Montessori+3+en+1+perles+bois",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Montessori fishing & sorting toy",
        description: "Fine motor / coordination · Ages 1–3 years",
        price: "€21.99",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=hahaland+Jouet+B%C3%A9b%C3%A9+1+an+p%C3%AAche+Montessori",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Hahaland Montessori busy book",
        description: "Fine motor / sensory · Ages 1–3 years",
        price: "€20.59",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=hahaland+Busy+Book+Montessori+1+an",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Kids Concept wooden guitar (red)",
        description: "Music / pretend play · Ages 2–5 years",
        price: "€31.00",
        store: "Smallable",
        url: "https://www.smallable.com/fr/product/guitare-en-bois-rouge-kid-s-concept-199660",
        category: "Music",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "LEGO DUPLO Deluxe Brick Box 10914",
        description: "Construction / creativity · Ages 1.5–5 years",
        price: "€33.99",
        store: "Cdiscount",
        url: "https://www.cdiscount.com/juniors/jeux-de-construction/lego-duplo-10914-deluxe-brick-box/f-12064-leg10914.html",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "XXL foldable anti-shock play mat (Superbe Bébé)",
        description: "Gross motor / play space · Ages 1–4 years",
        price: "€34.90",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/SUPERBE-BEBE-Enfant-Pliable-Reversible/dp/B0DV5C6HH2",
        category: "Practical",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Kitchen Corner wooden play kitchen",
        description: "Pretend play / language · Ages 2–5 years",
        price: "€36.99",
        store: "Smyths Toys",
        url: "https://www.smythstoys.com/fr/fr-fr/jouets/jeux-d%27imitation/cuisine-et-alimentation/cuisine-en-bois/p/",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Maileg Penguin (stuffed toy)",
        description: "Comfort / imaginative play · Ages 1–5 years",
        price: "€38.00",
        store: "Maileg EU",
        url: "https://maileg.com/search?q=Penguin",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Montessori counting & colour sorting game",
        description: "Early maths / fine motor · Ages 3–6 years",
        price: "€27.99",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=Broytain+Jeux+Montessori+comptage+tri+couleurs",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "5-piece bamboo baby bath towel set",
        description: "Practical · Ages 1–3 years",
        price: "€19.99",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=ensemble+serviettes+bain+bebe+bambou+5+pieces",
        category: "Practical",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Decathlon 2-in-1 evolving ride-on / balance toy",
        description: "Gross motor / balance · Ages 1–3 years",
        price: "€59.99",
        store: "Decathlon",
        url: "https://www.decathlon.fr/p/porteur-bebe-evolutif-2en1-draisienne-1-3-ans-bleu/_/R-p-323522",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "10-inch balance bike, adjustable saddle",
        description: "Balance / gross motor · Ages 2+ years",
        price: "€49.90",
        store: "Decathlon Marketplace",
        url: "https://www.decathlon.fr/p/mp/draisienne-10-pouces-enfant-2-ans-poids-leger/60a2f432-fbc0-4f72-8640-27dd4fa613c8/c5",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Banwood tricycle (red)",
        description: "Gross motor / outdoor · Ages 2–4 years",
        price: "~€165-195",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/Banwood-Trike-Rood/dp/B086R4QPY6",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Banwood Trike (blue)",
        description: "Gross motor / outdoor · Ages 2–5 years",
        price: "~€165-195",
        store: "Smallable",
        url: "https://www.smallable.com/en/product/metal-and-woode-tricycle-blue-banwood-189397",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Petit Picotin Roger toy basket",
        description: "Storage / room · Ages 1+",
        price: "€69.00",
        store: "Petit Picotin",
        url: "https://petitpicotin.com/search?q=Roger+toy+basket",
        category: "Practical",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Zü first-year baby memory book",
        description: "Memory / keepsake · Ages 1+",
        price: "€45.00",
        store: "Nature & Découvertes",
        url: "https://www.natureetdecouvertes.com/search?query=livre+souvenirs+bebe+premiere+annee",
        category: "Keepsake",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Ecoiffier Ma 1ère Cuisine",
        description: "Pretend play · Ages 1.5–4 years",
        price: "€19.95",
        store: "Carrefour",
        url: "https://www.carrefour.fr/s?q=Ecoiffier+Ma+1ere+Cuisine",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Le grand livre de mes 1 an",
        description: "Books / language · Ages 1–3 years",
        price: "~€12.76",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/grand-livre-mes-Imagier-d%C3%A9veil/dp/2324029189",
        category: "Books",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Birth book / Three Little Rabbits – Moulin Roty",
        description: "Books / keepsake · Ages 1+",
        price: "€24.90",
        store: "King Jouet",
        url: "https://www.king-jouet.com/recherche?search=trois+petits+lapins+moulin+roty",
        category: "Keepsake",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Kids Concept wooden guitar (mustard yellow)",
        description: "Music / coordination · Ages 2–5 years",
        price: "€31.00",
        store: "Smallable",
        url: "https://www.smallable.com/fr/product/guitare-en-bois-jaune-moutarde-kid-s-concept-199656",
        category: "Music",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Baby swim float with UPF 50+ canopy",
        description: "Water / outdoor · Ages 6–36 months",
        price: "€29.99",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=MYCARBON+bouee+bebe+UPF+50",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "LEGO DUPLO large brick set",
        description: "Construction / creativity · Ages 1.5–5 years",
        price: "€50+",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/s?k=LEGO+DUPLO+1+an+grand+coffret",
        category: "Toys",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Banwood tricycle (cream)",
        description: "Outdoor / gross motor · Ages 2–5 years",
        price: "~€165-195",
        store: "Amazon.fr",
        url: "https://www.amazon.fr/Banwood-Trike-Cream/dp/B086R4JSWS",
        category: "Outdoor",
        claimed: false,
        claimedBy: "",
      },
      {
        name: "Personalised first-year baby memory book",
        description: "Memory / keepsake · Ages 1+",
        price: "~€20-25",
        store: "Etsy France",
        url: "https://www.etsy.com/fr/market/livre_souvenir_b%C3%A9b%C3%A9",
        category: "Keepsake",
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
