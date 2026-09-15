<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { skillCategories } from '@/data/skills'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SkillCard from '@/components/cards/SkillCard.vue'

const { tm } = useI18n()

// Merge translated category names/descriptions + skill details.
const localizedCategories = computed(() =>
  skillCategories.map((category) => {
    const cat = tm(`skills.categories.${category.id}`)
    return {
      ...category,
      title: cat.title,
      description: cat.description,
      skills: category.skills.map((skill) => ({
        ...skill,
        detail: cat.skills[skill.id].detail,
      })),
    }
  })
)
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionTitle tag="Skills" :title="$t('skills.previewTitle')" :highlight="$t('skills.previewTitleHighlight')" />

      <div class="row g-4">
        <div
          v-for="(category, catIndex) in localizedCategories"
          :key="category.id"
          class="col-md-6 col-lg-3"
        >
          <div class="app-card app-card-hover h-100 p-4" data-aos="fade-up" :data-aos-delay="catIndex * 100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <span class="icon-badge" :style="{ color: category.color, background: 'color-mix(in srgb, ' + category.color + ' 14%, transparent)' }">
                <i :class="`bi ${category.icon}`"></i>
              </span>
              <h3 class="mb-0" style="font-size: 1.1rem">{{ category.title }}</h3>
            </div>
            <div class="d-grid gap-3">
              <SkillCard
                v-for="skill in category.skills.slice(0, 3)"
                :key="skill.name"
                :skill="skill"
                :color="category.color"
              />
            </div>
            <router-link to="/skills" class="btn btn-ghost btn-sm w-100 mt-3">
              {{ $t('btn.viewAllSkills') }} <i class="bi bi-arrow-right ms-1"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>