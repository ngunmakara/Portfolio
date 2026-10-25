<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectCard from '@/components/cards/ProjectCard.vue'

const { tm } = useI18n()

// Merge translated project fields (title, shortDescription, …) on top
// of the non-translated data (image, github, liveDemo, screenshots…).
const featuredProjects = computed(() =>
  projects
    .slice(0, 3)
    .map((project) => ({ ...project, ...tm(`projects.items.${project.slug}`) }))
)
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <SectionTitle
        tag="Projects"
        :title="$t('projects.featuredTitle')"
        :highlight="$t('projects.featuredTitleHighlight')"
        :subtitle="$t('projects.featuredSubtitle')"
      />

      <div class="row g-4">
        <div v-for="(project, index) in featuredProjects" :key="project.id" class="col-md-6 col-xxl-4">
          <ProjectCard :project="project" :data-aos-delay="index * 80" />
        </div>
      </div>

      <div class="text-center mt-5" data-aos="fade-up">
        <router-link class="btn btn-outline-accent" to="/projects">
          {{ $t('btn.viewAllProjects') }} <i class="bi bi-arrow-right ms-1"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>