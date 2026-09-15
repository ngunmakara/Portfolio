// ============================================================
// PROJECTS DATA — used by ProjectsView, ProjectDetails and the
// home "Featured Projects" section.
// ============================================================
// This file keeps only non-translated values: slugs, category
// ids, tags, images and URLs.
// All human-readable text (title, description, features, …) is
// stored in src/locales/en.js and src/locales/km.js under
// projects.items.<slug> and merged at render time.
//
// - "image" uses /images/projects/*.svg placeholders
//   -> replace with real screenshots in /public/images/projects/
// - "github" and "liveDemo" : set to "" (empty string) if you do
//   not have one yet. The button is hidden automatically.
// - "category" ids must match the keys in projects.categories
//   inside the locale files. "all" is reserved for the filter.
// ============================================================

export const projectCategories = ['all', 'frontend', 'vue', 'backend', 'java', 'springboot']

export const projects = [
  {
    id: 1,
    slug: 'food-express',
    category: ['vue', 'frontend'],
    tags: ['Vue 3', 'Bootstrap 5', 'Vue Router', 'JavaScript'],
    image: '/images/projects/food-express.svg',
    github: 'https://github.com/ngunmakara/Food-Express.git', // TODO: replace link
    liveDemo: '', // TODO: add your live demo link, e.g. "https://food-express.vercel.app"
    screenshots: ['/images/projects/food-express.svg', '/images/projects/food-express.svg'],
  },
  {
    id: 2,
    slug: 'trip-vol-vol',
    category: ['vue', 'frontend'],
    tags: ['Vue 3', 'Bootstrap 5', 'Vue Router', 'JavaScript'],
    image: '/images/projects/trip-vol-vol.svg',
    github: 'https://github.com/ngunmakara/Trip-vol-vol-Spring-Boot.git', // TODO: add your GitHub URL
    liveDemo: '', // TODO: add your live demo link
    screenshots: ['/images/projects/trip-vol-vol.svg'],
  },
  {
    id: 3,
    slug: 'restaurant-management-system',
    category: ['vue', 'springboot', 'backend'],
    tags: ['Vue 3', 'Spring Boot', 'MySQL', 'REST API', 'Postman'],
    image: '/images/projects/restaurant-management-system.svg',
    github: 'https://github.com/NalenSrin123/G2_2_Sun_MPOS_front.git', // TODO: replace link
    liveDemo: '', // TODO: add your live demo link
    screenshots: ['/images/projects/restaurant-management-system.svg'],
  },
  {
    id: 4,
    slug: 'raz-mobile',
    category: ['frontend'],
    tags: ['HTML', 'CSS', 'Bootstrap 5', 'JavaScript'],
    image: '/images/projects/raz-mobile.svg',
    github: 'https://github.com/ngunmakara/flagship-phone-store.git', // TODO: add your GitHub URL
    liveDemo: '', // TODO: add your live demo link
    screenshots: ['/images/projects/raz-mobile.svg'],
  },
  {
    id: 5,
    slug: 'employee-management-api',
    category: ['backend', 'java', 'springboot'],
    tags: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Postman', 'Swagger'],
    image: '/images/projects/employee-management-api.svg',
    github: 'https://github.com/ngunmakara/Library-Book-Management.git', // TODO: replace link
    liveDemo: '', // no live demo — it is an API, not a website
    screenshots: ['/images/projects/employee-management-api.svg'],
  },
]

// Helper used by ProjectDetails: find a project by its slug.
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}