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
    <span class="service-icon">
      <i :class="`bi ${service.icon}`"></i>
    </span>
    <h3 class="service-title">{{ service.title }}</h3>
    <p class="service-desc">{{ service.description }}</p>
    <ul class="service-features">
      <li v-for="feature in service.features" :key="feature">
        <i class="bi bi-check-lg"></i>{{ feature }}
      </li>
    </ul>
  </article>
</template>