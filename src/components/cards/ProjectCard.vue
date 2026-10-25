<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()

const categoryLabel = computed(() => {
  const category = props.project.category?.[0]
  return category ? t(`projects.categories.${category}`) : ''
})
</script>

<template>
  <article class="app-card app-card-hover project-card" data-aos="fade-up">
    <div class="project-thumb">
      <router-link :to="`/projects/${project.slug}`" :aria-label="`View details of ${project.title}`">
        <img :src="project.image" :alt="`${project.title} screenshot`" loading="lazy" decoding="async" />
      </router-link>
      <span v-if="categoryLabel" class="project-badge">{{ categoryLabel }}</span>
      <router-link
        class="project-open"
        :to="`/projects/${project.slug}`"
        :aria-label="`View details of ${project.title}`"
      >
        <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
      </router-link>
    </div>

    <div class="project-card-body">
      <h3 class="project-title">
        <router-link :to="`/projects/${project.slug}`">{{ project.title }}</router-link>
      </h3>
      <p class="project-desc">{{ project.shortDescription }}</p>

      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</span>
      </div>

      <div class="project-links">
        <a
          v-if="project.github"
          class="btn-card-icon"
          :href="project.github"
          target="_blank"
          rel="noopener"
          :aria-label="`Open ${project.title} source code on GitHub`"
        >
          <i class="bi bi-github" aria-hidden="true"></i>GitHub
        </a>
        <a
          v-if="project.liveDemo"
          class="btn-card-icon"
          :href="project.liveDemo"
          target="_blank"
          rel="noopener"
          :aria-label="`Open the ${project.title} live demo`"
        >
          <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>{{ $t('btn.liveDemo') }}
        </a>
        <router-link
          class="btn-card-icon is-primary"
          :to="`/projects/${project.slug}`"
          :aria-label="`View details of ${project.title}`"
        >
          <i class="bi bi-arrow-right" aria-hidden="true"></i>{{ $t('btn.viewDetails') }}
        </router-link>
      </div>
    </div>
  </article>
</template>
