<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'
import { projects } from '@/data/projects'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const { tm } = useI18n()

const githubUrl = siteConfig.githubProfileUrl
const username = computed(() => {
  const match = githubUrl.match(/github\.com\/([^/]+)/)
  return match ? match[1] : ''
})

const isReal = computed(() => !username.value.includes('your-github') && !!username.value)

const repoCount = ref(null)
const loadingRepos = ref(false)
const chartFailed = ref(false)
const avatarFailed = ref(false)

async function loadRepoCount() {
  if (!isReal.value) return
  loadingRepos.value = true
  try {
    const response = await fetch(`https://api.github.com/users/${username.value}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (response.ok) {
      const data = await response.json()
      repoCount.value = data.public_repos
    }
  } catch {
    // Offline or API error -> keep the fallback value.
  } finally {
    loadingRepos.value = false
  }
}

const githubProjects = computed(() =>
  projects
    .filter((project) => project.github)
    .slice(0, 4)
    .map((project) => ({ ...project, ...tm(`projects.items.${project.slug}`) }))
)

onMounted(loadRepoCount)
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionTitle tag="GitHub" :title="$t('github.title')" :highlight="$t('github.titleHighlight')" :subtitle="$t('github.subtitle')" />

      <div class="row g-4 justify-content-center">
        <div class="col-lg-5" data-aos="fade-right">
          <div class="app-card app-card-hover github-profile-card h-100">
            <div class="github-identity">
              <img
                v-if="isReal && !avatarFailed"
                class="github-avatar"
                :src="`https://github.com/${username}.png?size=120`"
                :alt="`${username} GitHub avatar`"
                width="52"
                height="52"
                loading="lazy"
                @error="avatarFailed = true"
              />
              <span v-else class="icon-badge" aria-hidden="true">
                <i class="bi bi-github"></i>
              </span>
              <div>
                <h3>{{ $t('github.profileTitle') }}</h3>
                <p class="github-handle">@{{ username || 'username' }}</p>
              </div>
            </div>

            <div class="github-stat">
              <div class="stat-value">{{ loadingRepos ? '…' : repoCount ?? '5+' }}</div>
              <div class="stat-label">{{ $t('github.publicRepos') }}</div>
            </div>

            <a class="btn btn-accent w-100" :href="githubUrl" target="_blank" rel="noopener">
              <i class="bi bi-github"></i>{{ isReal ? $t('btn.openMyGithub') : $t('btn.visitGithub') }}
            </a>
          </div>
        </div>

        <div class="col-lg-7" data-aos="fade-left">
          <div class="app-card github-code-card h-100">
            <h3 class="github-card-title">
              <i class="bi bi-activity" aria-hidden="true"></i>{{ $t('github.contributionTitle') }}
            </h3>

            <template v-if="isReal">
              <img
                v-if="!chartFailed"
                class="github-chart"
                :src="`https://ghchart.rshah.org/${username}`"
                :alt="`GitHub contribution chart for ${username}`"
                loading="lazy"
                @error="chartFailed = true"
              />
              <div v-else class="github-chart-fallback">
                <i class="bi bi-graph-up" aria-hidden="true"></i>
                <span>{{ $t('github.contributionPlaceholder') }}</span>
              </div>
              <p class="github-note">{{ $t('github.contributionNote') }}</p>
            </template>

            <div v-else class="placeholder-note">
              <i class="bi bi-graph-up" aria-hidden="true"></i>
              <h4>{{ $t('github.contributionPlaceholder') }}</h4>
              <p>{{ $t('github.contributionPlaceholderBody') }}</p>
            </div>

            <h3 class="github-card-title">
              <i class="bi bi-code-square" aria-hidden="true"></i>{{ $t('github.projectSourceCode') }}
            </h3>
            <ul class="github-repo-list">
              <li v-for="project in githubProjects" :key="project.id">
                <a class="btn-card-icon w-100" :href="project.github" target="_blank" rel="noopener">
                  <i class="bi bi-github" aria-hidden="true"></i>
                  <span class="github-repo-name">{{ project.title }}</span>
                  <i class="bi bi-box-arrow-up-right ms-auto" aria-hidden="true"></i>
                </a>
              </li>
              <li v-if="!githubProjects.length" class="text-muted">
                {{ $t('projects.empty') }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
