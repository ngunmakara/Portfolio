<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects, projectCategories } from '@/data/projects'
import PageHeader from '@/components/ui/PageHeader.vue'
import ProjectCard from '@/components/cards/ProjectCard.vue'

const { tm } = useI18n()

// Translated project fields merged on top of the static data.
const localizedProjects = computed(() =>
  projects.map((project) => ({ ...project, ...tm(`projects.items.${project.slug}`) }))
)

// Categories are ids ('all', 'frontend', …); labels are translated.
const activeCategory = ref('all')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return localizedProjects.value
  return localizedProjects.value.filter((project) => project.category.includes(activeCategory.value))
})

function setCategory(category) {
  activeCategory.value = category
}
</script>

<template>
  <main>
    <PageHeader
      tag="Projects"
      :title="$t('projects.title')"
      :highlight="$t('projects.titleHighlight')"
      :subtitle="$t('projects.subtitle')"
    />

    <section class="section section-tight-top">
      <div class="container">
        <div
          class="filter-bar"
          role="group"
          aria-label="Filter projects by category"
          data-aos="fade-up"
        >
          <button
            v-for="category in projectCategories"
            :key="category"
            type="button"
            class="filter-btn"
            :class="{ active: activeCategory === category }"
            :aria-pressed="activeCategory === category"
            @click="setCategory(category)"
          >
            {{ $t(`projects.categories.${category}`) }}
          </button>
        </div>

        <div class="row g-4">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="col-md-6 col-xxl-4"
          >
            <ProjectCard :project="project" :data-aos-delay="index * 80" />
          </div>
        </div>

        <p v-if="!filteredProjects.length" class="empty-state">
          {{ $t('projects.empty') }}
        </p>
      </div>
    </section>
  </main>
</template>