// ============================================================
// EXPERIENCE DATA — used by ExperienceView (vertical timeline)
// ============================================================
// IMPORTANT: this page must NOT contain fake companies or fake
// employment. Only list real experiences: university projects,
// personal projects and any real internship you get.
//
// If you later complete a real internship, add it at the top of
// this array with the real company name.
// ============================================================

export const experience = [
  {
    id: 1,
    period: 'Looking Now',
    title: 'Internship Experience',
    place: 'Actively searching for a software/intern role',
    icon: 'bi-briefcase',
    type: 'internship',
    description:
      'I am currently looking for my first internship or junior role where I can contribute to real projects and learn from professional developers. No fake companies here — this section is updated once I join a real team.',
    tags: ['Frontend', 'Internship', 'Looking'],
    featured: true,
  },
  {
    id: 2,
    period: '2025 - Present',
    title: 'Academic Projects',
    place: 'Royal University of Phnom Penh (RUPP)',
    icon: 'bi-mortarboard',
    type: 'academic',
    description:
      'Built coursework and self-driven projects as part of my Information Technology degree, including the Food Express and Restaurant Management System projects listed in my portfolio.',
    tags: ['Vue', 'Spring Boot', 'MySQL'],
  },
  {
    id: 3,
    period: '2024 - Present',
    title: 'Personal Projects',
    place: 'Independent learning',
    icon: 'bi-laptop',
    type: 'personal',
    description:
      'Learning web development outside the classroom: building small apps to practise JavaScript, Vue.js, REST APIs and responsive design, and publishing them on my GitHub.',
    tags: ['JavaScript', 'Vue', 'GitHub'],
  },
  {
    id: 4,
    period: '2024 - Present',
    title: 'Web Development Experience',
    place: 'Self-taught journey',
    icon: 'bi-code-slash',
    type: 'web',
    description:
      'Studying HTML, CSS and JavaScript hands-on, following modern frontend workflows with Git, VS Code and browser devtools, and learning to connect frontends to Spring Boot APIs.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
]