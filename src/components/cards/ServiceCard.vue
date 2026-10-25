<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="app-card app-card-hover service-card" data-aos="fade-up">
    <span class="service-icon" aria-hidden="true">
      <i :class="`bi ${service.icon}`"></i>
    </span>
    <h3 class="service-title">{{ service.title }}</h3>
    <p class="service-desc">{{ service.description }}</p>
    <ul class="service-features">
      <li v-for="feature in service.features" :key="feature">
        <i class="bi bi-check-lg" aria-hidden="true"></i>{{ feature }}
      </li>
    </ul>
  </article>
</template>