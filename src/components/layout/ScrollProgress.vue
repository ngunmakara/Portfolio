<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? (window.scrollY / max) * 100 : 0
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div
    class="scroll-progress"
    :style="{ width: progress + '%' }"
    role="progressbar"
    aria-hidden="true"
  ></div>
</template>