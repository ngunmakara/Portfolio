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

    <!-- Introduction + basic info -->
    <section class="section" style="padding-top: 40px">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-6" data-aos="fade-right">
            <SectionTitle
              align="left"
              :tag="$t('about.introTag')"
              :title="$t('about.introTitle')"
            />
            <p
              v-for="paragraph in paragraphs"
              :key="paragraph"
              class="text-secondary mb-3"
            >
              {{ paragraph }}
            </p>

            <div class="d-flex flex-wrap align-items-center gap-3">
              <a class="btn btn-accent" :href="siteConfig.cvUrl" download>
                <i class="bi bi-download me-1"></i>{{ $t('btn.downloadCv') }}
              </a>
              <SocialLinks />
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-left">
            <div class="row g-3">
              <div
                v-for="card in infoCards"
                :key="card.label"
                class="col-sm-6"
              >
                <div class="app-card app-card-hover contact-info-card p-3">
                  <span class="icon-badge">
                    <i :class="`bi ${card.icon}`"></i>
                  </span>
                  <div>
                    <p class="contact-info-label mb-0">{{ card.label }}</p>
                    <p class="contact-info-value mb-0" style="font-size: 0.92rem">{{ card.value }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Developer journey timeline -->
    <section class="section section-alt">
      <div class="container">
        <SectionTitle
          :tag="$t('about.developerJourneyTag')"
          :title="$t('about.developerJourneyTitle')"
          :highlight="$t('about.developerJourneyTitleHighlight')"
        />
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <ul class="timeline">
              <li
                v-for="(step, index) in journey"
                :key="index"
                class="timeline-item"
                data-aos="fade-up"
              >
                <span class="timeline-dot" aria-hidden="true">
                  <span class="mono" style="font-size: 0.8rem">{{ index + 1 }}</span>
                </span>
                <span class="timeline-period">Step {{ String(index + 1).padStart(2, '0') }}</span>
                <h3 class="timeline-title" style="font-size: 1.05rem">
                  {{ step.title }}
                </h3>
                <p class="timeline-desc mb-0">{{ step.text }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Goals section -->
    <section class="section">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="app-card app-card-hover p-4 h-100">
              <h3 class="mb-3" style="font-size: 1.25rem">
                <i class="bi bi-bullseye me-2" style="color: var(--brand-a)"></i>{{ $t('about.careerGoalsTitle') }}
              </h3>
              <p class="text-secondary mb-0">{{ $t('about.careerGoals') }}</p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-left">
            <div class="app-card app-card-hover p-4 h-100">
              <h3 class="mb-3" style="font-size: 1.25rem">
                <i class="bi bi-book me-2" style="color: var(--brand-a)"></i>{{ $t('about.currentLearningTitle') }}
              </h3>
              <p class="text-secondary mb-0">{{ $t('about.currentLearning') }}</p>
            </div>
          </div>

          <div class="col-12" data-aos="fade-up">
            <div class="app-card app-card-hover p-4">
              <h3 class="mb-3" style="font-size: 1.25rem">
                <i class="bi bi-rocket-takeoff me-2" style="color: var(--brand-a)"></i>{{ $t('about.futureGoalsTitle') }}
              </h3>
              <div class="row g-3">
                <div class="col-md-6" v-for="(goal, index) in futureGoals" :key="index">
                  <div class="d-flex gap-3 align-items-start">
                    <i class="bi bi-check-circle-fill" style="color: var(--brand-a)"></i>
                    <span class="text-secondary">{{ goal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>