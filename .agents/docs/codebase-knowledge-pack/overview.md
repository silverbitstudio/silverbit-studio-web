# Silverbit Studio Landing Page - Codebase Knowledge Pack

## Overview
This is the static landing page for **Silverbit Studio**, an independent development studio creating friendly mini-apps and casual games, prominently featuring **Hidden Mind**.
The project is a lightweight, highly-optimized static HTML website with Tailwind CSS (compiled to a static file) for styling and minimal vanilla JavaScript for interaction. It features localization support (English and Vietnamese). The deployable site lives under `public/`; the repository root is kept for tooling, scripts, configuration, and documentation.

## Tech Stack
- **HTML5**: Semantic and accessible HTML structure.
- **Tailwind CSS (CLI build)**: Utility-first CSS compiled with the Tailwind v3 CLI; configuration in `tailwind.config.js`, with **Forms** and **Container Queries** official plugins. Pages load `assets/css/tailwind.build.css` from the published site, backed by `public/assets/css/tailwind.build.css` in the repo (run `npm run build:css` after template or config changes).
- **Vanilla JavaScript**: Minimal JS (`public/assets/js/site.js`, served as `assets/js/site.js`) used mainly for mobile navigation toggles and basic UX helpers.
- **Google Fonts & Icons**: Uses *Plus Jakarta Sans*, *Be Vietnam Pro*, and *Material Symbols Outlined*.
- **Custom CSS**: `public/assets/css/site.css` for rules Tailwind does not express (e.g., glassmorphism nav, gradients, nav-toggle alignment).
- **SEO & Meta**: Complete meta tags, Open Graph tags, JSON-LD structured data (Organization, WebSite, SoftwareApplication) and localized alternate links (`hreflang`).

## Key Products
- **Hidden Mind**: A casual puzzle game highlighted across the site with dedicated product and privacy policy pages.
