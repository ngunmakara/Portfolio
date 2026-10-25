<script setup>
import { siteConfig } from '@/data/siteConfig'

const footerLinks = [
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
</script>

<template>
  <footer class="footer-app">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <router-link class="footer-brand" to="/">
            <span class="brand-mark" aria-hidden="true">&#123;&#125;</span>
            <span>{{ $t('hero.firstName') }}</span>
            <span class="text-gradient ms-1">{{ $t('hero.lastName') }}</span>
          </router-link>
          <p class="footer-tagline">{{ $t('hero.role') }}</p>
          <p class="footer-availability">
            <span class="dot" aria-hidden="true"></span>
            <span>{{ $t('cta.availability') }}</span>
          </p>
          <div class="footer-socials">
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
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <ul class="footer-links">
            <li v-for="link in footerLinks" :key="link.to">
              <router-link :to="link.to">{{ $t(`nav.${link.key}`) }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="footer-contact">
          <p class="footer-contact-heading">{{ $t('contact.getInTouch') }}</p>
          <a :href="`mailto:${siteConfig.contact.email}`">{{ siteConfig.contact.email }}</a>
          <a :href="`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`">{{ siteConfig.contact.phone }}</a>
          <p>{{ $t('contact.location') }}</p>
          <router-link class="btn btn-accent btn-sm" to="/contact">
            <i class="bi bi-send"></i>{{ $t('btn.contactMe') }}
          </router-link>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">
          © {{ new Date().getFullYear() }} {{ $t('hero.name') }} — {{ $t('footer.copyright') }}
        </p>
        <p class="footer-built">{{ $t('hero.role') }}</p>
      </div>
    </div>
  </footer>
</template>
