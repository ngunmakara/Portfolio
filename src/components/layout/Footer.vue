<script setup>
import { siteConfig } from '@/data/siteConfig'

const footerLinks = [
  { key: 'about', to: '/about' },
  { key: 'skills', to: '/skills' },
  { key: 'projects', to: '/projects' },
  { key: 'experience', to: '/experience' },
  { key: 'education', to: '/education' },
  { key: 'certificates', to: '/certificates' },
  { key: 'services', to: '/services' },
  { key: 'contact', to: '/contact' },
]
</script>

<template>
  <footer class="footer-app">
    <div class="container">
      <div class="text-center mb-4">
        <span class="footer-brand">{{ $t('hero.name') }}</span>
        <p class="mono text-gradient mb-0 mt-1" style="font-size: 0.85rem">
          {{ $t('hero.role') }}
        </p>
      </div>

      <ul class="footer-links">
        <li v-for="link in footerLinks" :key="link.to">
          <router-link :to="link.to">{{ $t(`nav.${link.key}`) }}</router-link>
        </li>
      </ul>

      <div class="d-flex justify-content-center gap-2 mb-3">
        <a
          v-for="social in siteConfig.socials"
          :key="social.id"
          class="social-btn"
          :href="social.url"
          target="_blank"
          rel="noopener"
          :aria-label="`Open my ${social.label} profile`"
          :title="social.label"
        >
          <i :class="`bi ${social.icon}`"></i>
        </a>
      </div>

      <p class="footer-copy text-center">
        © {{ new Date().getFullYear() }} {{ $t('hero.name') }} — {{ $t('footer.copyright') }}
      </p>
    </div>
  </footer>
</template>