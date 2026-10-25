<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'

import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import AppLoader from '@/components/layout/AppLoader.vue'
import ScrollProgress from '@/components/layout/ScrollProgress.vue'
import BackToTop from '@/components/layout/BackToTop.vue'

const route = useRoute()
const { t, locale } = useI18n()
const loading = ref(true)

let hideTimer = null

function showLoader(duration = 600) {
  loading.value = true
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    loading.value = false
  }, duration)
}

onMounted(() => {
  // Initial loading screen, then reveal the page.
  showLoader(900)
})

onBeforeUnmount(() => {
  clearTimeout(hideTimer)
})

// Brief loading screen on every navigation.
watch(
  () => route.fullPath,
  () => showLoader(400)
)

// When the language changes, freshly translated content is
// re-created in the DOM, so AOS must scan it again.
watch(locale, async () => {
  await nextTick()
  AOS.refreshHard()
})
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">{{ t('a11y.skipToContent') }}</a>
    <AppLoader :loading="loading" />
    <ScrollProgress />
    <NavBar />

    <div id="main-content" class="app-main" tabindex="-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </div>

    <Footer />
    <BackToTop />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-main {
  flex: 1 0 auto;
}
</style>