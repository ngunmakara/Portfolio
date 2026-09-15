// ============================================================
// PROJECTS DATA — used by ProjectsView, ProjectDetails and the
// home "Featured Projects" section.
// ============================================================
// - "image" uses /images/projects/*.svg placeholders
//   -> replace with real screenshots in /public/images/projects/
// - "github" and "liveDemo" : set to "" (empty string) if you do
//   not have one yet. The button is hidden automatically.
// - "category" values must match the filter list on ProjectsView.
// ============================================================

export const projectCategories = [
  'All',
  'Frontend',
  'Vue',
  'Backend',
  'Java',
  'Spring Boot',
]

export const projects = [
  {
    id: 1,
    slug: 'food-express',
    title: 'Food Express',
    category: ['Vue', 'Frontend'],
    shortDescription:
      'Responsive food delivery landing page and browsing interface built with Vue 3 and Bootstrap 5.',
    overview:
      'Food Express is a frontend prototype of a food delivery service. It displays restaurants, food categories and menus with a clean card-based interface, a working search box and a cart. Everything is client-side and uses mock data, so it is a great example of my UI and Vue skills.',
    tags: ['Vue 3', 'Bootstrap 5', 'Vue Router', 'JavaScript'],
    image: '/images/projects/food-express.svg',
    github: 'https://github.com/your-github-username/food-express', // TODO: replace link
    liveDemo: '', // TODO: add your live demo link, e.g. "https://food-express.vercel.app"
    features: [
      'Landing page with hero, food categories and featured restaurants',
      'Restaurant menu pages loaded from local mock data',
      'Interactive search and category filtering',
      'Simple cart with item counts and totals (client-side)',
      'Fully responsive layout for mobile and desktop',
    ],
    challenges:
      'Keeping the menu data organised across multiple components was tricky. I solved it by moving all data into a single mock-data file and passing only the needed props to child components.',
    lessons:
      'I learned how components communicate in Vue, how routing works with dynamic URLs, and how to structure a small project so it stays easy to extend.',
    screenshots: ['/images/projects/food-express.svg', '/images/projects/food-express.svg'],
  },
  {
    id: 2,
    slug: 'trip-vol-vol',
    title: 'Trip Vol Vol',
    category: ['Vue', 'Frontend'],
    shortDescription:
      'Travel booking interface for browsing destinations and packages, built as a Vue SPA.',
    overview:
      'Trip Vol Vol is a travel UI prototype where visitors can explore destinations, view package details and filter trips by price and category. It demonstrates how I build multi-page frontends with routing, state and reusable card components.',
    tags: ['Vue 3', 'Bootstrap 5', 'Vue Router', 'JavaScript'],
    image: '/images/projects/trip-vol-vol.svg',
    github: '', // TODO: add your GitHub URL
    liveDemo: '', // TODO: add your live demo link
    features: [
      'Destination gallery with package cards',
      'Filter trips by destination type and price range',
      'Detail pages for each package',
      'Responsive, mobile-first design',
    ],
    challenges:
      'Implementing the price filtering without a backend taught me to keep the UI in sync with computed properties in Vue.',
    lessons:
      'Computed properties and reactive arrays make client-side filtering clean and fast. I also practised designing a consistent card component reused across the whole app.',
    screenshots: ['/images/projects/trip-vol-vol.svg'],
  },
  {
    id: 3,
    slug: 'restaurant-management-system',
    title: 'Restaurant Management System',
    category: ['Vue', 'Spring Boot', 'Backend'],
    shortDescription:
      'Full-stack CRUD application: Vue 3 frontend talking to a Spring Boot REST API with MySQL.',
    overview:
      'A restaurant management system for managing menu items and orders. The frontend is a Vue 3 SPA, the backend is a Spring Boot REST API and data is stored in MySQL via XAMPP. This is my main full-stack learning project.',
    tags: ['Vue 3', 'Spring Boot', 'MySQL', 'REST API', 'Postman'],
    image: '/images/projects/restaurant-management-system.svg',
    github: 'https://github.com/your-github-username/restaurant-management-system', // TODO: replace link
    liveDemo: '', // TODO: add your live demo link
    features: [
      'Add, edit, delete and list menu items (full CRUD)',
      'Vue 3 frontend consuming a Spring Boot REST API',
      'MySQL database configured with XAMPP',
      'API documented and tested with Postman/Swagger',
    ],
    challenges:
      'Connecting two separate projects (frontend and backend) and dealing with CORS errors was the hardest part. I learned how the browser, API and database interact as one system.',
    lessons:
      'I understand HTTP methods and status codes much better now, and I can debug API calls step by step from frontend to database.',
    screenshots: ['/images/projects/restaurant-management-system.svg'],
  },
  {
    id: 4,
    slug: 'raz-mobile',
    title: 'Raz Mobile',
    category: ['Frontend'],
    shortDescription:
      'Responsive product showcase website for mobile phones with grid layout and product modals.',
    overview:
      'Raz Mobile is a static product showcase site for mobile phones. It focuses on design: a modern hero, a responsive product grid, filtering and product quick-view modals — all with pure CSS/Bootstrap and a little JavaScript.',
    tags: ['HTML', 'CSS', 'Bootstrap 5', 'JavaScript'],
    image: '/images/projects/raz-mobile.svg',
    github: '', // TODO: add your GitHub URL
    liveDemo: '', // TODO: add your live demo link
    features: [
      'Product grid that adapts from 1 column (mobile) to 4 (desktop)',
      'Category filter with vanilla JavaScript',
      'Product quick-view modal',
      'Clean, branded visual design',
    ],
    challenges:
      'This project taught me to plan a layout before writing code and to re-use utility classes instead of repeating CSS.',
    lessons:
      'Responsive grids, realistic CSS practice, and keeping JavaScript small and readable.',
    screenshots: ['/images/projects/raz-mobile.svg'],
  },
  {
    id: 5,
    slug: 'employee-management-api',
    title: 'Employee Management API',
    category: ['Backend', 'Java', 'Spring Boot'],
    shortDescription:
      'REST API built with Spring Boot and MySQL for managing employee records.',
    overview:
      'A backend-only project: a Spring Boot REST API that lets clients create, read, update and delete employee records. It stores data in MySQL and is tested with Postman, with Swagger docs exposed in the development environment.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Postman', 'Swagger'],
    image: '/images/projects/employee-management-api.svg',
    github: 'https://github.com/your-github-username/employee-management-api', // TODO: replace link
    liveDemo: '', // no live demo — it is an API, not a website
    features: [
      'REST endpoints for employee CRUD operations',
      'MySQL database with JPA repositories',
      'Validation on request bodies',
      'Swagger UI for API documentation during development',
    ],
    challenges:
      'Understanding JPA entity mapping and handling database connection configuration with XAMPP took time. Reading Spring Boot logs helped me fix errors one by one.',
    lessons:
      'I learned to design clean endpoints, separate layers (controller, service, repository) and test an API properly with Postman.',
    screenshots: ['/images/projects/employee-management-api.svg'],
  },
]

// Helper used by ProjectDetails: find a project by its slug.
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}