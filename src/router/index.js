// ============================================================
// VUE ROUTER — page routes + SEO titles
// ============================================================
// Lazy loading: each page is compiled in its own tiny file and
// only downloaded when the user visits it.
// ============================================================

import { createRouter, createWebHistory } from 'vue-router'
import { siteConfig } from '@/data/siteConfig'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home',
      description:
        'Portfolio of Ngun Makara — Junior Frontend Developer and IT student at RUPP, building modern web applications with Vue 3.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About Me',
      description: 'Learn about Ngun Makara: developer journey, career goals, current learning and future goals.',
    },
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('@/views/SkillsView.vue'),
    meta: {
      title: 'Skills',
      description: 'Frontend, backend, database and tools skills of Ngun Makara with honest skill levels.',
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: {
      title: 'Projects',
      description: 'Projects built by Ngun Makara: Food Express, Trip Vol Vol, Restaurant Management System, Raz Mobile and an Employee Management API.',
    },
  },
  {
    path: '/projects/:slug',
    name: 'project-details',
    component: () => import('@/views/ProjectDetailsView.vue'),
    meta: {
      title: 'Project Details',
      description: 'Detailed look at one of Ngun Makara\'s projects — features, technologies, challenges and lessons learned.',
    },
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('@/views/ExperienceView.vue'),
    meta: {
      title: 'Experience',
      description: 'The real professional journey of Ngun Makara — academic projects, personal projects and web development experience.',
    },
  },
  {
    path: '/education',
    name: 'education',
    component: () => import('@/views/EducationView.vue'),
    meta: {
      title: 'Education',
      description: 'Information Technology degree at the Royal University of Phnom Penh (RUPP), expected graduation 2028.',
    },
  },
  {
    path: '/certificates',
    name: 'certificates',
    component: () => import('@/views/CertificatesView.vue'),
    meta: {
      title: 'Certificates',
      description: 'Certificates earned by Ngun Makara during his learning journey.',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: {
      title: 'Services',
      description: 'Services offered by Ngun Makara: frontend development, responsive websites, Vue.js development, REST API integration and UI development.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: 'Contact',
      description: 'Contact Ngun Makara — internships, freelance work and project opportunities are welcome.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '404 — Not Found',
      description: 'The page you are looking for does not exist.',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// SEO: update the page title and meta description on every visit.
router.afterEach((to) => {
  const pageTitle = to.meta.title || 'Portfolio'
  document.title = `${pageTitle} · ${siteConfig.name}`

  const description = to.meta.description || siteConfig.name
  let metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) metaDescription.setAttribute('content', description)
})

export default router