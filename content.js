/*
  EDIT ME — this is the only file you should need to touch to update the site's text and photos.

  To change a photo in the story: put the image in /images/story, then change
  `image` on that chapter. `focus` says which part of the photo stays in frame
  when it's cropped to a portrait card ("50% 0%" = keep the top, "50% 100%" =
  keep the bottom).
*/

const CONTENT = {
  party: {
    date: "Sunday, 18 October 2026",
    time: "3:00 PM, with dinner to follow",
    location: "Massy",
    note: "Come celebrate with us — all we ask is you bring your happiest self.",
  },

  aboutBlurb:
    "Ask anyone who's met her — she's the happiest, friendliest baby around. " +
    "A smile for every stranger, a wave for every dog, and giggles that make " +
    "a hard day instantly better. This year has been a joy, and we can't wait " +
    "to celebrate her with the people who've loved her along the way.",

  hero: {
    script: "Bhuvi",       // the big handwritten name
    caps: "Turns one",     // the small capitals line under it
    image: "images/hero.jpg",
    focus: "50% 0%",
    alt: "Bhuvi Tara in a bright pink puffer jacket, held up high and grinning in front of the Eiffel Tower lit up at dusk.",
  },

  // One chapter per photo, in order. `month` 0 = newborn, 12 = her first birthday.
  story: {
    title: "Her First Year, Month by Month",
    subtitle: "From her very first day to her first birthday. Tap a face to jump to that month.",
    chapters: [
      {
        month: 0,
        title: "Hello, world",
        image: "images/story/month-00.jpg",
        focus: "50% 35%",
        alt: "Newborn in a pink knit hat, swaddled in a star-print sleep sack, one hand tucked under her chin.",
      },
      {
        month: 1,
        title: "Wide-eyed in purple silk",
        image: "images/story/month-01.jpg",
        focus: "50% 0%",
        alt: "Baby in a purple silk dress with gold borders and a ruffled purple bonnet, looking wide-eyed at the camera.",
      },
      {
        month: 2,
        title: "Lace, legs and a little sign",
        image: "images/story/month-02.jpg",
        focus: "50% 60%",
        alt: "Baby in a cream lace outfit and headband lying on a white blanket beside a wooden '2 months' sign.",
      },
      {
        month: 3,
        title: "Bonjour, Paris",
        image: "images/story/month-03.jpg",
        focus: "50% 0%",
        alt: "Baby in a pink pom-pom hat and white fleece coat with the Eiffel Tower behind her.",
      },
      {
        month: 4,
        title: "The first big smiles",
        image: "images/story/month-04.jpg",
        focus: "50% 0%",
        alt: "Baby grinning in a yellow bonnet and pink bunny-print top, sitting on a lap.",
      },
      {
        month: 5,
        title: "Silk, gold and big dark eyes",
        image: "images/story/month-05.jpg",
        focus: "50% 0%",
        alt: "Close-up of baby in a purple silk top and red silk skirt, held in someone's hands.",
      },
      {
        month: 6,
        title: "A balloon party for one",
        image: "images/story/month-06.jpg",
        focus: "50% 30%",
        alt: "Baby in a black dress with a gold flower, laughing while lying among white and blue balloons.",
      },
      {
        month: 7,
        title: "Sitting up like a pro",
        image: "images/story/month-07.jpg",
        focus: "50% 60%",
        alt: "Baby sitting up in a purple sparkly tutu dress with a wooden '7 months' sign, in front of a coral backdrop.",
      },
      {
        month: 8,
        title: "Her little princess moment",
        image: "images/story/month-08.jpg",
        focus: "50% 40%",
        alt: "Baby sitting on the floor in a cream tulle dress with a white flower headband.",
      },
      {
        month: 9,
        title: "Standing on her own two feet",
        image: "images/story/month-09.jpg",
        focus: "50% 30%",
        alt: "Baby standing in an orange ikat dress with a canvas bag over her shoulder, with an adult's hands waving behind her.",
      },
      {
        month: 10,
        title: "Making a splash",
        image: "images/story/month-10.jpg",
        focus: "50% 10%",
        alt: "Baby grinning in a black swim cap and orange fruit-print swimsuit, held up by two adult hands at a pool.",
      },
      {
        month: 11,
        title: "Playground adventures",
        image: "images/story/month-11.jpg",
        focus: "50% 70%",
        alt: "Baby in a pink jacket riding a green spring toy in a playground, smiling at the camera.",
      },
      {
        month: 12,
        featured: true, // shown large, full width, after the other months
        title: "One whole year",
        image: "images/story/year-1.jpg",
        alt: "Bhuvi Tara sitting in a pink high chair in front of her birthday backdrop: pastel and unicorn balloons, an 'It's My Birthday' banner, twelve monthly photos on the wall, and a giant gold number 1.",
      },
    ],
  },

  /*
    The gift list: one card per gift, with a photo and a name guests can search
    for in any shop. Guests mark a gift as taken with the "I've chosen this"
    button (see `claims` below and the README). `claimed: true` on a gift is a
    manual override that shows it as Taken. Never change a gift's `id` once
    guests have started choosing. Leave `image` empty ("") to show a "photo
    coming soon" tile until you add a picture to images/gifts/.
  */
  gifts: {
    intro:
      "Your presence at her party is the only present we need. If you'd like to bring " +
      "something for her, here are some ideas. Tap \"I've chosen this\" on the one you're " +
      "getting so nobody doubles up, then pick it up from your favourite shop.",

    /*
      Live "I've chosen this" buttons. Paste the web app URL from the Google
      Sheet setup here (see README). While this is blank the buttons are
      hidden and the list is just a list.
    */
    claims: {
      endpoint: "https://script.google.com/macros/s/AKfycbyyYdCZo24ox7rKOlNXtHLQWIXhw5NHYoQRsmmK7_IlLYlYW7RrkG22u9iDv8qOUPOv2g/exec",
    },

    items: [
      {
        id: "ikea-uppsta-stacking-cups",
        name: "IKEA UPPSTÅ – Jeu de gobelets, multicolore",
        image: "images/gifts/ikea-uppsta-stacking-cups.jpg",
        claimed: false,
      },
      {
        id: "ikea-uppsta-stacking-rings",
        name: "IKEA UPPSTÅ – Pyramide d'anneaux, multicolore",
        image: "images/gifts/ikea-uppsta-stacking-rings.jpg",
        claimed: false,
      },
      {
        id: "oxybul-farm-peg-puzzle",
        name: "Puzzle encastrement ferme – Oxybul",
        image: "",
        claimed: false,
      },
      {
        id: "large-interlocking-blocks",
        name: "Large interlocking building blocks",
        image: "",
        claimed: false,
      },
      {
        id: "wheres-spot",
        name: "Where's Spot? – Eric Hill",
        image: "images/gifts/wheres-spot.jpg",
        claimed: false,
      },
      {
        id: "dear-zoo",
        name: "Dear Zoo – Rod Campbell",
        image: "images/gifts/dear-zoo.jpg",
        claimed: false,
      },
      {
        id: "thats-not-my-puppy",
        name: "That's Not My Puppy… – Fiona Watt",
        image: "images/gifts/thats-not-my-puppy.jpg",
        claimed: false,
      },
      {
        id: "brown-bear-brown-bear",
        name: "Brown Bear, Brown Bear, What Do You See? – Bill Martin Jr. & Eric Carle",
        image: "images/gifts/brown-bear-brown-bear.jpg",
        claimed: false,
      },
      {
        id: "very-hungry-caterpillar",
        name: "The Very Hungry Caterpillar – Eric Carle",
        image: "images/gifts/very-hungry-caterpillar.jpg",
        claimed: false,
      },
      {
        id: "first-100-words",
        name: "First 100 Words – Roger Priddy",
        image: "images/gifts/first-100-words.jpg",
        claimed: false,
      },
      {
        id: "musical-touch-piano",
        name: "Musical activity toy / touch piano",
        image: "",
        claimed: false,
      },
      {
        id: "bieco-hedgehog-xylophone",
        name: "Bieco – Hedgehog baby xylophone",
        image: "images/gifts/bieco-hedgehog-xylophone.jpg",
        claimed: false,
      },
      {
        id: "taf-toys-first-music-set",
        name: "Premier set musical pour les petits – Taf Toys",
        image: "",
        claimed: false,
      },
      {
        id: "water-drawing-mat",
        name: "Water drawing mat",
        image: "",
        claimed: false,
      },
      {
        id: "oxybul-6-sensory-balls",
        name: "6 balles sensorielles – Oxybul",
        image: "",
        claimed: false,
      },
      {
        id: "ikea-uppsta-push-walker",
        name: "IKEA UPPSTÅ – Chariot de marche, vert",
        image: "images/gifts/ikea-uppsta-push-walker.jpg",
        claimed: false,
      },
      {
        id: "goplus-pikler-triangle-arch-ramp",
        name: "GOPLUS 7-in-1 Montessori triangle & arch with slide and ramp",
        image: "images/gifts/goplus-pikler-triangle-arch-ramp.jpg",
        claimed: false,
      },
      {
        id: "oxybul-popup-house-tunnel",
        name: "Maison pop up avec tunnel – Oxybul",
        image: "",
        claimed: false,
      },
      {
        id: "soft-baby-doll",
        name: "Soft baby doll with accessories",
        image: "",
        claimed: false,
      },
      {
        id: "ikea-duktig-mini-kitchen",
        name: "IKEA DUKTIG – Mini cuisine, bouleau",
        image: "images/gifts/ikea-duktig-mini-kitchen.jpg",
        claimed: false,
      },
      {
        id: "nene-rainbow-stacker",
        name: "Nene Toys – Wooden Montessori rainbow stacker, 3 in 1",
        image: "images/gifts/nene-rainbow-stacker.jpg",
        claimed: false,
      },
      {
        id: "smartwo-permanence-box",
        name: "Smartwo – Montessori wooden ball drop / object permanence box",
        image: "images/gifts/smartwo-permanence-box.jpg",
        claimed: false,
      },
    ],
  },
};
