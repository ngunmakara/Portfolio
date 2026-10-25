<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { highlightTitle } from '@/utils/highlight'

const { t } = useI18n()
const titleHtml = computed(() => highlightTitle(t('notFound.title'), t('notFound.titleHighlight')))

const quickLinks = [
  { key: 'projects', to: '/projects' },
  { key: 'contact', to: '/contact' },
]
</script>

<template>
  <main class="not-found">
    <div class="container">
      <div class="error-code" data-aos="zoom-in" aria-hidden="true">404</div>
      <h1 class="not-found-title" data-aos="fade-up" v-html="titleHtml"></h1>
      <p class="not-found-sub" data-aos="fade-up" data-aos-delay="80">
        {{ $t('notFound.subtitle') }}
      </p>
      <div class="not-found-actions" data-aos="fade-up" data-aos-delay="140">
        <router-link class="btn btn-accent" to="/">
          <i class="bi bi-house" aria-hidden="true"></i>{{ $t('btn.backToHome') }}
        </router-link>
        <router-link
          v-for="link in quickLinks"
          :key="link.to"
          class="btn btn-ghost"
          :to="link.to"
        >
          {{ $t(`nav.${link.key}`) }}
        </router-link>
      </div>
      <p class="not-found-code" data-aos="fade-up" data-aos-delay="200">
        {{ $t('notFound.errorCode', { NAME: $t('hero.name').toUpperCase() }) }}
      </p>
    </div>
  </main>
</template>
