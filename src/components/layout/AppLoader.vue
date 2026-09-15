<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const progress = ref(0)
let intervalId = null

// While the loader is visible, prevent the page behind it from scrolling.
watch(
  () => props.loading,
  (loading) => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (loading) startProgress()
    else resetProgress()
  }
)

function startProgress() {
  stopProgress()
  progress.value = 0
  intervalId = setInterval(() => {
    if (progress.value < 90) progress.value += Math.random() * 22
  }, 120)
}

function resetProgress() {
  stopProgress()
  progress.value = 100
  setTimeout(() => (progress.value = 0), 300)
}

function stopProgress() {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
}

onBeforeUnmount(() => {
  stopProgress()
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-show="loading" class="loader-screen" role="status" aria-label="Loading">
    <div class="loader-logo">
      <span class="name">{{ $t('hero.firstName') }}</span> <span class="text-gradient">{{ $t('hero.lastName') }}</span>
    </div>
    <div class="loader-bar">
      <div class="loader-bar-inner" :style="{ width: progress + '%' }"></div>
    </div>
    <span class="loader-text">{{ $t('loader.loading') }}</span>
  </div>
</template>

<style scoped>
.loader-logo .name {
  color: var(--text-primary);
}
</style>