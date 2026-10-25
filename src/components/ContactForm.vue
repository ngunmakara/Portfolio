<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { siteConfig } from '@/data/siteConfig'

const { t } = useI18n()

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
const sentName = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fields = ['name', 'email', 'subject', 'message']

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
  fields.forEach(validateField)
}

function hasErrors() {
  return Object.values(errors).some((error) => error !== '')
}

function onFieldInput(field) {
  if (touched.value) validateField(field)
}

async function handleSubmit() {
  touched.value = true
  validateAll()

  if (hasErrors()) return

  errorMessage.value = ''
  sending.value = true
  sentName.value = form.name

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
    Object.assign(errors, { name: '', email: '', subject: '', message: '' })
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
  sending.value = false
  errorMessage.value = ''
  sentName.value = ''
}
</script>

<template>
  <div class="row g-4 g-lg-5">
    <div class="col-lg-5" data-aos="fade-right">
      <div class="contact-side">
        <span class="availability-pill">
          <span class="dot" aria-hidden="true"></span>{{ $t('cta.availability') }}
        </span>
        <h2 class="contact-heading">{{ $t('contact.getInTouch') }}</h2>
        <p class="contact-lead">{{ $t('contact.getInTouchBody') }}</p>

        <div class="contact-info-list">
          <template v-for="item in contactItems" :key="item.label">
            <a
              v-if="item.href"
              class="app-card app-card-hover contact-info-card text-decoration-none"
              :href="item.href"
              :aria-label="`${item.label}: ${item.value}`"
            >
              <span class="icon-badge" aria-hidden="true">
                <i :class="`bi ${item.icon}`"></i>
              </span>
              <div>
                <p class="contact-info-label">{{ item.label }}</p>
                <p class="contact-info-value">{{ item.value }}</p>
              </div>
            </a>
            <div v-else class="app-card contact-info-card">
              <span class="icon-badge" aria-hidden="true">
                <i :class="`bi ${item.icon}`"></i>
              </span>
              <div>
                <p class="contact-info-label">{{ item.label }}</p>
                <p class="contact-info-value">{{ item.value }}</p>
              </div>
            </div>
          </template>
        </div>

        <ul class="contact-socials">
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
    </div>

    <div class="col-lg-7" data-aos="fade-left">
      <div class="app-card contact-form-card">
        <div v-if="submitted" class="form-success" role="status">
          <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
          <h3>{{ $t('contact.formSuccessTitle') }}</h3>
          <p>{{ $t('contact.formSuccessBody', { name: sentName }) }}</p>
          <button class="btn btn-accent btn-sm mt-3" type="button" @click="resetForm">
            {{ $t('btn.sendAnother') }}
          </button>
        </div>

        <form v-else novalidate @submit.prevent="handleSubmit">
          <div class="row g-4">
            <div class="col-md-6">
              <label class="form-label" for="contactName">
                {{ $t('contact.formName') }}<span class="req" aria-hidden="true">*</span>
              </label>
              <input
                id="contactName"
                v-model.trim="form.name"
                name="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.name }"
                :placeholder="$t('contact.formNamePlaceholder')"
                autocomplete="name"
                aria-required="true"
                :aria-invalid="touched && !!errors.name"
                :aria-describedby="touched && errors.name ? 'contactNameError' : undefined"
                @blur="validateField('name')"
                @input="onFieldInput('name')"
              />
              <div id="contactNameError" class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label" for="contactEmail">
                {{ $t('contact.formEmail') }}<span class="req" aria-hidden="true">*</span>
              </label>
              <input
                id="contactEmail"
                v-model.trim="form.email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.email }"
                :placeholder="$t('contact.formEmailPlaceholder')"
                autocomplete="email"
                aria-required="true"
                :aria-invalid="touched && !!errors.email"
                :aria-describedby="touched && errors.email ? 'contactEmailError' : undefined"
                @blur="validateField('email')"
                @input="onFieldInput('email')"
              />
              <div id="contactEmailError" class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <div class="col-12">
              <label class="form-label" for="contactSubject">
                {{ $t('contact.formSubject') }}<span class="req" aria-hidden="true">*</span>
              </label>
              <input
                id="contactSubject"
                v-model.trim="form.subject"
                name="subject"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.subject }"
                :placeholder="$t('contact.formSubjectPlaceholder')"
                autocomplete="off"
                aria-required="true"
                :aria-invalid="touched && !!errors.subject"
                :aria-describedby="touched && errors.subject ? 'contactSubjectError' : undefined"
                @blur="validateField('subject')"
                @input="onFieldInput('subject')"
              />
              <div id="contactSubjectError" class="invalid-feedback">{{ errors.subject }}</div>
            </div>

            <div class="col-12">
              <label class="form-label" for="contactMessage">
                {{ $t('contact.formMessage') }}<span class="req" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contactMessage"
                v-model.trim="form.message"
                name="message"
                rows="5"
                class="form-control"
                :class="{ 'is-invalid': touched && errors.message }"
                :placeholder="$t('contact.formMessagePlaceholder')"
                aria-required="true"
                :aria-invalid="touched && !!errors.message"
                :aria-describedby="touched && errors.message ? 'contactMessageError' : undefined"
                @blur="validateField('message')"
                @input="onFieldInput('message')"
              ></textarea>
              <div id="contactMessageError" class="invalid-feedback">{{ errors.message }}</div>
            </div>

            <div class="col-12">
              <button class="btn btn-accent w-100" type="submit" :disabled="sending">
                <span
                  v-if="sending"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <i v-else class="bi bi-send" aria-hidden="true"></i>
                {{ sending ? $t('contact.formSending') : $t('btn.send') }}
              </button>

              <div v-if="errorMessage" class="form-error" role="alert">
                <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                <span>{{ errorMessage }}</span>
              </div>

              <p class="form-note">
                <i class="bi bi-info-circle" aria-hidden="true"></i>
                {{ $t('contact.formNote') }}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
