# Architecture & Patterns

## Localization Approach
The site implements a simple directory-based localization strategy:
- The publish root is `public/`, which is uploaded to GitHub Pages. URLs are therefore rooted at the contents of `public/`, not at the repository root.
- English (default) pages are located at `public/index.html` and within `public/en/`.
- Vietnamese pages are located within `public/vi/`.
- Cross-linking uses standard `<a hreflang="vi">` and the language switcher is built into the navigation bar of each page.
- Pages include `<link rel="alternate" hreflang="...">` tags in the `<head>` for SEO purposes, pointing to the respective localized versions.

## Styling Architecture
- **Tailwind CSS (production build)**: Tailwind is **not** loaded from `cdn.tailwindcss.com`. Source entry is `public/assets/css/tailwind.source.css` (`@tailwind` layers), served publicly as `assets/css/tailwind.source.css` only if requested directly. Configuration (custom colors, fonts, border radii, Material Design 3-style palette) lives in **`tailwind.config.js` at the repo root**, with **`@tailwindcss/forms`** and **`@tailwindcss/container-queries`**. The Tailwind `content` scan targets `./public/**/*.html`. Run **`npm run build:css`** to emit the minified **`public/assets/css/tailwind.build.css`**, which pages link as `assets/css/tailwind.build.css` in `<head>` before Google Fonts and **`assets/css/site.css`**. Regenerate that file after changing HTML class names or `tailwind.config.js`, then commit the updated bundle for GitHub Pages (no Node required at deploy time if the bundle is committed).
- **CSS Overrides**: `public/assets/css/site.css` contains custom rules and classes (e.g., `.glass-nav`, `.btn-gradient`, `.asymmetric-gradient`, mobile nav toggle helpers) that sit on top of the compiled Tailwind layer.
- **Dark Mode**: Configured with `darkMode: 'class'` in `tailwind.config.js`, though `class="light"` is often forced on the `<html>` tag currently.

## Javascript Architecture
- **Minimal dependency**: No frontend frameworks (React, Vue, etc.). The only Node-based step is optional local use of **npm** to compile Tailwind; the shipped site is plain static HTML/CSS/JS.
- **Component Interactivity**: Interactivity (like the mobile navigation menu toggle) is handled by a small IIFE (Immediately Invoked Function Expression) script in `public/assets/js/site.js`, linked by pages as `assets/js/site.js`. It looks for `data-nav-toggle` attributes and toggles the `hidden` class on the target element defined in `aria-controls`. This pattern ensures clean global scope and declarative HTML bindings.

## Deployment Architecture
- GitHub Pages deployment is handled by `.github/workflows/static.yml`.
- The workflow validates `public/` and `public/index.html`, then uploads `public/` with `actions/upload-pages-artifact`. Files outside `public/` are not part of the deployed artifact unless a build step copies them there.
- Root-level files such as `package.json`, `tailwind.config.js`, `scripts/`, and `.agents/` are source/tooling only.
