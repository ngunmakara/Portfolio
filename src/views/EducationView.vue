<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { education } from '@/data/education'
import PageHeader from '@/components/ui/PageHeader.vue'

const { tm } = useI18n()

const localizedItems = computed(() =>
  education.map((item) => ({ ...item, ...tm(`education.items.${item.id}`) }))
)
</script>

<template>
  <main>
    <PageHeader
      tag="Education"
      :title="$t('education.title')"
      :highlight="$t('education.titleHighlight')"
      :subtitle="$t('education.subtitle')"
    />

    <section class="section section-tight-top">
      <div class="container">
        <div class="row justify-content-center g-4">
          <div v-for="item in localizedItems" :key="item.id" class="col-lg-10">
            <article class="app-card app-card-hover education-card" data-aos="fade-up">
              <div class="edu-head">
                <span class="icon-badge edu-icon" aria-hidden="true">
                  <i :class="`bi ${item.icon}`"></i>
                </span>
                <div class="edu-head-main">
                  <h2 class="edu-school">{{ item.school }}</h2>
                  <p class="edu-degree">
                    <strong>{{ item.degree }}</strong> — {{ item.focus }}
                  </p>
                </div>
                <span class="edu-period">{{ item.period }}</span>
              </div>

              <div class="edu-meta">
                <span>
                  <i class="bi bi-geo-alt" aria-hidden="true"></i>
                  {{ item.location }}
                </span>
              </div>

              <p class="edu-desc">{{ item.description }}</p>

              <h3 class="edu-areas-title">{{ $t('education.relevantAreas') }}</h3>
              <div class="edu-areas">
                <div v-for="area in item.areas" :key="area.name" class="edu-area">
                  <i class="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>
                  <div>
                    <strong>{{ area.name }}</strong>
                    <span>{{ area.detail }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
