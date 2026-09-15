<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <button
    class="back-to-top"
    :class="{ visible }"
    type="button"
    aria-label="Back to top"
    title="Back to top"
    @click="scrollToTop"
  >
    <i class="bi bi-arrow-up"></i>
  </button>
</template>