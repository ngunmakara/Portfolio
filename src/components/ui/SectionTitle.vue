<script setup>
import { computed } from 'vue'
import { highlightTitle } from '@/utils/highlight'

const props = defineProps({
  tag: {
    type: String,
    default: '',
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
  align: {
    type: String,
    default: 'center', // 'center' | 'left'
  },
})

const renderedTitle = computed(() => highlightTitle(props.title, props.highlight))
</script>

<template>
  <div
    class="section-header"
    :class="align === 'left' ? 'text-start mx-0' : ''"
    data-aos="fade-up"
  >
    <span v-if="tag" class="section-tag">{{ tag }}</span>
    <h2 class="section-title" v-html="renderedTitle"></h2>
    <p v-if="subtitle" class="section-sub">{{ subtitle }}</p>
  </div>
</template>