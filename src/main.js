// ============================================================
// APP ENTRY POINT
// ============================================================
// Order matters:
// 1. Bootstrap CSS, Bootstrap Icons, AOS CSS
// 2. Our design system (overrides Bootstrap)
// 3. Bootstrap JS bundle (navbar collapse, modals, …)
// 4. AOS init
// 5. Vue I18n (en/km)
// ============================================================

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import AOS from 'aos'

import App from './App.vue'
import router from './router'
import { useLanguage } from '@/composables/useLanguage'

import en from '@/locales/en'
import km from '@/locales/km'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'aos/dist/aos.css'
import '@/assets/main.css'
import * as bootstrap from 'bootstrap'

window.bootstrap = bootstrap

// Read the saved language before i18n is created so the first
// render already uses the correct locale (avoids a flash).
const { locale: storedLocale } = useLanguage()

const i18n = createI18n({
  legacy: false,
  locale: storedLocale.value,
  fallbackLocale: 'en',
  messages: { en, km },
})

// Nice scroll animations. one:true -> animate each element once.
AOS.init({
  duration: 650,
  once: true,
  offset: 60,
  easing: 'ease-out-cubic',
})

createApp(App).use(router).use(i18n).mount('#app')

// Re-broadcast AOS events after Vue re-renders so fresh elements animate.
router.afterEach(() => {
  AOS.refreshHard()
})