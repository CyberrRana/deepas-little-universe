# DEEPA'S LITTLE UNIVERSE

> **A Little World Made Just For You!**

A premium, fully interactive birthday surprise — built as a hand-crafted digital gift. Soft 3D claymorphism, pastel Y2K dreamscape, a box that actually opens, four polaroid memories, a sealed letter and a playground full of balloons.

Built with **React + Vite + Tailwind CSS + Framer Motion + Lucide**, deployed to **GitHub Pages** with GitHub Actions.

---

## ✨ The five chapters

| # | Section | What happens |
|---|---------|--------------|
| 1 | **The Grand Surprise** | Oversized 3D clay gift box with a lift-off lid, confetti + star burst, and the big reveal message. |
| 2 | **Four Photos, Endless Memories** | Exactly **four** portrait Polaroids (3:4), staggered and tilted, with hover lift and a full-screen viewer (arrows, Esc, captions). |
| 3 | **A Little Letter** | A clay envelope with a wax heart seal. The flap opens, the letter unfolds, and the message appears on elegant paper. |
| 4 | **The Birthday Playground** | Three-tier 3D cake with animated candles, **MAKE A WISH** (blow out the candles → confetti), six pop-able balloons that burst into particles, and a random surprise machine. |
| 5 | **The Grand Finale** | A twilight sky with fireworks, the giant cake, glowing 3D type and **REPLAY THE MAGIC**, which returns to the very beginning. |

Everything is touch-friendly, respects `prefers-reduced-motion`, and works without a backend, login or build-time secrets.

---

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Open the local address Vite prints (default `http://localhost:3000`).

```bash
npm run build     # production build into dist/
npm run preview   # preview the production build
```

Requires Node 20+ (the GitHub workflow uses Node 22).

---

## 📸 Add your four photographs (the one important step)

The gallery ships with four **decorative placeholder illustrations** so nothing is ever broken. Swap in the real photos like this:

1. Drop your images in **`public/photos/`** — portrait crops, roughly **3:4** (e.g. `900 × 1200`), `.jpg` or `.webp`:
   ```
   public/photos/photo-1.jpg
   public/photos/photo-2.jpg
   public/photos/photo-3.jpg
   public/photos/photo-4.jpg
   ```
2. Open **`src/config/site.js`** and point each item at its file:

   ```js
   items: [
     { src: 'photos/photo-1.jpg', caption: 'A beautiful moment',          alt: '…', rotate: -6, offset: 0  },
     { src: 'photos/photo-2.jpg', caption: 'Little moments, big smiles',  alt: '…', rotate: 4,  offset: 44 },
     { src: 'photos/photo-3.jpg', caption: 'Simply being YOU',            alt: '…', rotate: -3, offset: 12 },
     { src: 'photos/photo-4.jpg', caption: 'Memories worth keeping',      alt: '…', rotate: 7,  offset: 56 },
   ]
   ```

A full `https://…` URL also works for any photo (handy for images hosted elsewhere). Keep **exactly four** items — the gallery layout is designed around four.

If an image is missing or fails to load, a soft illustrated fallback appears instead of a broken image. Tip: keep each photo under ~400 KB for a fast first load.

---

## ✏️ Edit everything else

Every word, caption and surprise lives in one file: **`src/config/site.js`**.

- `name`, `title`, `tagline`
- `hero` — greeting, subtitle, CTA labels, reveal message
- `photos.items` — the four image URLs and captions
- `letter` — salutation, paragraphs, closing, signature
- `playground` — wish copy, balloon notes, random surprise messages
- `finale` — closing heading, message, replay label
- `nav` — the floating section dots

No component edits needed for content changes.

---

## 🌍 Deploy to GitHub Pages

The repo includes a ready workflow at **`.github/workflows/deploy.yml`**.

1. Create a repository on GitHub and push this project to the `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push (or run the **Deploy to GitHub Pages** workflow manually from the Actions tab).

Your site will be live at `https://<username>.github.io/<repository>/`.

`vite.config.js` uses `base: './'`, so assets resolve correctly both at a domain root and inside a `/repository/` sub-path — no extra configuration.

> Photos are referenced relatively too, so they work on GitHub Pages without changes.

---

## 🧱 Project structure

```
.
├── .github/workflows/deploy.yml   # Pages build + deploy
├── public/
│   ├── favicon.svg
│   └── photos/                    # four photos + graceful fallback art
├── src/
│   ├── components/
│   │   ├── Cake.jsx               # 3D cake, candles, smoke
│   │   ├── ClayButton.jsx
│   │   ├── ConfettiCanvas.jsx
│   │   ├── Decor.jsx              # balloons, clouds, sparkles, ribbons
│   │   ├── GiftBox.jsx            # CSS 3D gift + opening animation
│   │   ├── Lightbox.jsx           # full-screen photo viewer
│   │   ├── NavDots.jsx
│   │   ├── Photo.jsx              # image + fallback handling
│   │   ├── ScrollProgress.jsx
│   │   └── SectionHeading.jsx
│   ├── config/site.js             # ← all content lives here
│   ├── lib/
│   │   ├── confetti.js            # dependency-free particle engine
│   │   └── useBodyLock.js
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Memories.jsx
│   │   ├── Letter.jsx
│   │   ├── Playground.jsx
│   │   └── Finale.jsx
│   ├── App.jsx
│   ├── index.css                  # clay design system + 3D scene styles
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🎨 Design notes

- **Palette:** lavender, baby pink, pastel blue, butter yellow, peach, creamy white.
- **Claymorphism:** layered inset highlights and long, soft shadows on every card, button and object.
- **3D:** the gift box and its lid are real CSS 3D (six faces, `preserve-3d`, perspective); the cake and balloons are sculpted with gradients, ellipses and shadows.
- **Type:** Baloo 2 (display), Outfit (body), Caveat (handwriting), Playfair Display (letter).
- **Motion:** Framer Motion for entrances and reveals; a custom canvas particle engine for confetti, balloon bursts and fireworks. All animation loops stop when empty, and the canvas is capped and DPR-aware.
- **Accessibility:** semantic sections and headings, labelled buttons, keyboard support in the lightbox (`←`, `→`, `Esc`), visible focus rings, a skip link, and a reduced-motion mode that disables confetti and long animations.

---

## 💛 Made for Deepa

Friendship, laughter and a little bit of magic. Happy birthday.
