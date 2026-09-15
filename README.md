# Ngun Makara — Portfolio

A professional Junior Developer portfolio built with Vue 3.6, Vite and Bootstrap 5.

## Quick start

```sh
npm install
npm run dev
```

Open the URL shown in your terminal (usually http://localhost:5173).

## Tech stack

- **Vue 3.6** with Composition API
- **Vite 8**
- **Vue Router** (client-side routing)
- **Bootstrap 5** + **Bootstrap Icons**
- **AOS** (Animate On Scroll)
- **Custom CSS** design system
- **LocalStorage** for theme persistence

## Project structure

```
src/
├── assets/css/main.css          Design system, dark/light tokens, component styles
├── components/
│   ├── cards/                   Reusable cards: SkillCard, ProjectCard, etc.
│   ├── home/                    Home page sections
│   ├── layout/                  NavBar, Footer, Loader, ScrollProgress, BackToTop
│   └── ui/                      SectionTitle, PageHeader, SocialLinks
├── composables/
│   ├── useTheme.js              Dark/light mode toggle + localStorage
│   └── useTyping.js             Typing animation loop
├── data/
│   ├── siteConfig.js            All your personal information
│   ├── skills.js                Skills and categories
│   ├── projects.js              Projects list + helper functions
│   ├── certificates.js          Certificate entries
│   ├── testimonials.js          Testimonial entries (currently empty)
│   ├── experience.js            Timeline entries
│   ├── education.js             Education entries
│   └── services.js              Service offerings
├── router/index.js              Routes and SEO meta
├── views/                       One file per page (12 pages)
└── App.vue                      Root layout + page transitions
```

## How to replace placeholders

### 1. Personal information

Open **`src/data/siteConfig.js`** and replace every `TODO` or example value:

| Field | Where it appears |
|---|---|
| `contact.email` | Contact page |
| `contact.phone` | Contact page |
| `socials[].url` | Navbar, hero, footer, contact page |
| `githubProfileUrl` | GitHub section |
| `cvUrl` | "Download CV" buttons |
| `profileImage` | Hero section |

### 2. CV / Resume

Drop your PDF into `public/files/` and rename it to `NGUN_MAKARA_CV.pdf`, or update `cvUrl` in `siteConfig.js`.

### 3. Profile photo

Replace `public/images/profile-placeholder.svg` with your own photo. You can use any image format (JPG, PNG, WebP) — just update the path in `siteConfig.js`.

### 4. Projects

- Open **`src/data/projects.js`** and fill in your real project details.
- Drop screenshots in `public/images/projects/` and update the `image` and `screenshots` paths.
- Set `github` and `liveDemo` to real URLs, or leave them as `""` to hide the button.

### 5. Certificates

- Open **`src/data/certificates.js`** and add your real certificates.
- Put the images in `public/images/certificates/` and update the `image` path.

### 6. Testimonials

When you receive a real testimonial, add an object to **`src/data/testimonials.js`**:

```js
{
  id: 1,
  name: 'Person Name',
  role: 'Their role',
  text: 'What they said about you.',
  avatar: '/images/avatars/person.jpg',
}
```

### 7. Skills

Adjust the `level` percentages and details in **`src/data/skills.js`** to match your real abilities. Be honest — realistic numbers build trust.

### 8. Experience / Education

Update **`src/data/experience.js`** and **`src/data/education.js`** with your real entries. No fake companies should be listed.

## Available commands

```sh
npm run dev      Start the development server
npm run build    Build for production (output in dist/)
npm run preview  Preview the production build locally
```

## Dark / light mode

Click the sun/moon icon in the navbar. The choice is saved in `localStorage` and restored on return visits.

## Responsive breakpoints tested

- 320px
- 375px
- 768px
- 1024px
- 1440px

## License

This project is yours. Use and modify freely.