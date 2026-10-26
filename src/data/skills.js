// ============================================================
// SKILLS DATA — used by SkillsView and the home Skills preview
// ============================================================
// "level" is a rough, honest self-assessment.
// This file keeps only non-translated values: category ids,
// icons, colors and per-skill levels. Skill names are the real
// technology names (HTML, Vue.js, …) so they stay here too.
// All descriptive text (category titles/descriptions, skill
// details) is stored in src/locales/en.js and src/locales/km.js
// under skills.categories.* and looked up by id.
// ============================================================

export const skillCategories = [
  {
    id: 'frontend',
    icon: 'bi-window-desktop',
    color: '#6366f1',
    skills: [
      { id: 'html', name: 'HTML', level: 90 },
      { id: 'css', name: 'CSS', level: 80 },
      { id: 'bootstrap', name: 'Bootstrap', level: 80 },
      { id: 'javascript', name: 'JavaScript', level: 70 },
      { id: 'vuejs', name: 'Vue.js', level: 65 },
    ],
  },
  {
    id: 'backend',
    icon: 'bi-server',
    color: '#22d3ee',
    skills: [
      { id: 'cpp', name: 'C/C++', level: 80 },
      { id: 'java', name: 'Java', level: 60 },
      { id: 'springboot', name: 'Spring Boot', level: 55 },
    ],
  },
  {
    id: 'database',
    icon: 'bi-database',
    color: '#f59e0b',
    skills: [
      { id: 'mysql', name: 'MySQL', level: 65 },
      { id: 'xampp', name: 'XAMPP', level: 60 },
    ],
  },
  {
    id: 'tools',
    icon: 'bi-tools',
    color: '#10b981',
    skills: [
      { id: 'git', name: 'Git', level: 65 },
      { id: 'github', name: 'GitHub', level: 65 },
      { id: 'postman', name: 'Postman', level: 60 },
      { id: 'swagger', name: 'Swagger', level: 55 },
      { id: 'vscode', name: 'VS Code', level: 80 },
    ],
  },
]