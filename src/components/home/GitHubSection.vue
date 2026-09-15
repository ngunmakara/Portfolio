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


async function loadRepoCount() {
  if (!isReal.value) return
  loadingRepos.value = true
  try {
    const response = await fetch(`https://github.com/ngunmakara`)
    if (response.ok) {
      const data = await response.json()
      repoCount.value = data.public_repos
    }
  } catch {
    // Offline or API error -> keep the placeholder value.
  } finally {
    loadingRepos.value = false
  }
}

const githubProjects = computed(() =>
  projects
    .filter((p) => p.github)
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
          <div class="app-card app-card-hover p-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <span class="icon-badge">
                <i class="bi bi-github"></i>
              </span>
              <div>
                <h3 class="mb-0" style="font-size: 1.1rem">{{ $t('github.profileTitle') }}</h3>
                <p class="mb-0 text-muted" style="font-size: 0.85rem">@{{ username || 'username' }}</p>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 mb-4">
              <div class="app-card p-3 text-center flex-fill">
                <div class="stat-value" style="font-size: 1.8rem">
                  {{ loadingRepos ? '…' : repoCount ?? '5+' }}
                </div>
                <div class="stat-label" style="font-size: 0.8rem">{{ $t('github.publicRepos') }}</div>
              </div>
            </div>

            <a
              v-if="isReal"
              class="btn btn-accent w-100"
              :href="githubUrl"
              target="_blank"
              rel="noopener"
            >
              <i class="bi bi-github me-1"></i>{{ $t('btn.openMyGithub') }}
            </a>
            <a v-else class="btn btn-accent w-100" :href="githubUrl" target="_blank" rel="noopener">
              <i class="bi bi-github me-1"></i>{{ $t('btn.visitGithub') }}
            </a>
          </div>
        </div>

        <div class="col-lg-7" data-aos="fade-left">
          <div class="app-card app-card-hover p-4 h-100">
            <h3 class="mb-3" style="font-size: 1.1rem">
              <i class="bi bi-activity me-2" style="color: var(--brand-a)"></i>{{ $t('github.contributionTitle') }}
            </h3>

            <template v-if="isReal">
              <img
                class="img-fluid rounded mb-3"
                :src="`https://ghchart.rshah.org/${username}`"
                :alt="`GitHub contribution chart for ${username}`"
                loading="lazy"
              />
              <p class="text-muted mb-0" style="font-size: 0.82rem">
                {{ $t('github.contributionNote') }}
              </p>
            </template>
            <template v-else>
              <div class="placeholder-note mb-3" style="padding: 26px 20px">
                <i class="bi bi-graph-up"></i>
                <h4 style="font-size: 1rem">{{ $t('github.contributionPlaceholder') }}</h4>
                <p style="font-size: 0.88rem">{{ $t('github.contributionPlaceholderBody') }}</p>
              </div>
            </template>

            <h4 class="mt-4 mb-2" style="font-size: 0.95rem">{{ $t('github.projectSourceCode') }}</h4>
            <ul class="list-unstyled mb-0 d-grid gap-2">
              <li v-for="project in githubProjects" :key="project.id">
                <a class="btn-card-icon w-100" :href="project.github" target="_blank" rel="noopener">
                  <i class="bi bi-github"></i>{{ project.title }}
                  <i class="bi bi-box-arrow-up-right ms-auto"></i>
                </a>
              </li>
              <li v-if="!githubProjects.length" class="text-muted" style="font-size: 0.88rem">
                Add GitHub links in <code>src/data/projects.js</code> to list them here.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>