<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="timeline-item" data-aos="fade-up">
    <span class="timeline-dot" aria-hidden="true">
      <i :class="`bi ${item.icon}`"></i>
    </span>
    <span class="timeline-period">{{ item.period }}</span>
    <h3 class="timeline-title">{{ item.title }}</h3>
    <p class="timeline-place">
      <i class="bi bi-geo-alt me-1"></i>{{ item.place }}
    </p>
    <p class="timeline-desc">{{ item.description }}</p>
    <div class="timeline-tags">
      <span v-for="tag in item.tags" :key="tag" class="chip">{{ tag }}</span>
    </div>
  </li>
</template>