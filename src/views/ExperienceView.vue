<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { experience } from '@/data/experience'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ExperienceItem from '@/components/cards/ExperienceItem.vue'

const { tm } = useI18n()

const localizedItems = computed(() =>
  experience.map((item) => ({ ...item, ...tm(`experience.items.${item.id}`) }))
)
</script>

<template>
  <main>
    <PageHeader
      tag="Experience"
      :title="$t('experience.title')"
      :highlight="$t('experience.titleHighlight')"
      :subtitle="$t('experience.subtitle')"
    />

    <section class="section" style="padding-top: 40px">
      <div class="container">
        <SectionTitle
          :tag="$t('experience.timelineTag')"
          :title="$t('experience.timelineTitle')"
          :highlight="$t('experience.timelineTitleHighlight')"
        />

        <div class="row justify-content-center">
          <div class="col-lg-10">
            <ul class="timeline">
              <ExperienceItem
                v-for="item in localizedItems"
                :key="item.id"
                :item="item"
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>