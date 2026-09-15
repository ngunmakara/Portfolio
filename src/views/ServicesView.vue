<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { services } from '@/data/services'
import PageHeader from '@/components/ui/PageHeader.vue'
import ServiceCard from '@/components/cards/ServiceCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const { tm } = useI18n()

const localizedServices = computed(() =>
  services.map((service) => ({ ...service, ...tm(`services.items.${service.id}`) }))
)
</script>

<template>
  <main>
    <PageHeader
      tag="Services"
      :title="$t('services.title')"
      :highlight="$t('services.titleHighlight')"
      :subtitle="$t('services.subtitle')"
    />

    <section class="section" style="padding-top: 40px">
      <div class="container">
        <div class="row g-4">
          <div
            v-for="(service, index) in localizedServices"
            :key="service.id"
            class="col-md-6 col-lg-4"
          >
            <ServiceCard :service="service" :data-aos-delay="index * 80" />
          </div>
        </div>

        <div class="mt-5" data-aos="fade-up">
          <SectionTitle
            :tag="$t('services.noteTag')"
            :title="$t('services.noteTitle')"
            :highlight="$t('services.noteTitleHighlight')"
            :subtitle="$t('services.noteSubtitle')"
          />
        </div>
      </div>
    </section>
  </main>
</template>