<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'
import { useTyping } from '@/composables/useTyping'
import SocialLinks from '@/components/ui/SocialLinks.vue'

const { locale, tm } = useI18n()
const { typed, restart } = useTyping(tm('hero.typingWords'))

watch(locale, () => restart(tm('hero.typingWords')))
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="row align-items-center g-4 g-lg-5">
        <div class="col-lg-7">
          <div class="hero-eyebrow" data-aos="fade-down">
            <span class="dot" aria-hidden="true"></span>{{ $t('hero.eyebrow') }}
          </div>

          <p class="hero-greeting" data-aos="fade-up" data-aos-delay="80">
            {{ $t('hero.greeting') }}
          </p>
          <h1 class="hero-name" data-aos="fade-up" data-aos-delay="120">
            <span>{{ $t('hero.firstName') }}</span>
            <span class="text-gradient">{{ $t('hero.lastName') }}</span>
          </h1>

          <div class="hero-role" data-aos="fade-up" data-aos-delay="170" aria-live="polite">
            <span class="mono">{{ typed }}</span><span class="typing-caret" aria-hidden="true"></span>
          </div>

          <p class="hero-bio" data-aos="fade-up" data-aos-delay="220">
            {{ $t('hero.tagline') }}
          </p>

          <div class="hero-actions" data-aos="fade-up" data-aos-delay="270">
            <a class="btn btn-accent" :href="siteConfig.cvUrl" download>
              <i class="bi bi-download"></i>{{ $t('btn.downloadCv') }}
            </a>
            <router-link class="btn btn-outline-accent" to="/projects">
              <i class="bi bi-folder2-open"></i>{{ $t('btn.viewProjects') }}
            </router-link>
          </div>

          <div class="hero-social-row" data-aos="fade-up" data-aos-delay="320">
            <SocialLinks size="lg" />
            <span class="hero-divider" aria-hidden="true"></span>
            <span class="hero-location">
              <i class="bi bi-geo-alt" aria-hidden="true"></i>{{ $t('about.location') }}
            </span>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="profile-wrap" data-aos="zoom-in" data-aos-delay="180">
            <div class="profile-frame">
              <img
                :src="siteConfig.profileImage"
                :alt="$t('hero.profileAlt')"
                width="1068"
                height="1473"
                fetchpriority="high"
                decoding="async"
              />
            </div>
            <div class="profile-badge profile-badge--top">
              <i class="bi bi-code-slash" aria-hidden="true"></i>
              <span>{{ $t('hero.cleanCode') }}</span>
            </div>
            <div class="profile-badge profile-badge--bottom">
              <i class="bi bi-geo-alt" aria-hidden="true"></i>
              <span>{{ $t('about.location') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
