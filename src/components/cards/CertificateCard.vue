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
      <img
        :src="certificate.image"
        :alt="`${certificate.name} certificate`"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="cert-body">
      <p class="cert-meta">
        <i class="bi bi-calendar3" aria-hidden="true"></i>{{ certificate.date }}
      </p>
      <h3 class="cert-name">{{ certificate.name }}</h3>
      <p class="cert-org">{{ certificate.organization }}</p>

      <button
        class="btn btn-outline-accent btn-sm w-100"
        type="button"
        data-bs-toggle="modal"
        :data-bs-target="`#certModal-${certificate.id}`"
        :aria-label="`View the ${certificate.name} certificate`"
      >
        <i class="bi bi-eye" aria-hidden="true"></i>{{ $t('btn.viewCertificate') }}
      </button>
    </div>

    <Teleport to="body">
      <div
        class="modal fade"
        :id="`certModal-${certificate.id}`"
        tabindex="-1"
        :aria-labelledby="`certModal-${certificate.id}-label`"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
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
              <p class="cert-meta justify-content-center">
                <i class="bi bi-award" aria-hidden="true"></i>{{ certificate.organization }}
                <span class="mx-2" aria-hidden="true">&bull;</span>
                <i class="bi bi-calendar3" aria-hidden="true"></i>{{ certificate.date }}
              </p>
              <img
                :src="certificate.image"
                :alt="`${certificate.name} certificate — large view`"
                class="img-fluid cert-modal-img"
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
    </Teleport>
  </article>
</template>
