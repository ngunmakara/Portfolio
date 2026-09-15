<script setup>
import { testimonials } from '@/data/testimonials'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TestimonialCard from '@/components/cards/TestimonialCard.vue'
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <SectionTitle
        tag="Testimonials"
        :title="$t('testimonials.title')"
        :highlight="$t('testimonials.titleHighlight')"
        :subtitle="$t('testimonials.subtitle')"
      />

      <!-- No testimonials yet -> honest professional placeholder -->
      <div v-if="!testimonials.length" data-aos="fade-up">
        <div class="placeholder-note">
          <i class="bi bi-chat-quote"></i>
          <h4>{{ $t('testimonials.comingSoon') }}</h4>
          <p>{{ $t('testimonials.comingSoonBody') }}</p>
        </div>
      </div>

      <div v-else class="row g-4">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="col-md-6 col-lg-4"
        >
          <TestimonialCard :testimonial="testimonial" :data-aos-delay="index * 100" />
        </div>
      </div>
    </div>
  </section>
</template>