<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 1068,
  },
  height: {
    type: Number,
    default: 1473,
  },
})

const technologies = [
  { id: 'html', label: 'HTML5', icon: 'bi-filetype-html', color: '#f06529', angle: 0 },
  { id: 'css', label: 'CSS3', icon: 'bi-filetype-css', color: '#3b82f6', angle: 60 },
  { id: 'javascript', label: 'JavaScript', icon: 'bi-filetype-js', color: '#f7df1e', angle: 120 },
  { id: 'vue', label: 'Vue.js', icon: '', color: '#42b883', angle: 180 },
  { id: 'java', label: 'Java', icon: 'bi-filetype-java', color: '#f89820', angle: 240 },
  { id: 'springboot', label: 'Spring Boot', icon: 'bi-leaf-fill', color: '#6db33f', angle: 300 },
]

const particles = Array.from({ length: 14 }, (_, index) => {
  const angle = (index / 14) * Math.PI * 2 + 0.4
  const radius = 40 + ((index * 13) % 9)

  return {
    id: index,
    style: {
      '--x': `${(50 + Math.cos(angle) * radius).toFixed(2)}%`,
      '--y': `${(50 + Math.sin(angle) * radius).toFixed(2)}%`,
      '--size': `${3 + (index % 3)}px`,
      '--delay': `${(index * 0.55).toFixed(2)}s`,
      '--duration': `${7 + (index % 5)}s`,
      '--dx': `${Math.round(Math.cos(angle) * (6 + (index % 4) * 2))}px`,
      '--dy': `${-6 - (index % 5) * 2}px`,
      '--particle-color': index % 2 ? 'var(--brand-c)' : 'var(--brand-a)',
    },
  }
})
</script>

<template>
  <div class="profile-orbit">
    <div class="orbit__decor" aria-hidden="true">
      <div class="orbit__aura"></div>
      <div class="orbit__ring orbit__ring--outer"></div>
      <div class="orbit__ring orbit__ring--inner"></div>
      <div class="orbit__ring orbit__ring--dashed"></div>

      <div class="orbit__particles">
        <span
          v-for="particle in particles"
          :key="particle.id"
          class="orbit__particle"
          :style="particle.style"
        ></span>
      </div>

      <div class="orbit__icons">
        <div
          v-for="tech in technologies"
          :key="tech.id"
          class="orbit__icon"
          :style="{ '--orbit-angle': `${tech.angle}deg`, '--tech-color': tech.color }"
        >
          <div class="orbit__icon-pos">
            <div class="orbit__badge" :title="tech.label">
              <svg
                v-if="tech.id === 'vue'"
                class="orbit__vue"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M2.2 3.2h4.1L12 13.1 17.7 3.2h4.1L12 21.2 2.2 3.2Z" fill="currentColor" opacity=".45" />
                <path d="M5.4 3.2h3.2L12 9.4l3.4-6.2h3.2L12 16.8 5.4 3.2Z" fill="currentColor" />
              </svg>
              <i v-else :class="['bi', tech.icon]" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="orbit__avatar-float">
      <div class="orbit__avatar">
        <img
          :src="image"
          :alt="alt"
          :width="width"
          :height="height"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-orbit {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 460px;
  aspect-ratio: 1;
  margin: 0 auto;
}

.orbit__decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orbit__aura {
  position: absolute;
  inset: 8%;
  z-index: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 38% 34%, color-mix(in srgb, var(--brand-a) 38%, transparent), transparent 62%),
    radial-gradient(circle at 66% 70%, color-mix(in srgb, var(--brand-c) 34%, transparent), transparent 64%);
  opacity: 0.55;
  transform: scale(0.94);
  animation: orbit-breathe 7s ease-in-out infinite;
}

.orbit__ring {
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  opacity: 0.85;
  transition: opacity 0.35s ease;
  will-change: transform;
}

.orbit__ring--outer {
  inset: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0deg 24deg,
    var(--brand-b) 58deg,
    var(--brand-a) 118deg,
    transparent 164deg 204deg,
    var(--brand-c) 246deg,
    var(--brand-a) 302deg,
    transparent 342deg 360deg
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  animation: orbit-spin 20s linear infinite;
}

.orbit__ring--inner {
  inset: 9%;
  background: conic-gradient(
    from 180deg,
    transparent 0deg 42deg,
    var(--brand-c) 88deg,
    var(--brand-a) 148deg,
    transparent 198deg 294deg,
    var(--brand-b) 330deg,
    transparent 354deg 360deg
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
  animation: orbit-spin 28s linear infinite reverse;
}

.orbit__ring--dashed {
  inset: 4.5%;
  border: 1px dashed color-mix(in srgb, var(--brand-a) 34%, transparent);
  opacity: 0.6;
  animation: none;
}

.orbit__particles {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.orbit__particle {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: radial-gradient(circle, #fff 0%, var(--particle-color) 42%, transparent 72%);
  opacity: 0;
  animation: orbit-particle var(--duration) ease-in-out var(--delay) infinite;
}

.orbit__icons {
  position: absolute;
  inset: 4.5%;
  z-index: 3;
  animation: orbit-spin 30s linear infinite;
  will-change: transform;
}

.orbit__icon {
  position: absolute;
  inset: 0;
  transform: rotate(var(--orbit-angle));
}

.orbit__icon-pos {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) rotate(calc(-1 * var(--orbit-angle)));
}

.orbit__badge {
  display: grid;
  place-items: center;
  width: clamp(2rem, 6.5vw, 2.6rem);
  aspect-ratio: 1;
  border: 1px solid color-mix(in srgb, var(--tech-color) 58%, transparent);
  border-radius: 50%;
  background: rgba(7, 10, 18, 0.82);
  color: var(--tech-color);
  font-size: clamp(0.98rem, 2.6vw, 1.22rem);
  box-shadow:
    0 0 0 1px color-mix(in srgb, #ffffff 6%, transparent) inset,
    0 0 16px color-mix(in srgb, var(--tech-color) 38%, transparent);
  animation: orbit-counter 30s linear infinite;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.orbit__vue {
  width: 1em;
  height: 1em;
}

.orbit__avatar-float {
  position: absolute;
  inset: 12.5%;
  z-index: 4;
  animation: orbit-float 7s ease-in-out infinite;
  will-change: transform;
}

.orbit__avatar {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 50%;
  background: conic-gradient(
    from 120deg,
    var(--brand-a),
    var(--brand-c),
    var(--brand-b),
    var(--brand-a)
  );
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--brand-a) 30%, transparent),
    0 18px 40px -18px color-mix(in srgb, var(--brand-a) 65%, transparent),
    0 0 34px color-mix(in srgb, var(--brand-c) 28%, transparent);
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.45s ease;
}

.orbit__avatar img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--surface-alt);
  object-fit: cover;
  object-position: center top;
}

@media (hover: hover) {
  .profile-orbit:hover .orbit__avatar {
    transform: scale(1.035);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--brand-b) 55%, transparent),
      0 22px 52px -18px color-mix(in srgb, var(--brand-a) 78%, transparent),
      0 0 58px color-mix(in srgb, var(--brand-c) 48%, transparent);
  }

  .profile-orbit:hover .orbit__ring {
    opacity: 1;
  }

  .profile-orbit:hover .orbit__aura {
    opacity: 0.9;
  }

  .profile-orbit:hover .orbit__badge {
    border-color: var(--tech-color);
    box-shadow:
      0 0 0 1px color-mix(in srgb, #ffffff 10%, transparent) inset,
      0 0 24px color-mix(in srgb, var(--tech-color) 62%, transparent);
  }
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-counter {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes orbit-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -8px, 0);
  }
}

@keyframes orbit-breathe {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.94);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.05);
  }
}

@keyframes orbit-particle {
  0%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.6);
  }
  25% {
    opacity: 0.85;
  }
  50% {
    opacity: 0.95;
    transform: translate3d(var(--dx), var(--dy), 0) scale(1);
  }
  75% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orbit__aura,
  .orbit__ring,
  .orbit__particle,
  .orbit__icons,
  .orbit__badge,
  .orbit__avatar-float {
    animation: none !important;
  }

  .orbit__particle {
    opacity: 0.5;
  }

  .profile-orbit:hover .orbit__avatar {
    transform: none;
  }
}
</style>
