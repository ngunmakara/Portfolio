<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { skillCategories } from '@/data/skills'
import PageHeader from '@/components/ui/PageHeader.vue'
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
  <main>
    <PageHeader
      tag="Skills"
      :title="$t('skills.title')"
      :highlight="$t('skills.titleHighlight')"
      :subtitle="$t('skills.subtitle')"
    />

    <section class="section section-tight-top">
      <div class="container">
        <div v-for="category in localizedCategories" :key="category.id" class="category-block">
          <div class="category-head" data-aos="fade-up">
            <span
              class="icon-badge"
              :style="{ color: category.color, background: 'color-mix(in srgb, ' + category.color + ' 13%, transparent)', borderColor: 'color-mix(in srgb, ' + category.color + ' 26%, transparent)' }"
            >
              <i :class="`bi ${category.icon}`"></i>
            </span>
            <div>
              <h2>{{ category.title }}</h2>
              <p>{{ category.description }}</p>
            </div>
          </div>

          <div class="category-skills">
            <SkillCard
              v-for="(skill, index) in category.skills"
              :key="skill.name"
              :skill="skill"
              :color="category.color"
              :data-aos-delay="index * 50"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>