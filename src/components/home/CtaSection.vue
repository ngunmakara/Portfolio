<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { highlightTitle } from '@/utils/highlight'

const { t } = useI18n()
const titleHtml = computed(() => highlightTitle(t('cta.title'), t('cta.titleHighlight')))
</script>

<template>
  <section class="section" style="padding-top: 0">
    <div class="container">
      <div class="app-card text-center p-5 position-relative overflow-hidden" data-aos="zoom-in">
        <div class="bg-grid position-absolute top-0 start-0 end-0 bottom-0"></div>
        <div class="position-relative" style="z-index: 1">
          <h2 class="mb-3" style="font-size: clamp(1.6rem, 4vw, 2.2rem)" v-html="titleHtml"></h2>
          <p class="section-sub mx-auto mb-4" style="max-width: 560px">
            {{ $t('cta.body') }}
          </p>
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <router-link class="btn btn-accent" to="/contact">
              <i class="bi bi-envelope me-1"></i>{{ $t('btn.contactMe') }}
            </router-link>
            <router-link class="btn btn-ghost" to="/services">
              <i class="bi bi-briefcase me-1"></i>{{ $t('btn.seeServices') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>