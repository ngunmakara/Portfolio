<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { siteConfig } from '@/data/siteConfig'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { theme, toggleTheme } = useTheme()

const navLinks = [
  { key: 'home', to: '/', icon: 'bi-house' },
  { key: 'about', to: '/about', icon: 'bi-person' },
  { key: 'skills', to: '/skills', icon: 'bi-stars' },
  { key: 'projects', to: '/projects', icon: 'bi-folder2-open' },
  { key: 'experience', to: '/experience', icon: 'bi-briefcase' },
  { key: 'education', to: '/education', icon: 'bi-mortarboard' },
  { key: 'certificates', to: '/certificates', icon: 'bi-award' },
  { key: 'services', to: '/services', icon: 'bi-layers' },
  { key: 'contact', to: '/contact', icon: 'bi-envelope' },
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

function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <nav class="navbar navbar-expand-xl fixed-top navbar-app" :class="{ scrolled }">
    <div class="container">
      <router-link class="navbar-brand" to="/" @click="closeMenu">
        <span class="brand-mark" aria-hidden="true">&#123;&#125;</span>
        <span>{{ $t('hero.firstName') }}</span>
        <span class="text-gradient ms-1">{{ $t('hero.lastName') }}</span>
      </router-link>

      <div class="d-flex align-items-center gap-2 ms-auto order-xl-3">
        <LanguageSwitcher class="d-none d-sm-inline-flex" />
        <button
          class="btn-icon-sm"
          type="button"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
          @click="toggleTheme"
        >
          <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'"></i>
        </button>
        <button
          class="navbar-toggler d-xl-none"
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

      <div id="mainNavbar" ref="collapseEl" class="collapse navbar-collapse order-xl-2">
        <ul class="navbar-nav mx-auto mb-0">
          <li class="nav-item" v-for="link in navLinks" :key="link.to">
            <router-link
              class="nav-link"
              :class="{ active: isActive($route, link.to) }"
              :to="link.to"
              :aria-current="isActive($route, link.to) ? 'page' : undefined"
              @click="closeMenu"
            >
              <i :class="`bi ${link.icon} nav-icon`" aria-hidden="true"></i>
              {{ $t(`nav.${link.key}`) }}
            </router-link>
          </li>
        </ul>

        <div class="nav-cta align-items-center d-none d-xl-flex d-xl-flex-row">
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
            <i class="bi bi-download"></i>{{ $t('btn.downloadCv') }}
          </a>
        </div>

        <div class="navbar-mobile-actions d-xl-none">
          <a class="btn btn-outline-accent" :href="githubUrl" target="_blank" rel="noopener">
            <i class="bi bi-github"></i>{{ $t('btn.openMyGithub') }}
          </a>
          <a class="btn btn-accent mt-2" :href="siteConfig.cvUrl" download>
            <i class="bi bi-download"></i>{{ $t('btn.downloadCv') }}
          </a>
          <div class="navbar-mobile-lang d-sm-none mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
