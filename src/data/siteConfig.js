// ============================================================
// SITE CONFIG — NON-TRANSLATED PERSONAL DATA
// ============================================================
// Only values that are identical in every language live here
// (URLs, icons, numbers, brand names). All human-readable text
// (name, role, biography, …) is stored in src/locales/en.js and
// src/locales/km.js and translated via Vue I18n.
// ============================================================

export const siteConfig = {
  // Used for the browser title fallback (see src/router/index.js).
  name: 'Ngun Makara',
  expectedGraduation: 2028,
  // Numbers shown in the home stats. Labels come from the locales.
  stats: [
    { value: 10, suffix: '+' },
    { value: 5, suffix: '+' },
    { value: 5, suffix: '+' },
    { value: 2028, suffix: '' },
  ],
  // Contact details (email/phone are the same in both languages).
  contact: {
    email: 'ngunmakara009@gmail.com',
    phone: '+855 866 772 12',
  },
  // Links shown in the navbar, hero and footer.
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/ngunmakara',
      icon: 'bi-github',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      url: 'https://web.facebook.com/RazJay009',
      icon: 'bi-facebook',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/your-linkedin-username',
      icon: 'bi-linkedin',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      url: 'https://www.tiktok.com/@your-tiktok-username',
      icon: 'bi-tiktok',
    },
  ],
  // -----------------------------------------------------------
  // ASSET PATHS (pointing to the public folder)
  // -----------------------------------------------------------
  cvUrl: '/ngun-makara-cv.pdf', // Your CV PDF in public folder
  githubProfileUrl: 'https://github.com/ngunmakara', // Used by GitHub sections
  profileImage: '/images/ngun-makara.jpg', // Your profile photo in public/images folder
}