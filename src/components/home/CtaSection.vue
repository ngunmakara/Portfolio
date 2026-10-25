<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { highlightTitle } from '@/utils/highlight'

const { t } = useI18n()
const titleHtml = computed(() => highlightTitle(t('cta.title'), t('cta.titleHighlight')))
</script>

<template>
  <section class="section section-cta">
    <div class="container">
      <div class="cta-panel" data-aos="zoom-in">
        <span class="availability-pill">
          <span class="dot" aria-hidden="true"></span>{{ $t('cta.availability') }}
        </span>
        <h2 v-html="titleHtml"></h2>
        <p>{{ $t('cta.body') }}</p>
        <div class="cta-actions">
          <router-link class="btn btn-accent" to="/contact">
            <i class="bi bi-envelope"></i>{{ $t('btn.contactMe') }}
          </router-link>
          <router-link class="btn btn-ghost" to="/services">
            <i class="bi bi-briefcase"></i>{{ $t('btn.seeServices') }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
