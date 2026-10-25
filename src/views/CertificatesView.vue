<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { certificates } from '@/data/certificates'
import PageHeader from '@/components/ui/PageHeader.vue'
import CertificateCard from '@/components/cards/CertificateCard.vue'

const { tm } = useI18n()

const localizedCertificates = computed(() =>
  certificates.map((certificate) => ({
    ...certificate,
    ...tm(`certificates.items.${certificate.id}`),
  }))
)
</script>

<template>
  <main>
    <PageHeader
      tag="Certificates"
      :title="$t('certificates.title')"
      :highlight="$t('certificates.titleHighlight')"
      :subtitle="$t('certificates.subtitle')"
    />

    <section class="section section-tight-top">
      <div class="container">
        <div class="row g-4">
          <div
            v-for="certificate in localizedCertificates"
            :key="certificate.id"
            class="col-md-6 col-lg-4"
          >
            <CertificateCard :certificate="certificate" />
          </div>
        </div>

        <div class="placeholder-note mt-5" data-aos="fade-up">
          <i class="bi bi-info-circle"></i>
          <h4>{{ $t('certificates.placeholdersTitle') }}</h4>
          <p>{{ $t('certificates.placeholdersBody') }}</p>
        </div>
      </div>
    </section>
  </main>
</template>