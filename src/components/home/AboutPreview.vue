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

const facts = computed(() => [
  { label: t('about.infoRole'), value: t('about.role'), icon: 'bi-code-slash' },
  { label: t('about.infoMajor'), value: t('about.major'), icon: 'bi-cpu' },
  { label: t('about.infoUniversity'), value: t('about.university'), icon: 'bi-mortarboard' },
  { label: t('about.infoGraduation'), value: String(siteConfig.expectedGraduation), icon: 'bi-calendar-event' },
])
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <SectionTitle tag="About" :title="$t('about.title')" :highlight="$t('about.titleHighlight')" :subtitle="$t('about.subtitle')" />

      <div class="row g-4 g-lg-5 align-items-center">
        <div class="col-lg-6" data-aos="fade-right">
          <div class="about-copy">
            <p v-for="paragraph in paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>

          <ul class="about-facts">
            <li v-for="fact in facts" :key="fact.label" class="fact-item">
              <i :class="`bi ${fact.icon}`" aria-hidden="true"></i>
              <span>
                {{ fact.label }}
                <strong>{{ fact.value }}</strong>
              </span>
            </li>
          </ul>

          <div class="about-actions">
            <router-link class="btn btn-accent" to="/about">
              <i class="bi bi-person"></i>{{ $t('btn.moreAboutMe') }}
            </router-link>
            <SocialLinks />
          </div>
        </div>

        <div class="col-lg-6" data-aos="fade-left">
          <div class="app-card journey-card">
            <h3 class="journey-title">
              <span class="icon-badge" aria-hidden="true"><i class="bi bi-compass"></i></span>
              <span v-html="journeyTitleHtml"></span>
            </h3>
            <ol class="journey-list">
              <li v-for="(step, index) in journey" :key="step.title" class="journey-step">
                <span class="journey-step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <strong>{{ step.title }}</strong>
                  <p>{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
