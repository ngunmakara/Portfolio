// ============================================================
// useTheme — dark/light mode with localStorage
// ============================================================
// We use Bootstrap 5.3's native theming: the <html> element gets
// data-bs-theme="light" | "dark". Bootstrap reads that attribute
// to switch its own components, and our CSS in main.css reads it
// to switch the custom design tokens.
// ============================================================

import { ref } from 'vue'

const STORAGE_KEY = 'portfolio-theme'

function getInitialTheme() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  // First visit -> follow the user's system preference.
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Module-level state so the whole app shares one theme.
const theme = ref(getInitialTheme())

function apply() {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
}

// Apply the theme as soon as this module loads (avoids a flash).
apply()

export function useTheme() {
  function setTheme(value) {
    theme.value = value
    window.localStorage.setItem(STORAGE_KEY, value)
    apply()
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    toggleTheme,
    setTheme,
  }
}