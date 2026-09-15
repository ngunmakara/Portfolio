# AGENTS.md

Guidance for AI agents working in this repository. This is a Vue 3 portfolio website for Ngun Makara.

## Commands

```sh
npm run dev       # Start Vite dev server (fast HMR)
npm run build     # Production build (output in dist/)
npm run preview   # Preview the production build locally
```

There is no lint, typecheck, or test command — `npm run build` is the verification step. Run it after making changes.

## Tech stack

- **Vue 3** (Composition API, `<script setup>`) — no TypeScript, plain JS
- **Vite 8** — build tool, `@` alias maps to `./src` (see `vite.config.js` and `jsconfig.json`)
- **Vue Router 4** — lazy-loaded routes (see `src/router/index.js`)
- **Vue I18n 9** — English (`en`) and Khmer (`km`), `legacy: false`
- **Bootstrap 5** + **Bootstrap Icons** — base UI; overridden by a custom design system
- **AOS** — scroll animations, initialized once in `main.js`
- **Node** `^22.18.0 || >=24.12.0`

## Architecture

- `src/data/*.js` — non-translated content (slugs, images, URLs, levels, icons). Edit `siteConfig.js` for personal info.
- `src/locales/en.js` / `src/locales/km.js` — ALL human-readable text lives here as nested message objects keyed by id. `/static/img` style not used. Text is never hard-coded in components or data files.
- Components look up translated text at render time — e.g. data gives `id: 'html'`, the component renders `t('skills.categories.frontend.skills.html.detail')`.
- `src/composables/` — `useTheme.js` (dark/light, `localStorage` key `portfolio-theme`), `useLanguage.js` (en/km, key `language`), `useTyping.js` (hero typing loop).
- `src/utils/highlight.js` — XSS-safe `highlightTitle(text, highlight)` helper: escapes plain text and wraps the first occurrence of `highlight` in the gradient span (`SectionTitle`/`PageHeader` `highlight` prop).
- `src/views/` — one file per route (11 views + 404). `src/components/` — `cards/` (reusable cards), `home/` (home page sections), `layout/` (NavBar, Footer, Loader, ScrollProgress, BackToTop), `ui/` (PageHeader, SectionTitle, SocialLinks).
- `src/assets/css/main.css` — design system: CSS tokens, dark/light theme, Bootstrap overrides. Imported AFTER Bootstrap in `main.js` so it can override tokens. This file carries most visual styles.

## Conventions

- Import with the `@` alias: `import Foo from '@/components/...'`. Always import JS files with their `.js` extension; components with `.vue`.
- Use `<script setup>` + Composition API for every component.
- `v-for` blocks always need a `:key`. Route-triggered rerenders use `:key="route.fullPath"` (see `App.vue`).
- Cross-component shared state lives in module-level `ref`s inside composables, persisted via `localStorage`, applied before mount to avoid flashes (see `useTheme.js` / `useLanguage.js`).
- Theming is Bootstrap 5 native: set `data-bs-theme` on `<html>` (via `useTheme`). Custom tokens in `:root` and `[data-bs-theme='dark']` re-declare Bootstrap vars like `--bs-body-bg`.
- AOS animations: elements use `data-aos` attributes. After DOM re-renders (navigation or locale change), call `AOS.refreshHard()` — see `router.afterEach` in `main.js` and the locale watcher in `App.vue`.
- Routes define SEO title + description in `meta`; the global `afterEach` guard writes them to the document. Add a `meta` block to any new route.

## Translation / i18n

- Adding a language requires a new `src/locales/<code>.js` with the SAME shape as `en.js`, plus registration in `src/main.js` and in `SUPPORTED` in `src/composables/useLanguage.js`.
- When a key is missing, i18n falls back to `en` — keep `en.js` complete.
- Messages are PLAIN TEXT — never put HTML in locale values (avoids XSS). `useI18n()` provides two lookups: use `t()` for leaf strings, and `tm()` for structured messages (arrays/objects) — `t()` on an object/array key fails with "Not found" errors. All structured data reads happen inside `computed(() => tm(...))`.
- Gradient titles are split into a plain-text title + highlight: `<section>.title` holds the full text and `<section>.titleHighlight` holds the exact substring to paint. Render via `highlightTitle()` (see `src/utils/highlight.js`), not `v-html` on a message. `SectionTitle` and `PageHeader` accept a `highlight` prop; standalone headings use a computed that calls `highlightTitle`.

## Content editing (most common task)

1. Personal details, socials, CV, photo: `src/data/siteConfig.js`
2. Projects: `src/data/projects.js` (structural) + `projects.items.<slug>` in both locale files (text)
3. Skills/levels: `src/data/skills.js` + `skills.categories` in locales (labels/details)
4. Certificates: `src/data/certificates.js` + `certificates.items` in locales
5. Experience/Education/Services/Testimonials: `src/data/*.js` + matching locale keys
6. When adding or editing a section with a gradient title, add/update BOTH `<section>.title` and `<section>.titleHighlight` in each locale file (and pass `:highlight` in the component).
7. Placeholder repo links / image paths still contain `TODO` comments and `your-...-username` values — read the file header comments before editing.

## Placeholders to be aware of

`siteConfig.js` contains placeholder values (email, phone, social URLs, `githubProfileUrl`, `cvUrl`, `profileImage`) with `TODO:` comments — the project is personalized as the owner fills them in. Assets live in `/public/images/...`.

## Notes

- Response styling for mobile/desktop via Bootstrap + main.css; tested breakpoints 320 / 375 / 768 / 1024 / 1440px.
- Node version enforced by `package.json` `engines`.