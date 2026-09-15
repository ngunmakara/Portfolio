<script setup>
import { computed } from 'vue'

const props = defineProps({
  testimonial: {
    type: Object,
    required: true,
  },
})

// Avatar = the person's initials (no fake photos needed).
const initials = computed(() => {
  const parts = props.testimonial.name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})
</script>

<template>
  <article class="app-card app-card-hover testimonial-card h-100" data-aos="fade-up">
    <i class="bi bi-quote" style="font-size: 2.2rem; color: var(--brand-a)"></i>
    <p class="testimonial-quote">“{{ testimonial.text }}”</p>
    <div class="testimonial-person">
      <span class="testimonial-avatar" aria-hidden="true">{{ initials }}</span>
      <div>
        <p class="testimonial-name">{{ testimonial.name }}</p>
        <p class="testimonial-role">{{ testimonial.role }}</p>
      </div>
    </div>
  </article>
</template>