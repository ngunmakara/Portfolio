// ============================================================
// EXPERIENCE DATA — used by ExperienceView (vertical timeline)
// ============================================================
// IMPORTANT: this page must NOT contain fake companies or fake
// employment. Only list real experiences: university projects,
// personal projects and any real internship you get.
//
// This file keeps only non-translated values (id, icon, type,
// tags, featured flag). All human-readable text including the
// period label is stored in src/locales/en.js and km.js under
// experience.items.<id> and merged at render time.
//
// If you later complete a real internship, add it at the top of
// this array with the real company name.
// ============================================================

export const experience = [
  {
    id: 1,
    icon: 'bi-briefcase',
    type: 'internship',
    tags: ['Frontend', 'Internship', 'Looking'],
    featured: true,
  },
  {
    id: 2,
    icon: 'bi-mortarboard',
    type: 'academic',
    tags: ['Vue', 'Spring Boot', 'MySQL'],
  },
  {
    id: 3,
    icon: 'bi-laptop',
    type: 'personal',
    tags: ['JavaScript', 'Vue', 'GitHub'],
  },
  {
    id: 4,
    icon: 'bi-code-slash',
    type: 'web',
    tags: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
]