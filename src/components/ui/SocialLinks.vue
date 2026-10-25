<script setup>
import { siteConfig } from '@/data/siteConfig'

defineProps({
  size: {
    type: String,
    default: 'md',
  },
})
</script>

<template>
  <div class="social-links" :class="size === 'lg' ? 'social-links--lg' : ''">
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
      <i :class="`bi ${social.icon}`" aria-hidden="true"></i>
    </a>
  </div>
</template>
