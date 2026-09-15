<script setup>
import { computed } from 'vue'
import { highlightTitle } from '@/utils/highlight'

const props = defineProps({
  tag: {
    type: String,
    default: 'Page',
  },
  title: {
    type: String,
    required: true,
  },
  // Plain-text substring of title to wrap in a gradient span.
  highlight: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
})

const renderedTitle = computed(() => highlightTitle(props.title, props.highlight))
</script>

<template>
  <header class="page-header">
    <div class="bg-grid"></div>
    <div class="container">
      <p class="breadcrumb-app mb-2" data-aos="fade-down">
        <router-link to="/" class="text-decoration-none">{{ $t('nav.home') }}</router-link>
        <i class="bi bi-chevron-right mx-1" style="font-size: 0.7rem"></i>{{ tag }}
      </p>
      <h1 class="page-title" data-aos="fade-up" v-html="renderedTitle"></h1>
      <p v-if="subtitle" class="page-sub" data-aos="fade-up" data-aos-delay="120">{{ subtitle }}</p>
    </div>
  </header>
</template>