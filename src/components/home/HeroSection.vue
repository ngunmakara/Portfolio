<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'
import { useTyping } from '@/composables/useTyping'
import SocialLinks from '@/components/ui/SocialLinks.vue'

// Import the image directly from src/assets
import profileImg from '@/assets/img/ngun-makara.jpg'

const { locale, tm } = useI18n()
const { typed, restart } = useTyping(tm('hero.typingWords'))

watch(locale, () => restart(tm('hero.typingWords')))
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-7">
          <div class="hero-eyebrow" data-aos="fade-down">
            <span class="dot"></span>{{ $t('hero.eyebrow') }}
          </div>

          <p class="hero-greeting" data-aos="fade-up" data-aos-delay="100">
            {{ $t('hero.greeting') }}
          </p>
          <h1 class="hero-name" data-aos="fade-up" data-aos-delay="150">
            <span class="text-gradient">{{ $t('hero.name') }}</span>
          </h1>

          <div class="hero-role" data-aos="fade-up" data-aos-delay="200" aria-live="polite">
            <span class="mono">{{ typed }}</span><span class="typing-caret" aria-hidden="true"></span>
          </div>

          <p class="hero-bio" data-aos="fade-up" data-aos-delay="250">
            {{ $t('hero.tagline') }}
          </p>

          <div class="d-flex flex-wrap gap-3 mb-4" data-aos="fade-up" data-aos-delay="300">
            <a class="btn btn-accent" :href="siteConfig.cvUrl" download>
              <i class="bi bi-download me-1"></i>{{ $t('btn.downloadCv') }}
            </a>
            <router-link class="btn btn-outline-accent" to="/projects">
              <i class="bi bi-folder2-open me-1"></i>{{ $t('btn.viewProjects') }}
            </router-link>
          </div>

          <SocialLinks size="lg" />
        </div>

        <div class="col-lg-5 d-none d-lg-block" data-aos="zoom-in" data-aos-delay="200">
          <div class="profile-wrap">
            <div class="profile-frame">
              <!-- Use the imported profileImg variable here -->
              <img
                :src="profileImg"
                :alt="$t('hero.profileAlt')"
              />
            </div>
            <div class="profile-float">
              <i class="bi bi-code-slash"></i>
              <span>{{ $t('hero.cleanCode') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>