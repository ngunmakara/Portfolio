<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'

const { t } = useI18n()

// Contact information shown next to the form (labels translated).
const contactItems = computed(() => [
  { label: t('contact.infoEmail'), value: t('contact.email'), icon: 'bi-envelope', href: `mailto:${siteConfig.contact.email}` },
  { label: t('contact.infoPhone'), value: t('contact.phone'), icon: 'bi-telephone', href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}` },
  { label: t('contact.infoLocation'), value: t('contact.location'), icon: 'bi-geo-alt', href: '' },
])

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const touched = ref(false)
const sending = ref(false)
const errorMessage = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field) {
  const value = form[field].trim()
  if (!value) {
    errors[field] = t('contact.errorRequired')
  } else if (field === 'email' && !emailPattern.test(value)) {
    errors[field] = t('contact.errorEmail')
  } else {
    errors[field] = ''
  }
}

function validateAll() {
  validateField('name')
  validateField('email')
  validateField('subject')
  validateField('message')
}

function hasErrors() {
  return Object.values(errors).some((error) => error !== '')
}

async function handleSubmit() {
  touched.value = true
  validateAll()

  if (hasErrors()) return

  // The bot token NEVER touches the frontend. The form payload is
  // sent to a serverless proxy (Cloudflare Worker) that injects the
  // token server-side and posts the message to Telegram.
  errorMessage.value = ''
  sending.value = true

  try {
    const response = await fetch(siteConfig.telegramProxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }),
    })

    if (!response.ok) throw new Error('Telegram proxy request failed')

    submitted.value = true
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch {
    errorMessage.value = t('contact.formError')
  } finally {
    sending.value = false
  }
}

function resetForm() {
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
  Object.assign(errors, { name: '', email: '', subject: '', message: '' })
  submitted.value = false
  touched.value = false
  errorMessage.value = ''
}
</script>

<template>
  <div class="row g-4">
    <!-- Contact information -->
    <div class="col-lg-5" data-aos="fade-right">
      <h3 class="mb-1" style="font-size: 1.4rem">{{ $t('contact.getInTouch') }}</h3>
      <p class="text-secondary mb-4">
        {{ $t('contact.getInTouchBody') }}
      </p>

      <div class="d-grid gap-3 mb-4">
        <a
          v-for="item in contactItems"
          :key="item.label"
          class="app-card app-card-hover contact-info-card text-decoration-none text-reset"
          :href="item.href || undefined"
          :aria-label="item.href ? `${item.label}: ${item.value}` : undefined"
        >
          <span class="icon-badge">
            <i :class="`bi ${item.icon}`"></i>
          </span>
          <div>
            <p class="contact-info-label mb-0">{{ item.label }}</p>
            <p class="contact-info-value mb-0">{{ item.value }}</p>
          </div>
        </a>
      </div>

      <ul class="d-flex gap-2 list-unstyled mb-0">
        <li v-for="social in siteConfig.socials" :key="social.id">
          <a
            class="social-btn"
            :href="social.url"
            target="_blank"
            rel="noopener"
            :aria-label="`Open my ${social.label} profile`"
            :title="social.label"
          >
            <i :class="`bi ${social.icon}`"></i>
          </a>
        </li>
      </ul>
    </div>

    <!-- Contact form -->
    <div class="col-lg-7" data-aos="fade-left">
      <div class="app-card p-4 p-lg-5">
        <!-- Success message (no real email is sent) -->
        <div v-if="submitted" class="form-success" role="status">
          <i class="bi bi-check-circle-fill"></i>
          <h4 class="mt-2 mb-1" style="font-size: 1.25rem">{{ $t('contact.formSuccessTitle') }}</h4>
          <p>{{ $t('contact.formSuccessBody', { name: form.name }) }}</p>
          <button class="btn btn-accent btn-sm mt-2" type="button" @click="resetForm">
            {{ $t('btn.sendAnother') }}
          </button>
        </div>

        <!-- Form -->
        <form v-else novalidate @submit.prevent="handleSubmit">
          <div class="row g-4">
            <div class="col-md-6">
              <label class="form-label" for="contactName">{{ $t('contact.formName') }}</label>
              <input
                id="contactName"
                v-model.trim="form.name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.name }"
                :placeholder="$t('contact.formNamePlaceholder')"
                @blur="validateField('name')"
              />
              <div class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label" for="contactEmail">{{ $t('contact.formEmail') }}</label>
              <input
                id="contactEmail"
                v-model.trim="form.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.email }"
                :placeholder="$t('contact.formEmailPlaceholder')"
                @blur="validateField('email')"
              />
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <div class="col-12">
              <label class="form-label" for="contactSubject">{{ $t('contact.formSubject') }}</label>
              <input
                id="contactSubject"
                v-model.trim="form.subject"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.subject }"
                :placeholder="$t('contact.formSubjectPlaceholder')"
                @blur="validateField('subject')"
              />
              <div class="invalid-feedback">{{ errors.subject }}</div>
            </div>

            <div class="col-12">
              <label class="form-label" for="contactMessage">{{ $t('contact.formMessage') }}</label>
              <textarea
                id="contactMessage"
                v-model.trim="form.message"
                rows="5"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.message }"
                :placeholder="$t('contact.formMessagePlaceholder')"
                @blur="validateField('message')"
              ></textarea>
              <div class="invalid-feedback">{{ errors.message }}</div>
            </div>

            <div class="col-12">
              <button class="btn btn-accent w-100" type="submit" :disabled="sending">
                <span
                  v-if="sending"
                  class="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                <i v-else class="bi bi-send me-1"></i>{{ sending ? $t('contact.formSending') : $t('btn.send') }}
              </button>

              <div v-if="errorMessage" class="form-error d-flex align-items-center gap-2 mt-3" role="alert">
                <i class="bi bi-exclamation-circle-fill"></i>
                <span>{{ errorMessage }}</span>
              </div>

              <p class="text-muted mt-3 mb-0" style="font-size: 0.8rem">
                <i class="bi bi-info-circle me-1"></i>
                {{ $t('contact.formNote') }}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>