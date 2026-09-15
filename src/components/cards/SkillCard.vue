<script setup>
defineProps({
  skill: {
    type: Object,
    required: true,
  },
  color: {
    type: String,
    default: '#6366f1',
  },
})
</script>

<template>
  <div class="app-card app-card-hover skill-card" data-aos="fade-up">
    <div class="skill-name">
      <span>{{ skill.name }}</span>
      <span class="skill-level">{{ skill.level }}%</span>
    </div>
    <div
      class="progress"
      role="progressbar"
      :aria-label="`${skill.name} skill level`"
      :aria-valuenow="skill.level"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="progress-bar"
        :style="{ width: skill.level + '%', background: color }"
      ></div>
    </div>
    <p v-if="skill.detail" class="skill-detail">{{ skill.detail }}</p>
  </div>
</template>