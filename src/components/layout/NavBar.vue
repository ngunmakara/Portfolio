<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { siteConfig } from '@/data/siteConfig'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { theme, toggleTheme } = useTheme()

const navLinks = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'skills', to: '/skills' },
  { key: 'projects', to: '/projects' },
  { key: 'experience', to: '/experience' },
  { key: 'education', to: '/education' },
  { key: 'certificates', to: '/certificates' },
  { key: 'services', to: '/services' },
  { key: 'contact', to: '/contact' },
]

const githubUrl = computed(
  () => siteConfig.socials.find((s) => s.id === 'github')?.url || siteConfig.githubProfileUrl
)

const collapseEl = ref(null)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 10
}

function isActive(route, to) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

function closeMenu() {
  const el = collapseEl.value
  if (el) {
    const instance = window.bootstrap?.Collapse?.getInstance(el)
    if (instance) instance.hide()
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-app" :class="{ scrolled }">
    <div class="container">
      <router-link class="navbar-brand" to="/" @click="closeMenu">
        <span class="brand-mark">&#123;&#125;</span>{{ $t('hero.firstName') }}
        <span class="text-gradient">{{ $t('hero.lastName') }}</span>
      </router-link>

      <div class="d-flex align-items-center gap-2 order-lg-3">
        <LanguageSwitcher class="d-none d-md-inline-flex" />
        <button
          class="btn-icon-sm border-0 d-none d-md-inline-flex"
          type="button"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
          @click="toggleTheme"
        >
          <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'"></i>
        </button>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list"></i>
        </button>
      </div>

      <div id="mainNavbar" ref="collapseEl" class="collapse navbar-collapse order-lg-2">
        <ul class="navbar-nav mx-auto mb-3 mb-lg-0">
          <li class="nav-item" v-for="link in navLinks" :key="link.to">
            <router-link
              class="nav-link"
              :class="{ active: isActive($route, link.to) }"
              :to="link.to"
              @click="closeMenu"
            >
              {{ $t(`nav.${link.key}`) }}
            </router-link>
          </li>
        </ul>

        <!-- Desktop-only: GitHub + Download CV -->
        <div class="navbar-desktop-actions d-none d-lg-flex align-items-center gap-2">
          <a
            class="btn-icon-sm"
            :href="githubUrl"
            target="_blank"
            rel="noopener"
            aria-label="Open my GitHub profile"
            title="GitHub"
          >
            <i class="bi bi-github"></i>
          </a>
          <a class="btn btn-accent btn-sm" :href="siteConfig.cvUrl" download>
            <i class="bi bi-download me-1"></i>{{ $t('btn.downloadCv') }}
          </a>
        </div>

        <!-- Mobile-only: GitHub, CV, theme shown inside the menu -->
        <div class="navbar-mobile-actions d-lg-none d-flex flex-column gap-2 mt-3">
          <a class="btn btn-outline-accent w-100" :href="githubUrl" target="_blank" rel="noopener">
            <i class="bi bi-github me-2"></i>{{ $t('btn.openMyGithub') }}
          </a>
          <a class="btn btn-accent w-100" :href="siteConfig.cvUrl" download>
            <i class="bi bi-download me-1"></i>{{ $t('btn.downloadCv') }}
          </a>
          <div class="d-flex gap-2">
            <button
              class="btn-icon-sm border-0 flex-fill"
              type="button"
              :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
              @click="toggleTheme"
            >
              <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'"></i>
            </button>
            <div class="flex-fill d-flex justify-content-center align-items-center border rounded-lang-wrap">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-app .nav-cta .btn-accent {
  padding: 9px 18px;
  font-size: 0.9rem;
}

.rounded-lang-wrap {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  min-height: 42px;
}
.rounded-lang-wrap .btn-icon-sm {
  border: none;
  background: transparent;
}
</style>