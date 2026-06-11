# OG Cycling Crew — Website

Static website for the **OG Cycling Crew (OCC)** — a women's road-cycling crew from
Freiburg im Breisgau. Built as plain HTML/CSS/JS with **no build step**, so it runs
directly on **GitHub Pages**.

Design is inspired by the clean, modern editorial look of cycling-team sites like
[equipe.cc](https://www.equipe.cc/), but uses OCC's own brand colours (the blue → teal →
green → lime gradient from the jerseys).

---

## 🚀 Quick start (local preview)

No tooling needed — just open `index.html` in a browser. For a more realistic preview
(fonts, relative paths) run any static server:

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000
```

---

## 🌐 Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then **Save**.
5. After a minute the site is live at
   `https://<your-user>.github.io/<repo-name>/`.

> The empty `.nojekyll` file tells GitHub Pages to serve files as-is (skip Jekyll
> processing). Keep it.

### Custom domain (optional)
Add a `CNAME` file containing your domain (e.g. `og-cycling-crew.de`) and configure the
DNS records as described in GitHub's docs.

---

## ✏️ How to fill in the placeholders

Everything is content-edited directly in **`index.html`** — search for the word
`PLACEHOLDER` to find spots that need your real content. Quick map:

| Section | What to replace |
|---|---|
| **Hero** | Headline, tagline, founding year, hero background image |
| **About** | Crew story, mission, the side photo & the "100%" badge |
| **Stats** | The four numbers (currently placeholder figures) |
| **Riders** | Real photos, names and roles for each crew member (duplicate a `.rider` block to add more) |
| **Calendar** | Real dates for rides, races, camps & trips |
| **Sponsors** | Replace text tiles with partner logos (drop files in `assets/img/`) |
| **Instagram** | Swap the 6 gallery images for your best posts and point each tile's `href` at the matching Instagram post |
| **Contact** | E-mail, Instagram handle, and the form endpoint (see below) |
| **Footer** | Impressum & Datenschutz links (legally required in Germany) |

### Images
Replace the placeholders in **`assets/img/`** with your own:
- `group-ride.png` → wide hero action shot
- `rider-1.jpg`, `rider-2.jpg` → crew portraits

Keep the same filenames (or update the `src` in `index.html`). Compress large photos
(e.g. with [squoosh.app](https://squoosh.app)) so the site stays fast.

### The Instagram "feed"
The Instagram section is a privacy-friendly gallery of **your own image files** that link
to Instagram — the same approach equipe.cc uses. It loads **no third-party scripts and
sets no cookies**, so it needs no DSGVO consent banner. To make it live-updating instead,
swap it for a widget (e.g. [Behold.so](https://behold.so), EU/GDPR-friendly, or SnapWidget)
— just paste their embed snippet into the `#instagram` section.

### The logo
The OCC mark is recreated as inline SVG (header) and `assets/logo.svg`. It's a clean
approximation of the Instagram logo — swap in your official vector file if you have one.

---

## 📨 Making the contact form work

GitHub Pages is **static only** — it can't process form submissions. Two options:

1. **Easiest:** delete the `<form>` and rely on the e-mail / Instagram links.
2. **Keep the form:** sign up for a free static-form service such as
   [Formspree](https://formspree.io) or [Getform](https://getform.io), then replace
   `action="https://formspree.io/f/your-id-here"` in `index.html` with your endpoint.

---

## 🎨 Brand colours

Defined as CSS variables at the top of `css/style.css`:

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#0f2e4a` | deep blue |
| `--blue` | `#1d6e9e` | ocean blue |
| `--teal` | `#1c8068` | jersey teal |
| `--green` | `#46a45a` | fresh green |
| `--lime` | `#e7e24a` | yellow accent |

The signature `--grad` gradient ties them together across buttons, headings and accents.

---

## 📁 Structure

```
occ-website/
├── index.html          # all content lives here
├── css/style.css       # all styling + brand tokens
├── js/main.js          # nav, scroll-reveal, active-link (vanilla, no deps)
├── assets/
│   ├── logo.svg        # OCC logo (SVG)
│   └── img/            # photos & sponsor logos (placeholders for now)
├── .nojekyll           # GitHub Pages: serve files as-is
└── README.md
```

> `reference_images/` holds the originals you supplied and is not used by the live site —
> you can delete it before publishing.
