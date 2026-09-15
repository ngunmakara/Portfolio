<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { highlightTitle } from '@/utils/highlight'

const { t } = useI18n()
const titleHtml = computed(() => highlightTitle(t('notFound.title'), t('notFound.titleHighlight')))

const quickLinks = [
  { key: 'home', to: '/' },
  { key: 'projects', to: '/projects' },
  { key: 'contact', to: '/contact' },
]
</script>

<template>
  <main class="d-flex align-items-center" style="min-height: 100vh; padding: 140px 0 60px">
    <div class="container text-center">
      <div class="error-code" data-aos="zoom-in">404</div>
      <h1 class="mb-3" style="font-size: clamp(1.6rem, 4vw, 2.2rem)" v-html="titleHtml"></h1>
      <p class="section-sub mx-auto mb-4" style="max-width: 480px">
        {{ $t('notFound.subtitle') }}
      </p>
      <div class="d-flex gap-3 justify-content-center flex-wrap">
        <router-link class="btn btn-accent" to="/">
          <i class="bi bi-house me-1"></i>{{ $t('btn.backToHome') }}
        </router-link>
        <router-link
          v-for="link in quickLinks.slice(1)"
          :key="link.to"
          class="btn btn-ghost"
          :to="link.to"
        >
          {{ $t(`nav.${link.key}`) }}
        </router-link>
      </div>
      <p class="mono text-muted mt-5" style="font-size: 0.85rem">
        {{ $t('notFound.errorCode', { NAME: $t('hero.name').toUpperCase() }) }}
      </p>
    </div>
  </main>
</template>