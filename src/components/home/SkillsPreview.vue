<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { skillCategories } from '@/data/skills'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SkillCard from '@/components/cards/SkillCard.vue'

const { tm } = useI18n()

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
          class="col-sm-6 col-xl-3"
        >
          <div class="app-card app-card-hover skill-category-card" data-aos="fade-up" :data-aos-delay="catIndex * 80">
            <div class="skill-category-head">
              <span
                class="icon-badge"
                :style="{ color: category.color, background: 'color-mix(in srgb, ' + category.color + ' 13%, transparent)', borderColor: 'color-mix(in srgb, ' + category.color + ' 26%, transparent)' }"
              >
                <i :class="`bi ${category.icon}`"></i>
              </span>
              <h3>{{ category.title }}</h3>
              <span class="skill-category-count">{{ category.skills.length }}</span>
            </div>

            <div class="skill-list">
              <SkillCard
                v-for="skill in category.skills.slice(0, 3)"
                :key="skill.name"
                :skill="skill"
                :color="category.color"
                compact
              />
            </div>

            <router-link to="/skills" class="btn btn-ghost btn-sm">
              {{ $t('btn.viewAllSkills') }} <i class="bi bi-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
