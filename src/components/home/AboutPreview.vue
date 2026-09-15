<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'
import { highlightTitle } from '@/utils/highlight'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'

const { t, tm } = useI18n()

const paragraphs = computed(() => tm('about.paragraphs'))
const journey = computed(() => tm('about.journey'))
const journeyTitleHtml = computed(() =>
  highlightTitle(t('about.developerJourneyTitle'), t('about.developerJourneyTitleHighlight'))
)
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <SectionTitle tag="About" :title="$t('about.title')" :highlight="$t('about.titleHighlight')" />

      <div class="row g-4 align-items-center">
        <div class="col-lg-6" data-aos="fade-right">
          <p v-for="paragraph in paragraphs" :key="paragraph" class="text-secondary mb-3">
            {{ paragraph }}
          </p>
          <ul class="list-unstyled d-grid gap-2 mb-4">
            <li>
              <strong class="me-1">{{ $t('about.infoRole') }}:</strong>
              <span class="text-secondary">{{ $t('about.role') }}</span>
            </li>
            <li>
              <strong class="me-1">{{ $t('about.infoMajor') }}:</strong>
              <span class="text-secondary">{{ $t('about.major') }}</span>
            </li>
            <li>
              <strong class="me-1">{{ $t('about.infoUniversity') }}:</strong>
              <span class="text-secondary">{{ $t('about.university') }}</span>
            </li>
            <li>
              <strong class="me-1">{{ $t('about.infoGraduation') }}:</strong>
              <span class="text-secondary">{{ siteConfig.expectedGraduation }}</span>
            </li>
          </ul>
          <div class="d-flex flex-wrap gap-3 align-items-center">
            <router-link class="btn btn-accent" to="/about">
              <i class="bi bi-person me-1"></i>{{ $t('btn.moreAboutMe') }}
            </router-link>
            <SocialLinks />
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-left">
          <div class="app-card p-4">
            <h3 class="mb-3" style="font-size: 1.25rem">
              <i class="bi bi-compass me-2" style="color: var(--brand-a)"></i><span v-html="journeyTitleHtml"></span>
            </h3>
            <ul class="list-unstyled d-grid gap-3 mb-0">
              <li
                v-for="(step, index) in journey"
                :key="step.title"
                class="d-flex gap-3"
              >
                <span class="icon-badge" style="width: 38px; height: 38px; font-size: 0.95rem">
                  {{ index + 1 }}
                </span>
                <span>
                  <strong class="d-block">{{ step.title }}</strong>
                  <span class="text-secondary">{{ step.text }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>