<script setup lang="ts">
import { ref, onMounted } from "vue";
import InteractiveShell from "./InteractiveShell.vue";

const copied = ref(false);

function copyInstall() {
  navigator.clipboard.writeText("npm install @driangle/kleur");
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

// Animate elements on mount
const visible = ref(false);
onMounted(() => {
  requestAnimationFrame(() => (visible.value = true));
});
</script>

<template>
  <div class="kl-home" :class="{ visible }">
    <!-- Hero -->
    <section class="kl-hero">
      <h1 class="kl-hero-title">Kleur</h1>
      <p class="kl-hero-tagline">
        A minimal, zero-dependency color manipulation library. Lightweight by
        design, powerful by default.
      </p>
      <div class="kl-hero-actions">
        <a href="./guide/getting-started" class="kl-btn kl-btn-primary">
          Get Started
        </a>
        <a href="./api/color" class="kl-btn kl-btn-outline">
          API Reference
        </a>
      </div>
    </section>

    <!-- Live Code Exhibit -->
    <InteractiveShell />

    <!-- Feature Grid -->
    <section class="kl-features">
      <a href="./api/color" class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 3v1m0 16v1m8.66-13.5l-.87.5M4.21 16l-.87.5M20.66 16l-.87-.5M4.21 8l-.87-.5M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3>Manipulation</h3>
          <p>Adjust saturation, lightness, and alpha with functional precision.</p>
        </div>
        <div class="kl-feature-bar kl-bar-colorize">
          <div class="kl-bar-segment" style="--color: #e85d04"></div>
          <div class="kl-bar-segment" style="--color: #ffba08"></div>
        </div>
      </a>

      <a href="./api/harmony" class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
          <h3>Harmony</h3>
          <p>Generate complementary, triadic, and analogous palettes programmatically.</p>
        </div>
        <div class="kl-feature-bar kl-bar-multi kl-bar-colorize">
          <div class="kl-bar-segment" style="--color: #ff3e00"></div>
          <div class="kl-bar-segment" style="--color: #ff9e00"></div>
          <div class="kl-bar-segment" style="--color: #00c853"></div>
          <div class="kl-bar-segment" style="--color: #2979ff"></div>
          <div class="kl-bar-segment" style="--color: #aa00ff"></div>
        </div>
      </a>

      <a href="./api/analysis" class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-8 4 4 4-10" />
            </svg>
          </div>
          <h3>Analysis</h3>
          <p>Calculate WCAG contrast ratios and accessibility compliance.</p>
        </div>
        <div class="kl-feature-metric kl-bar-colorize">
          <span class="kl-metric-value">21.0</span>
          <span class="kl-metric-badge">AAA</span>
        </div>
      </a>

      <a href="./api/gradient" class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 20h16M4 20V4m16 16V4" />
              <path d="M8 16V8m4 8V6m4 10V10" />
            </svg>
          </div>
          <h3>Gradients</h3>
          <p>Fluent linear interpolation across any color space.</p>
        </div>
        <div class="kl-feature-bar kl-bar-gradient"></div>
      </a>
    </section>

    <!-- Install CTA -->
    <section class="kl-install">
      <button class="kl-install-btn" @click="copyInstall">
        <span class="kl-install-cmd">npm install @driangle/kleur</span>
        <span class="kl-install-copy">{{ copied ? "Copied!" : "Copy" }}</span>
      </button>
    </section>
  </div>
</template>

<style scoped>
.kl-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 120px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.kl-home.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Hero ── */
.kl-hero {
  padding: 100px 0 80px;
}

.kl-hero-title {
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: var(--kl-primary);
  margin: 0 0 32px;
}

.kl-hero-tagline {
  font-size: 1.25rem;
  color: var(--kl-outline);
  max-width: 520px;
  line-height: 1.7;
  margin: 0 0 48px;
  font-weight: 400;
}

.kl-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.kl-btn {
  display: inline-block;
  padding: 16px 40px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.kl-btn-primary {
  background: var(--kl-primary);
  color: var(--kl-on-primary);
  border-color: var(--kl-primary);
}

.kl-btn-primary:hover {
  background: var(--kl-on-surface-variant);
  border-color: var(--kl-on-surface-variant);
  transform: translateY(-1px);
}

.kl-btn-outline {
  background: transparent;
  color: var(--kl-primary);
  border-color: var(--kl-outline-variant);
}

.kl-btn-outline:hover {
  background: var(--kl-primary);
  color: var(--kl-on-primary);
  border-color: var(--kl-primary);
}

/* ── Features ── */
.kl-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 120px;
}

@media (min-width: 640px) {
  .kl-features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .kl-features {
    grid-template-columns: repeat(4, 1fr);
  }
}

.kl-feature {
  background: var(--kl-surface);
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 360px;
  border: 1px solid var(--kl-outline-variant);
  transition: border-color 0.2s, background 0.2s;
  text-decoration: none !important;
  cursor: pointer;
}

.kl-feature:hover {
  border-color: var(--kl-outline);
  background: var(--kl-surface-high);
}

.kl-feature-content {
  flex: 1;
}

.kl-feature-icon {
  color: var(--kl-on-surface);
  margin-bottom: 24px;
}

.kl-feature h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--kl-on-surface) !important;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}

.kl-feature p {
  font-size: 0.875rem;
  color: var(--kl-on-surface-variant) !important;
  line-height: 1.6;
  margin: 0;
}

/* ── Color bars ── */
.kl-feature-bar {
  display: flex;
  height: 56px;
  width: 100%;
  margin-top: 24px;
}

.kl-bar-segment {
  flex: 1;
  background: var(--color);
  filter: grayscale(1);
  transition: filter 0.4s ease;
}

.kl-feature:hover .kl-bar-segment {
  filter: grayscale(0);
}

.kl-bar-multi {
  gap: 3px;
}

/* Gradient bar */
.kl-bar-gradient {
  background: linear-gradient(to right, var(--kl-surface-highest), var(--kl-outline), var(--kl-outline-variant));
  transition: background 0.4s ease;
}

.kl-feature:hover .kl-bar-gradient {
  background: linear-gradient(to right, #e85d04, #ff9e00, #00c853, #2979ff);
}

/* ── Metric (Analysis card) ── */
.kl-feature-metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--kl-surface-dim);
  padding: 16px;
  margin-top: 24px;
}

.kl-metric-value {
  font-size: 2rem;
  font-weight: 900;
  color: var(--kl-on-surface);
}

.kl-metric-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 4px 10px;
  background: var(--kl-outline);
  color: var(--kl-surface-lowest);
  letter-spacing: 0.06em;
  transition: background 0.4s ease, color 0.4s ease;
}

.kl-feature:hover .kl-metric-badge {
  background: #00c853;
  color: #fff;
}

/* ── Install CTA ── */
.kl-install {
  display: flex;
  justify-content: center;
}

.kl-install-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  background: var(--kl-surface-highest);
  border: 1px solid var(--kl-outline-variant);
  color: var(--kl-on-surface);
  padding: 16px 24px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;
  min-width: 320px;
}

.kl-install-btn:hover {
  border-color: var(--kl-outline);
}

.kl-install-cmd {
  color: var(--kl-on-surface);
}

.kl-install-copy {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--kl-outline);
  font-family: var(--vp-font-family-base);
}
</style>
