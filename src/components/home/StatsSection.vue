<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'

const { t } = useI18n()

const statLabelKeys = ['stats.projects', 'stats.technologies', 'stats.certificates', 'stats.graduation']
const statIcons = ['bi-folder2-open', 'bi-stack', 'bi-award', 'bi-mortarboard']

const stats = computed(() =>
  siteConfig.stats.map((stat, index) => ({
    ...stat,
    icon: statIcons[index],
    label: t(statLabelKeys[index]),
  }))
)
</script>

<template>
  <section class="section stats-section">
    <div class="container">
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="app-card app-card-hover stat-card"
          data-aos="fade-up"
          :data-aos-delay="index * 80"
        >
          <span class="stat-icon" aria-hidden="true">
            <i :class="`bi ${stat.icon}`"></i>
          </span>
          <div class="stat-value">
            {{ stat.value }}<span>{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
