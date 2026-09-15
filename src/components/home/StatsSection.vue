<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'

const { t } = useI18n()

// Number/suffix come from siteConfig, labels are translated.
const statLabelKeys = ['stats.projects', 'stats.technologies', 'stats.certificates', 'stats.graduation']

const stats = computed(() =>
  siteConfig.stats.map((stat, index) => ({
    ...stat,
    label: t(statLabelKeys[index]),
  }))
)
</script>

<template>
  <section class="section" style="padding-top: 0">
    <div class="container">
      <div class="row g-4">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="col-6 col-lg-3"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="app-card stat-card">
            <div class="stat-value">
              {{ stat.value }}<span>{{ stat.suffix }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>