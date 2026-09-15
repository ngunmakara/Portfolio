<script setup>
import { siteConfig } from '@/data/siteConfig'

defineProps({
  size: {
    type: String,
    default: 'md', // 'md' | 'lg'
  },
})
</script>

<template>
  <div class="social-links d-flex" :class="size === 'lg' ? 'gap-3' : 'gap-2'">
    <a
      v-for="social in siteConfig.socials"
      :key="social.id"
      class="social-btn"
      :style="size === 'lg' ? { width: '48px', height: '48px', fontSize: '1.25rem' } : {}"
      :href="social.url"
      target="_blank"
      rel="noopener"
      :aria-label="`Open my ${social.label} profile`"
      :title="social.label"
    >
      <i :class="`bi ${social.icon}`"></i>
    </a>
  </div>
</template>