<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import ContactForm from '@/components/ContactForm.vue'
</script>

<template>
  <main>
    <PageHeader
      tag="Contact"
      :title="$t('contact.title')"
      :highlight="$t('contact.titleHighlight')"
      :subtitle="$t('contact.subtitle')"
    />

    <section class="section" style="padding-top: 40px">
      <div class="container">
        <ContactForm />
      </div>
    </section>
  </main>
</template>