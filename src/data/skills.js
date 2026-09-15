// ============================================================
// SKILLS DATA — used by SkillsView and the home Skills preview
// ============================================================
// "level" is a rough, honest self-assessment.
// Do not exaggerate — a junior developer profile is credible
// when the numbers are realistic. Adjust them for yourself.
// ============================================================

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'bi-window-desktop',
    color: '#6366f1',
    description: 'Building responsive, interactive user interfaces.',
    skills: [
      { name: 'HTML', level: 90, detail: 'Semantic markup & accessibility basics' },
      { name: 'CSS', level: 80, detail: 'Flexbox, Grid, animations, custom design' },
      { name: 'Bootstrap', level: 80, detail: 'Responsive layouts with Bootstrap 5' },
      { name: 'JavaScript', level: 70, detail: 'ES6+, DOM, fetch API, events' },
      { name: 'Vue.js', level: 65, detail: 'Components, Router, Composition API' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'bi-server',
    color: '#22d3ee',
    description: 'The basics of server-side development.',
    skills: [
      { name: 'Java', level: 60, detail: 'Core Java, OOP, collections' },
      { name: 'Spring Boot', level: 55, detail: 'REST APIs, controllers, services' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'bi-database',
    color: '#f59e0b',
    description: 'Storing and querying data.',
    skills: [
      { name: 'MySQL', level: 65, detail: 'CRUD, simple joins & queries' },
      { name: 'XAMPP', level: 60, detail: 'Local Apache + MySQL setup' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'bi-tools',
    color: '#10b981',
    description: 'The everyday tools I use for development.',
    skills: [
      { name: 'Git', level: 65, detail: 'Commit, branch, merge basics' },
      { name: 'GitHub', level: 65, detail: 'Repos, pull requests, pages' },
      { name: 'Postman', level: 60, detail: 'Testing REST APIs' },
      { name: 'Swagger', level: 55, detail: 'API documentation' },
      { name: 'VS Code', level: 80, detail: 'Daily editor, extensions, shortcuts' },
    ],
  },
]