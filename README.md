# Appsware Technologies — Website

A fully responsive multi-page website built with vanilla HTML, CSS and JavaScript.
Open `index.html` in your browser (or run a local server) to preview.

---

## 📁 Project structure

```
/
├── index.html        ← Home page (with loader & full hero)
├── about.html        ← About / mission / stats
├── team.html         ← Team grid (red-border hover)
├── apps.html         ← App portfolio
├── blog.html         ← Articles list
├── contact.html      ← Contact form + UAE details
├── styles.css        ← Shared stylesheet
├── script.js         ← Shared JavaScript
└── assets/           ← Drop your logo + favicon files here
    ├── logo.png
    ├── favicon.ico
    ├── favicon.png
    └── apple-touch-icon.png
```

---

## 🖼️  Logo & favicon — file sizes

Drop these files into the `assets/` folder. The HTML already points to them; you don't need to edit any code.

| File | Size (px) | Format | Purpose |
|------|-----------|--------|---------|
| `assets/logo.png` | **240 × 60** (4:1 ratio recommended; max 40px tall in navbar) | PNG with transparent background | Main logo shown in the navbar on every page |
| `assets/favicon.ico` | **32 × 32** (multi-size .ico containing 16×16, 32×32, 48×48) | ICO | Browser tab icon (legacy) |
| `assets/favicon.png` | **192 × 192** | PNG, transparent | Modern browser tab icon |
| `assets/apple-touch-icon.png` | **180 × 180** | PNG, no transparency, square | iOS home-screen icon |

> If `assets/logo.png` is missing, the navbar automatically falls back to a styled red "A" mark + "Appsware Technologies" text — so the site never breaks.

---

## 🎨 Brand colors

- **Primary red:** `#FF0000` (solid)
- **Dark red (hover):** `#CC0000`
- **Soft red tint:** `#FFE5E5`
- **Ink (text):** `#111111`
- **Background:** `#FFFFFF`

All defined as CSS variables at the top of `styles.css`.

---

## ✨ Animations included

- Custom red-trail mouse cursor (desktop only)
- Loader with spinning logo (home page only)
- Typewriter hero text with rotating phrases
- Scroll-reveal animations (fade + slide)
- Animated number counters on stats
- Parallax hero background & floating orbs
- Hover lift / shimmer / underline effects
- Marquee logo strip
- Smooth page transitions & focus states

---

## 🚀 Run locally

Just open `index.html` in your browser, or for best results run a tiny local server:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then visit http://localhost:8000

---

## 📞 Contact details

- **Email:** info@appsware.ae
- **Phone:** +971 50 123 4567
- **Office:** Dubai, United Arab Emirates
