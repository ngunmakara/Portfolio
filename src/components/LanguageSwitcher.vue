<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguage } from '@/composables/useLanguage'

// `locale` comes from Vue I18n; setLanguage() keeps localStorage + <html lang> in sync.
const { locale } = useI18n()
const { setLanguage } = useLanguage()

const options = [
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'km', label: 'KM', flag: '🇰🇭', name: 'ភាសាខ្មែរ' },
]

const current = computed(() => options.find((o) => o.code === locale.value) || options[0])
</script>

<template>
  <div class="dropdown language-switcher">
    <button
      class="btn-icon-sm border-0 dropdown-toggle d-flex align-items-center gap-1"
      type="button"
      data-bs-toggle="dropdown"
      data-bs-display="static"
      aria-expanded="false"
      aria-label="Switch language"
      title="English | ភាសាខ្មែរ"
    >
      <span aria-hidden="true">{{ current.flag }}</span>
      <span class="lang-code">{{ current.code }}</span>
    </button>

    <ul class="dropdown-menu dropdown-menu-end">
      <li v-for="opt in options" :key="opt.code">
        <button
          type="button"
          class="dropdown-item d-flex align-items-center gap-2"
          :class="{ active: opt.code === locale }"
          @click="setLanguage(opt.code)"
        >
          <span aria-hidden="true">{{ opt.flag }}</span>
          {{ opt.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang-code {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
</style>