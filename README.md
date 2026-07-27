# KNF — Formula Student

Website for **KNF**, a student physics society building its first Formula Student car.
Static, bilingual (Polish / English), light & dark themes, no build step.

**Live site:** https://alexander-288.github.io/knfW/

---

## Tech

Plain **HTML + CSS + JavaScript** — no framework, no bundler, nothing to compile.
Everything ships exactly as written.

- **Themes** — light / dark toggle, choice persisted in `localStorage`
- **i18n** — Polish / English toggle via `data-pl` / `data-en` attributes
- **Accessibility** — semantic markup, skip links, keyboard-navigable controls
- **Machine-readable** — JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt`
- **Images** — WebP renders; hero blueprint is an optimized SVG

## Project structure

```
.
├── .github/workflows/pages.yml   # CI — publishes src/ to GitHub Pages
├── src/                          # the website (served as the site root)
│   ├── index.html                # home
│   ├── gallery.html              # photo gallery
│   ├── formula-student.html      # the project / car
│   ├── contact.html              # contact + partners
│   ├── css/style.css
│   ├── js/main.js                # theme, language, UI behaviour
│   ├── assets/                   # WebP images + hero blueprint SVG
│   ├── favicon.svg
│   ├── robots.txt · sitemap.xml · llms.txt
│   └── .nojekyll
├── .gitignore
└── README.md
```

## Run locally

No dependencies — just serve the `src/` folder:

```bash
cd src
python -m http.server 8000
# open http://localhost:8000
```

## Deployment

Pushing to `master` triggers **`.github/workflows/pages.yml`**, which publishes the
`src/` folder as the site root via GitHub Pages.

To enable it once: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Usage

Source code is public for reference. Team photos, renders, branding, and copy are
© KNF and not licensed for reuse.
