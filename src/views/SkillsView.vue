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

    <section class="section" style="padding-top: 40px">
      <div class="container">
        <div class="d-grid gap-5">
          <div v-for="(category, catIndex) in localizedCategories" :key="category.id">
            <div class="d-flex align-items-center gap-3 mb-4" data-aos="fade-up">
              <span
                class="icon-badge"
                :style="{ color: category.color, background: 'color-mix(in srgb, ' + category.color + ' 14%, transparent)' }"
              >
                <i :class="`bi ${category.icon}`"></i>
              </span>
              <div>
                <h2 class="mb-1" style="font-size: 1.5rem">{{ category.title }}</h2>
                <p class="mb-0 text-secondary" style="font-size: 0.9rem">{{ category.description }}</p>
              </div>
            </div>

            <div class="row g-4">
              <div
                v-for="(skill, index) in category.skills"
                :key="skill.name"
                class="col-md-6 col-lg-4"
              >
                <SkillCard
                  :skill="skill"
                  :color="category.color"
                  :data-aos-delay="index * 60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>