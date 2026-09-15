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

    <section class="section" style="padding-top: 40px">
      <div class="container">
        <div class="row justify-content-center g-4">
          <div v-for="item in localizedItems" :key="item.id" class="col-lg-10">
            <article class="app-card app-card-hover p-4 p-lg-5" data-aos="fade-up">
              <div class="d-flex gap-4 flex-column flex-sm-row">
                <span class="icon-badge" style="width: 64px; height: 64px; font-size: 1.7rem">
                  <i :class="`bi ${item.icon}`"></i>
                </span>
                <div class="flex-fill">
                  <h2 class="mb-1" style="font-size: 1.5rem">{{ item.school }}</h2>
                  <p class="mb-1">
                    <strong>{{ item.degree }}</strong>
                    <span class="text-muted"> — {{ item.focus }}</span>
                  </p>
                  <p class="mb-3 text-muted" style="font-size: 0.9rem">
                    <i class="bi bi-calendar-event me-1"></i>{{ item.period }}
                    <span class="mx-2">&bull;</span>
                    <i class="bi bi-geo-alt me-1"></i>{{ item.location }}
                  </p>
                  <p class="text-secondary mb-4">{{ item.description }}</p>

                  <h3 class="mb-3" style="font-size: 1.1rem">{{ $t('education.relevantAreas') }}</h3>
                  <div class="row g-3">
                    <div
                      v-for="area in item.areas"
                      :key="area.name"
                      class="col-md-6"
                    >
                      <div class="d-flex gap-3 align-items-start p-3 app-card app-card-hover" style="border-radius: 12px">
                        <i class="bi bi-arrow-right-circle-fill" style="color: var(--brand-a)"></i>
                        <div>
                          <strong class="d-block" style="font-size: 0.95rem">{{ area.name }}</strong>
                          <span class="text-secondary" style="font-size: 0.85rem">{{ area.detail }}</span>
                        </div>
                      </div>
                    </div>
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