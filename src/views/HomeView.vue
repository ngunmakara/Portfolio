<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import AboutPreview from '@/components/home/AboutPreview.vue'
import SkillsPreview from '@/components/home/SkillsPreview.vue'
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import GitHubSection from '@/components/home/GitHubSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import CtaSection from '@/components/home/CtaSection.vue'
</script>

<template>
  <main>
    <HeroSection />
    <StatsSection />
    <AboutPreview />
    <SkillsPreview />
    <FeaturedProjects />
    <GitHubSection />
    <TestimonialsSection />
    <CtaSection />
  </main>
</template>