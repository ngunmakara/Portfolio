<script setup>
defineProps({
  certificate: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="app-card app-card-hover cert-card h-100" data-aos="zoom-in">
    <div class="cert-thumb">
      <img :src="certificate.image" :alt="`${certificate.name} certificate`" loading="lazy" />
    </div>
    <div class="cert-body">
      <p class="cert-meta mb-1">
        <i class="bi bi-calendar3 me-1"></i>{{ certificate.date }}
      </p>
      <h3 class="mb-2" style="font-size: 1.05rem">{{ certificate.name }}</h3>
      <p class="text-secondary mb-3" style="font-size: 0.88rem">{{ certificate.organization }}</p>

      <!-- data-bs-toggle=modal is handled by Bootstrap's JS bundle -->
      <button
        class="btn btn-outline-accent btn-sm w-100"
        type="button"
        data-bs-toggle="modal"
        :data-bs-target="`#certModal-${certificate.id}`"
        :aria-label="`View the ${certificate.name} certificate`"
      >
        <i class="bi bi-eye me-1"></i>{{ $t('btn.viewCertificate') }}
      </button>
    </div>

    <!-- Modal that opens when the view button is clicked -->
    <div
      class="modal fade"
      :id="`certModal-${certificate.id}`"
      tabindex="-1"
      :aria-labelledby="`certModal-${certificate.id}-label`"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content" style="border-radius: var(--radius)">
          <div class="modal-header">
            <h5 class="modal-title" :id="`certModal-${certificate.id}-label`">
              {{ certificate.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center">
            <p class="text-muted mb-3">
              <i class="bi bi-award me-1"></i>{{ certificate.organization }}
              <span class="mx-2">&bull;</span>
              <i class="bi bi-calendar3 me-1"></i>{{ certificate.date }}
            </p>
            <img
              :src="certificate.image"
              :alt="`${certificate.name} certificate — large view`"
              class="img-fluid rounded"
              style="border: 1px solid var(--border-color)"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-accent btn-sm" data-bs-dismiss="modal">
              {{ $t('btn.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>