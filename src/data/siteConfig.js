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
    { value: 5, suffix: '+' },
    { value: 5, suffix: '+' },
    { value: 2, suffix: '+' },
    { value: 2028, suffix: '' },
  ],
  // Contact details (email/phone are the same in both languages).
  contact: {
    email: 'your-email@example.com',
    phone: '+855 000 000 000',
  },
  // Links shown in the navbar, hero and footer.
  // Replace the example URLs below with your real profiles.
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/your-github-username',
      icon: 'bi-github',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      url: 'https://facebook.com/your-facebook-username',
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
  // PLACEHOLDERS — replace these with your real files/links
  // -----------------------------------------------------------
  cvUrl: '/files/NGUN_MAKARA_CV.pdf', // TODO: add your CV PDF to /public/files/ and keep this path
  githubProfileUrl: 'https://github.com/your-github-username', // TODO: replace (used by "GitHub" sections)
  profileImage: '/images/profile-placeholder.svg', // TODO: replace with your real photo in /public/images/
}