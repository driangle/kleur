<script setup lang="ts">
import { ref, onMounted } from "vue";
import InteractiveShell from "./InteractiveShell.vue";

const copied = ref(false);

function copyInstall() {
  navigator.clipboard.writeText("npm install kleur");
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
        Open-source color manipulation for developers. A disciplined approach to
        the visual spectrum.
      </p>
      <div class="kl-hero-actions">
        <a href="./guide/getting-started" class="kl-btn kl-btn-primary">
          Get Started
        </a>
        <a href="./api/kleur-struct" class="kl-btn kl-btn-outline">
          API Reference
        </a>
      </div>
    </section>

    <!-- Live Code Exhibit -->
    <InteractiveShell />

    <!-- Feature Grid -->
    <section class="kl-features">
      <div class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M12 3v1m0 16v1m8.66-13.5l-.87.5M4.21 16l-.87.5M20.66 16l-.87-.5M4.21 8l-.87-.5M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3>Manipulation</h3>
          <p>
            Adjust saturation, lightness, and alpha with functional precision.
          </p>
        </div>
        <div class="kl-feature-bar">
          <div class="kl-bar-segment" style="background: #474747"></div>
          <div class="kl-bar-segment" style="background: #ffffff"></div>
        </div>
      </div>

      <div class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
          <h3>Harmony</h3>
          <p>
            Generate complementary, triadic, and analogous palettes
            programmatically.
          </p>
        </div>
        <div class="kl-feature-bar kl-bar-multi">
          <div class="kl-bar-segment" style="background: #1a1a1a"></div>
          <div class="kl-bar-segment" style="background: #333"></div>
          <div class="kl-bar-segment" style="background: #666"></div>
          <div class="kl-bar-segment" style="background: #999"></div>
          <div class="kl-bar-segment" style="background: #ccc"></div>
        </div>
      </div>

      <div class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 3v18h18" />
              <path d="M7 16l4-8 4 4 4-10" />
            </svg>
          </div>
          <h3>Analysis</h3>
          <p>
            Calculate WCAG contrast ratios and accessibility compliance.
          </p>
        </div>
        <div class="kl-feature-metric">
          <span class="kl-metric-value">21.0</span>
          <span class="kl-metric-badge">AAA</span>
        </div>
      </div>

      <div class="kl-feature">
        <div class="kl-feature-content">
          <div class="kl-feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 20h16M4 20V4m16 16V4" />
              <path d="M8 16V8m4 8V6m4 10V10" />
            </svg>
          </div>
          <h3>Gradients</h3>
          <p>Fluent linear interpolation across any color space.</p>
        </div>
        <div
          class="kl-feature-bar"
          style="background: linear-gradient(to right, #000, #666, #fff)"
        ></div>
      </div>
    </section>

    <!-- Architecture Section -->
    <section class="kl-arch">
      <div class="kl-arch-text">
        <h2>The Architecture of Color</h2>
        <p>
          Kleur treats color as data. By decoupling visual representation from
          mathematical values, we provide a robust engine for design systems that
          need to scale. No bloat, no dependencies, just raw manipulation power.
        </p>
        <ul class="kl-arch-list">
          <li><span class="kl-dot-sm"></span> Ultra Lightweight (&lt; 2kb)</li>
          <li><span class="kl-dot-sm"></span> Fully Typed API</li>
          <li><span class="kl-dot-sm"></span> Zero Dependencies</li>
        </ul>
      </div>
      <div class="kl-arch-visual">
        <div class="kl-grid-overlay">
          <div v-for="i in 16" :key="i" class="kl-grid-cell"></div>
        </div>
        <div class="kl-arch-center">
          <div class="kl-color-wheel">
            <div
              class="kl-wheel-segment"
              v-for="(c, i) in [
                '#ff3e00',
                '#ff7f00',
                '#ffbf00',
                '#bfff00',
                '#00ff3e',
                '#00bfff',
                '#003eff',
                '#7f00ff',
              ]"
              :key="i"
              :style="{
                background: c,
                transform: `rotate(${i * 45}deg) translateY(-40px)`,
                opacity: 0.6,
              }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Install CTA -->
    <section class="kl-install">
      <button class="kl-install-btn" @click="copyInstall">
        <span class="kl-install-cmd">npm install kleur</span>
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
  color: #fff;
  margin: 0 0 32px;
}

.kl-hero-tagline {
  font-size: 1.25rem;
  color: #919191;
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
  background: #fff;
  color: #1a1c1c;
  border-color: #fff;
}

.kl-btn-primary:hover {
  background: #d4d4d4;
  border-color: #d4d4d4;
  transform: translateY(-1px);
}

.kl-btn-outline {
  background: transparent;
  color: #fff;
  border-color: #474747;
}

.kl-btn-outline:hover {
  background: #fff;
  color: #1a1c1c;
  border-color: #fff;
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
  background: #201f1f;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 360px;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.kl-feature:hover {
  border-color: #474747;
}

.kl-feature-content {
  flex: 1;
}

.kl-feature-icon {
  color: #fff;
  margin-bottom: 24px;
}

.kl-feature h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}

.kl-feature p {
  font-size: 0.875rem;
  color: #919191;
  line-height: 1.6;
  margin: 0;
}

.kl-feature-bar {
  display: flex;
  height: 56px;
  width: 100%;
  margin-top: 24px;
}

.kl-bar-segment {
  flex: 1;
}

.kl-bar-multi {
  gap: 3px;
}

.kl-feature-metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0e0e0e;
  padding: 16px;
  margin-top: 24px;
}

.kl-metric-value {
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
}

.kl-metric-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 4px 10px;
  background: #fff;
  color: #000;
  letter-spacing: 0.06em;
}

/* ── Architecture ── */
.kl-arch {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  padding-top: 80px;
  border-top: 1px solid rgba(71, 71, 71, 0.3);
  margin-bottom: 120px;
}

@media (min-width: 768px) {
  .kl-arch {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
}

.kl-arch h2 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
  margin: 0 0 32px;
  border: none !important;
  padding: 0 !important;
}

.kl-arch-text p {
  color: #919191;
  line-height: 1.8;
  margin: 0 0 32px;
}

.kl-arch-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.kl-arch-list li {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #fff;
}

.kl-dot-sm {
  width: 6px;
  height: 6px;
  background: #fff;
  flex-shrink: 0;
}

.kl-arch-visual {
  aspect-ratio: 1;
  background: #0e0e0e;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.kl-grid-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  opacity: 0.15;
  transition: opacity 0.4s;
}

.kl-arch-visual:hover .kl-grid-overlay {
  opacity: 0.3;
}

.kl-grid-cell {
  border: 0.5px solid #fff;
}

.kl-arch-center {
  position: relative;
  z-index: 1;
}

.kl-color-wheel {
  width: 120px;
  height: 120px;
  position: relative;
}

.kl-wheel-segment {
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  transition: opacity 0.5s;
}

.kl-arch-visual:hover .kl-wheel-segment {
  opacity: 0.9 !important;
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
  background: #353534;
  border: 1px solid #474747;
  color: #fff;
  padding: 16px 24px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;
  min-width: 320px;
}

.kl-install-btn:hover {
  border-color: #919191;
}

.kl-install-cmd {
  color: #e5e2e1;
}

.kl-install-copy {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #919191;
  font-family: var(--vp-font-family-base);
}
</style>
