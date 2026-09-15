<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProjectBySlug } from '@/data/projects'
import PageHeader from '@/components/ui/PageHeader.vue'

const route = useRoute()
const { t, tm } = useI18n()

// Merge the translated project text on top of the static data
// (image, screenshots, github, liveDemo stay in the data file).
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
    <!-- Unknown slug fallback -->
    <template v-if="!project">
      <PageHeader
        tag="Projects"
        :title="$t('projects.projectNotFound')"
        :highlight="$t('projects.projectNotFoundHighlight')"
        :subtitle="$t('projects.projectNotFoundSub')"
      />
      <section class="section" style="padding-top: 20px">
        <div class="container text-center">
          <router-link class="btn btn-accent" to="/projects">
            <i class="bi bi-arrow-left me-1"></i>{{ $t('btn.backToProjects') }}
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

      <section class="section" style="padding-top: 20px">
        <div class="container">
          <!-- Top action bar -->
          <div class="d-flex flex-wrap gap-3 align-items-center mb-5">
            <router-link class="btn btn-ghost btn-sm" to="/projects">
              <i class="bi bi-arrow-left me-1"></i>{{ $t('btn.allProjects') }}
            </router-link>
            <span
              v-for="category in categoryLabels"
              :key="category"
              class="chip"
            >
              {{ category }}
            </span>
            <div class="ms-auto d-flex gap-2 flex-wrap">
              <a
                v-if="project.github"
                class="btn btn-outline-accent btn-sm"
                :href="project.github"
                target="_blank"
                rel="noopener"
              >
                <i class="bi bi-github me-1"></i>GitHub
              </a>
              <a
                v-if="project.liveDemo"
                class="btn btn-accent btn-sm"
                :href="project.liveDemo"
                target="_blank"
                rel="noopener"
              >
                <i class="bi bi-box-arrow-up-right me-1"></i>{{ $t('btn.liveDemo') }}
              </a>
            </div>
          </div>

          <!-- Screenshots / hero image -->
          <div class="screenshot-grid mb-5" data-aos="fade-up">
            <img
              v-for="screenshot in project.screenshots"
              :key="screenshot"
              :src="screenshot"
              :alt="`Screenshot of the ${project.title} project`"
              loading="lazy"
            />
          </div>

          <!-- Overview + tech -->
          <div class="row g-4 mb-5">
            <div class="col-lg-8" data-aos="fade-right">
              <div class="app-card p-4 h-100">
                <h2 class="detail-section-title">
                  <i class="bi bi-info-circle"></i>{{ $t('projects.overviewTitle') }}
                </h2>
                <p class="text-secondary mb-0">{{ project.overview }}</p>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-left">
              <div class="app-card p-4 h-100">
                <h2 class="detail-section-title" style="font-size: 1.15rem">
                  <i class="bi bi-tags"></i>{{ $t('projects.techTitle') }}
                </h2>
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="row g-4 mb-5">
            <div class="col-lg-4" data-aos="fade-up">
              <div class="app-card p-4 h-100">
                <h2 class="detail-section-title" style="font-size: 1.15rem">
                  <i class="bi bi-list-check"></i>{{ $t('projects.featuresTitle') }}
                </h2>
                <ul class="feature-list">
                  <li v-for="feature in project.features" :key="feature">
                    <i class="bi bi-check-circle"></i>{{ feature }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="app-card p-4 h-100">
                <h2 class="detail-section-title" style="font-size: 1.15rem">
                  <i class="bi bi-code-square"></i>{{ $t('projects.challengesTitle') }}
                </h2>
                <ul class="challenge-list">
                  <li v-for="challenge in project.challenges.split('\n')" :key="challenge">
                    <i class="bi bi-exclamation-diamond"></i>{{ challenge }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div class="app-card p-4 h-100">
                <h2 class="detail-section-title" style="font-size: 1.15rem">
                  <i class="bi bi-lightbulb"></i>{{ $t('projects.lessonsTitle') }}
                </h2>
                <ul class="lesson-list">
                  <li v-for="lesson in project.lessons.split('\n')" :key="lesson">
                    <i class="bi bi-check-circle"></i>{{ lesson }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Bottom CTA -->
          <div class="text-center" data-aos="fade-up">
            <router-link class="btn btn-accent" to="/contact">
              <i class="bi bi-envelope me-1"></i>{{ $t('projects.cta') }}
            </router-link>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>