<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'

const { t, tm } = useI18n()

const infoCards = computed(() => [
  { label: t('about.infoName'), value: t('about.name'), icon: 'bi-person-badge' },
  { label: t('about.infoRole'), value: t('about.role'), icon: 'bi-code-slash' },
  { label: t('about.infoMajor'), value: t('about.major'), icon: 'bi-cpu' },
  { label: t('about.infoUniversity'), value: t('about.university'), icon: 'bi-mortarboard' },
  { label: t('about.infoGraduation'), value: String(siteConfig.expectedGraduation), icon: 'bi-calendar-event' },
  { label: t('about.infoLocation'), value: t('about.location'), icon: 'bi-geo-alt' },
])

const paragraphs = computed(() => tm('about.paragraphs'))
const journey = computed(() => tm('about.journey'))
const futureGoals = computed(() => tm('about.futureGoals'))
</script>

<template>
  <main>
    <PageHeader
      tag="About"
      :title="$t('about.title')"
      :highlight="$t('about.titleHighlight')"
      :subtitle="$t('about.subtitle')"
    />

    <section class="section section-tight-top">
      <div class="container">
        <div class="row g-4 g-lg-5">
          <div class="col-lg-6" data-aos="fade-right">
            <SectionTitle
              align="left"
              :tag="$t('about.introTag')"
              :title="$t('about.introTitle')"
            />
            <div class="about-copy">
              <p v-for="paragraph in paragraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>

            <div class="about-actions">
              <a class="btn btn-accent" :href="siteConfig.cvUrl" download>
                <i class="bi bi-download"></i>{{ $t('btn.downloadCv') }}
              </a>
              <SocialLinks />
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-left">
            <div class="row g-3">
              <div v-for="card in infoCards" :key="card.label" class="col-sm-6">
                <div class="app-card app-card-hover contact-info-card">
                  <span class="icon-badge" aria-hidden="true">
                    <i :class="`bi ${card.icon}`"></i>
                  </span>
                  <div>
                    <p class="contact-info-label mb-0">{{ card.label }}</p>
                    <p class="contact-info-value mb-0">{{ card.value }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <SectionTitle
          :tag="$t('about.developerJourneyTag')"
          :title="$t('about.developerJourneyTitle')"
          :highlight="$t('about.developerJourneyTitleHighlight')"
        />
        <div class="row justify-content-center">
          <div class="col-lg-9">
            <ul class="timeline">
              <li
                v-for="(step, index) in journey"
                :key="step.title"
                class="timeline-item"
                data-aos="fade-up"
              >
                <span class="timeline-dot" aria-hidden="true">
                  <span class="mono">{{ index + 1 }}</span>
                </span>
                <div class="timeline-card">
                  <span class="timeline-period">{{ String(index + 1).padStart(2, '0') }}</span>
                  <h3 class="timeline-title">{{ step.title }}</h3>
                  <p class="timeline-desc mb-0">{{ step.text }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="app-card app-card-hover about-goal-card h-100">
              <h3 class="about-goal-title">
                <i class="bi bi-bullseye" aria-hidden="true"></i>{{ $t('about.careerGoalsTitle') }}
              </h3>
              <p>{{ $t('about.careerGoals') }}</p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-left">
            <div class="app-card app-card-hover about-goal-card h-100">
              <h3 class="about-goal-title">
                <i class="bi bi-book" aria-hidden="true"></i>{{ $t('about.currentLearningTitle') }}
              </h3>
              <p>{{ $t('about.currentLearning') }}</p>
            </div>
          </div>

          <div class="col-12" data-aos="fade-up">
            <div class="app-card app-card-hover about-goal-card">
              <h3 class="about-goal-title">
                <i class="bi bi-rocket-takeoff" aria-hidden="true"></i>{{ $t('about.futureGoalsTitle') }}
              </h3>
              <ul class="goal-list">
                <li v-for="goal in futureGoals" :key="goal">
                  <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                  <span>{{ goal }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
