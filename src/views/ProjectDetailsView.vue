<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProjectBySlug } from '@/data/projects'
import PageHeader from '@/components/ui/PageHeader.vue'

const route = useRoute()
const { t, tm } = useI18n()

const project = computed(() => {
  const base = getProjectBySlug(route.params.slug)
  if (!base) return null
  return { ...base, ...tm(`projects.items.${base.slug}`) }
})

const categoryLabels = computed(() =>
  project.value?.category?.map((category) => t(`projects.categories.${category}`)) || []
)
</script>

<template>
  <main>
    <template v-if="!project">
      <PageHeader
        tag="Projects"
        :title="$t('projects.projectNotFound')"
        :highlight="$t('projects.projectNotFoundHighlight')"
        :subtitle="$t('projects.projectNotFoundSub')"
      />
      <section class="section section-tight-top">
        <div class="container text-center">
          <router-link class="btn btn-accent" to="/projects">
            <i class="bi bi-arrow-left" aria-hidden="true"></i>{{ $t('btn.backToProjects') }}
          </router-link>
        </div>
      </section>
    </template>

    <template v-else>
      <PageHeader
        :tag="categoryLabels.join(' / ')"
        :title="project.title"
        :subtitle="project.shortDescription"
      />

      <section class="section section-tight-top">
        <div class="container">
          <div class="detail-action-bar">
            <router-link class="btn btn-ghost btn-sm" to="/projects">
              <i class="bi bi-arrow-left" aria-hidden="true"></i>{{ $t('btn.allProjects') }}
            </router-link>
            <span v-for="category in categoryLabels" :key="category" class="chip">
              {{ category }}
            </span>
            <div class="detail-actions">
              <a
                v-if="project.github"
                class="btn btn-outline-accent btn-sm"
                :href="project.github"
                target="_blank"
                rel="noopener"
              >
                <i class="bi bi-github" aria-hidden="true"></i>GitHub
              </a>
              <a
                v-if="project.liveDemo"
                class="btn btn-accent btn-sm"
                :href="project.liveDemo"
                target="_blank"
                rel="noopener"
              >
                <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>{{ $t('btn.liveDemo') }}
              </a>
            </div>
          </div>

          <div class="screenshot-grid" data-aos="fade-up">
            <img
              v-for="(screenshot, index) in project.screenshots"
              :key="screenshot"
              :src="screenshot"
              :alt="`${project.title} screenshot ${index + 1}`"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="row g-4 mb-4 mb-lg-5">
            <div class="col-lg-8" data-aos="fade-right">
              <div class="app-card detail-hero-info h-100">
                <h2 class="detail-section-title">
                  <i class="bi bi-info-circle" aria-hidden="true"></i>{{ $t('projects.overviewTitle') }}
                </h2>
                <p class="detail-copy">{{ project.overview }}</p>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-left">
              <div class="app-card detail-hero-info h-100">
                <h2 class="detail-section-title">
                  <i class="bi bi-tags" aria-hidden="true"></i>{{ $t('projects.techTitle') }}
                </h2>
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4 mb-4 mb-lg-5">
            <div class="col-lg-4" data-aos="fade-up">
              <div class="app-card detail-hero-info h-100">
                <h2 class="detail-section-title">
                  <i class="bi bi-list-check" aria-hidden="true"></i>{{ $t('projects.featuresTitle') }}
                </h2>
                <ul class="feature-list">
                  <li v-for="feature in project.features" :key="feature">
                    <i class="bi bi-check-circle" aria-hidden="true"></i>{{ feature }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="80">
              <div class="app-card detail-hero-info h-100">
                <h2 class="detail-section-title">
                  <i class="bi bi-code-square" aria-hidden="true"></i>{{ $t('projects.challengesTitle') }}
                </h2>
                <ul class="challenge-list">
                  <li v-for="challenge in project.challenges.split('\n').filter(Boolean)" :key="challenge">
                    <i class="bi bi-exclamation-diamond" aria-hidden="true"></i>{{ challenge }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="160">
              <div class="app-card detail-hero-info h-100">
                <h2 class="detail-section-title">
                  <i class="bi bi-lightbulb" aria-hidden="true"></i>{{ $t('projects.lessonsTitle') }}
                </h2>
                <ul class="lesson-list">
                  <li v-for="lesson in project.lessons.split('\n').filter(Boolean)" :key="lesson">
                    <i class="bi bi-check-circle" aria-hidden="true"></i>{{ lesson }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="text-center" data-aos="fade-up">
            <router-link class="btn btn-accent" to="/contact">
              <i class="bi bi-envelope" aria-hidden="true"></i>{{ $t('projects.cta') }}
            </router-link>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
