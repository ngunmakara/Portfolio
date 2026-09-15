// ============================================================
// useLanguage — EN/KM language switching with localStorage
// ============================================================
// This composable mirrors useTheme.js: a single module-level
// ref shared by the whole app, persisted under a fixed storage
// key ("language"). The Vue I18n `locale` is kept in sync by the
// LanguageSwitcher component, which calls setLanguage().
// ============================================================

import { ref } from 'vue'

const STORAGE_KEY = 'language'
const SUPPORTED = ['en', 'km']
const DEFAULT = 'en'

function getInitialLocale() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return SUPPORTED.includes(saved) ? saved : DEFAULT
}

// Module-level state so the whole app shares one language.
const locale = ref(getInitialLocale())

function apply() {
  document.documentElement.setAttribute('lang', locale.value)
}

// Set the <html lang=""> attribute as soon as this module loads.
apply()

export function useLanguage() {
  function setLanguage(value) {
    if (!SUPPORTED.includes(value)) return
    locale.value = value
    window.localStorage.setItem(STORAGE_KEY, value)
    apply()
  }

  function toggleLanguage() {
    setLanguage(locale.value === 'en' ? 'km' : 'en')
  }

  return {
    locale,
    setLanguage,
    toggleLanguage,
  }
}