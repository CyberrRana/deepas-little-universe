/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DEEPA'S LITTLE UNIVERSE · ONE CENTRAL CONFIGURATION FILE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every word, caption and photo on the site lives here. Edit this file and
 *  the whole little universe updates — no need to touch any component.
 *
 *  ▸ THE FOUR PHOTOS
 *    1. Drop your images into  public/photos/  (portrait crops, roughly 3:4,
 *       e.g. 900 × 1200 px, .jpg or .webp).
 *    2. Point `src` below at the file, relative to the public folder:
 *          src: 'photos/photo-1.jpg'
 *       A full https:// URL also works — handy for images hosted elsewhere.
 *    3. Keep exactly four items in `photos.items`. The layout is built for 4.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /* ── Who this is for ────────────────────────────────────────────────── */
  name: 'DEEPA',
  nameTitle: 'Deepa',
  title: "DEEPA'S LITTLE UNIVERSE",
  tagline: 'A Little World Made Just For You!',
  signature: 'Your Friend',

  /* ── Section 1 · The grand surprise ─────────────────────────────────── */
  hero: {
    kicker: 'a tiny cosmos · made by hand',
    greeting: 'HEY DEEPA!',
    subtitle: 'Someone special deserves a special day!',
    bigText: 'HAPPY BIRTHDAY',
    cta: 'OPEN YOUR SURPRISE',
    ctaOpened: 'KEEP EXPLORING',
    hint: 'tap the gift',
    surprise: 'SURPRISE DEEPA! THIS LITTLE UNIVERSE IS ALL YOURS!',
    surpriseSub: 'Four memories, one letter, a whole lot of magic. Take your time.',
    scrollCue: 'scroll for your memories',
  },

  /* ── Section 2 · The four photos ─────────────────────────────────────── */
  photos: {
    kicker: 'chapter one · the two of us',
    heading: 'FOUR PHOTOS, ENDLESS MEMORIES',
    sub: 'Four little windows into the chaos, the laughs and the days worth keeping.',
    items: [
      {
        src: 'photos/photo-1-placeholder.svg',
        caption: 'A beautiful moment',
        alt: 'A favourite photograph of Deepa',
        rotate: -6,
        offset: 0,
      },
      {
        src: 'photos/photo-2-placeholder.svg',
        caption: 'Little moments, big smiles',
        alt: 'Deepa smiling in a happy memory',
        rotate: 4,
        offset: 44,
      },
      {
        src: 'photos/photo-3-placeholder.svg',
        caption: 'Simply being YOU',
        alt: 'A photograph of Deepa being herself',
        rotate: -3,
        offset: 12,
      },
      {
        src: 'photos/photo-4-placeholder.svg',
        caption: 'Memories worth keeping',
        alt: 'A memory with Deepa worth keeping forever',
        rotate: 7,
        offset: 56,
      },
    ],
  },

  /* ── Section 3 · The letter ─────────────────────────────────────────── */
  letter: {
    kicker: 'chapter two · sealed with a heart',
    heading: 'A LITTLE SOMETHING FOR YOU',
    sub: 'Some things are better said on paper.',
    button: 'OPEN YOUR LETTER',
    closeButton: 'fold it back',
    salutation: 'Dear Deepa,',
    title: 'Happy Birthday!',
    paragraphs: [
      'Today is all about celebrating you. May your days be filled with happiness, laughter, exciting adventures and beautiful memories.',
      'Keep being the wonderful person you are. Keep smiling, keep dreaming and enjoy every little moment of life.',
      'Wishing you endless happiness and an amazing year ahead!',
    ],
    closing: 'Happy Birthday Once Again!',
    signature: 'Your Friend',
  },

  /* ── Section 4 · The playground ─────────────────────────────────────── */
  playground: {
    kicker: 'chapter three · play a little',
    heading: "LET'S CREATE SOME MAGIC!",
    sub: 'Make a wish, pop a balloon, collect a few surprises. No rules here.',
    wishButton: 'MAKE A WISH',
    wishAgain: 'RELIGHT THE CANDLES',
    wishTitle: 'Your wish is on its way!',
    wishText:
      'The candles are out, the universe is listening. Close your eyes for a second — it has already started working on it.',
    balloonsTitle: 'pop the balloons',
    balloonsSub: 'every one hides a tiny wish for you',
    popped: 'balloons popped',
    shuffleButton: 'GIVE ME A SURPRISE',
    surpriseTitle: 'A little something for you',
    balloons: [
      { color: 'pink', note: 'May your year be as bright as your smile.' },
      { color: 'lav', note: 'More laughs, less overthinking. Deal?' },
      { color: 'blue', note: 'Every dream of yours is worth chasing.' },
      { color: 'yellow', note: 'You make ordinary days feel like festivals.' },
      { color: 'peach', note: 'Here’s to adventures we haven’t planned yet.' },
      { color: 'pink', note: 'Stay exactly the way you are. It suits you.' },
    ],
    surprises: [
      'You are the friend who turns a boring Tuesday into a story worth telling.',
      'Some people walk into your life and quietly make everything better. That’s you.',
      'Wishing you a year of good news, full plates and zero cancelled plans.',
      'May every door you knock on this year open with a smile.',
      'You deserve flowers on ordinary days, not just birthdays.',
      'The world is softer, funnier and a lot louder with you in it.',
      'May your phone always have battery, your chai always be hot, and your luck always be ridiculous.',
    ],
  },

  /* ── Section 5 · The finale ─────────────────────────────────────────── */
  finale: {
    kicker: 'the last page · and the first of a new year',
    heading: 'DEEPA, YOU ARE ONE OF A KIND!',
    message:
      'May this new chapter bring you endless happiness, beautiful surprises and unforgettable memories.',
    bigText: 'HAPPY BIRTHDAY DEEPA!',
    button: 'REPLAY THE MAGIC',
    footnote: 'made with a ridiculous amount of love · for Deepa',
  },

  /* ── Little floating navigation ─────────────────────────────────────── */
  nav: [
    { id: 'surprise', label: 'Surprise' },
    { id: 'memories', label: 'Memories' },
    { id: 'letter', label: 'Letter' },
    { id: 'playground', label: 'Playground' },
    { id: 'finale', label: 'Finale' },
  ],
}

/** Resolves a photo path so it also works on GitHub Pages project URLs. */
export function resolveAsset(src) {
  if (!src) return ''
  if (/^(https?:|data:|blob:)/i.test(src)) return src
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`
}
