<script setup lang="ts">
import { computed, ref } from "vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const seedHex = ref("#3a6bd5");
const scheme = ref<"dark" | "light">("dark");

const theme = computed(() => {
  const seed = kleur(seedHex.value);
  const isDark = scheme.value === "dark";

  const primary = seed.toHex();
  const primaryLight = seed.lighten(0.3).toHex();
  const primaryDark = seed.darken(0.3).toHex();
  const surface = isDark ? "#141414" : "#f5f5f5";
  const surfaceDim = isDark ? "#1e1e1e" : "#e8e8e8";
  const surfaceHigh = isDark ? "#2a2a2a" : "#dedede";
  const onSurface = isDark ? "#e8e8e8" : "#1a1a1a";
  const onPrimary = readableTextColor(primary);

  const contrastRatio = kleur.contrast(kleur(onSurface), kleur(surface));
  const primaryContrastRatio = kleur.contrast(kleur(onPrimary), seed);

  return {
    primary, primaryLight, primaryDark,
    surface, surfaceDim, surfaceHigh, onSurface, onPrimary,
    contrastRatio: contrastRatio.toFixed(2),
    contrastAA: contrastRatio >= 4.5,
    primaryContrastRatio: primaryContrastRatio.toFixed(2),
    primaryContrastAA: primaryContrastRatio >= 4.5,
  };
});

const tokens = computed(() => [
  { name: "--primary", value: theme.value.primary },
  { name: "--primary-light", value: theme.value.primaryLight },
  { name: "--primary-dark", value: theme.value.primaryDark },
  { name: "--surface", value: theme.value.surface },
  { name: "--surface-dim", value: theme.value.surfaceDim },
  { name: "--on-surface", value: theme.value.onSurface },
  { name: "--on-primary", value: theme.value.onPrimary },
]);
</script>

<template>
  <div class="kl-page" :style="{ backgroundColor: theme.surface, color: theme.onSurface }">
    <header class="kl-page-header" :style="{ borderColor: theme.surfaceHigh }">
      <a href="./reactjs" class="kl-back" :style="{ color: theme.onSurface }">&larr; React</a>
      <div class="kl-page-controls">
        <label class="kl-ctrl">
          <span>Seed</span>
          <input v-model="seedHex" type="color" />
        </label>
        <label class="kl-ctrl">
          <span>Scheme</span>
          <select v-model="scheme">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
      </div>
    </header>

    <div class="kl-stage">
      <!-- Mock app -->
      <div class="kl-app">
        <nav class="kl-app-nav" :style="{ backgroundColor: theme.primary, color: theme.onPrimary }">
          <span class="kl-app-nav__title">App Title</span>
          <span class="kl-badge" :class="theme.primaryContrastAA ? 'kl-badge--pass' : 'kl-badge--fail'">
            {{ theme.primaryContrastRatio }}:1
          </span>
        </nav>

        <main class="kl-app-body" :style="{ backgroundColor: theme.surface }">
          <div class="kl-card" :style="{ backgroundColor: theme.surfaceDim }">
            <h3 class="kl-card__title">Card Heading</h3>
            <p class="kl-card__text">
              This mock interface is styled entirely from tokens derived from a single seed color.
              Every surface, text, and accent color is computed using kleur's <code>lighten()</code>,
              <code>darken()</code>, and <code>contrast()</code> methods.
            </p>
            <div class="kl-card__actions">
              <div class="kl-btn" :style="{ backgroundColor: theme.primary, color: theme.onPrimary }">Primary</div>
              <div class="kl-btn kl-btn--outline" :style="{ borderColor: theme.primary, color: theme.primary }">Secondary</div>
            </div>
          </div>

          <div class="kl-card" :style="{ backgroundColor: theme.surfaceDim }">
            <h3 class="kl-card__title">Another Section</h3>
            <div class="kl-inputs">
              <div class="kl-input" :style="{ borderColor: theme.surfaceHigh }">
                <span style="opacity: 0.5">Text input placeholder...</span>
              </div>
              <div class="kl-btn" :style="{ backgroundColor: theme.primaryDark, color: theme.onPrimary }">Submit</div>
            </div>
          </div>
        </main>

        <footer class="kl-app-footer" :style="{ borderColor: theme.surfaceHigh }">
          <span>Surface contrast: {{ theme.contrastRatio }}:1</span>
          <span class="kl-badge" :class="theme.contrastAA ? 'kl-badge--pass' : 'kl-badge--fail'">
            {{ theme.contrastAA ? "WCAG AA" : "Fail" }}
          </span>
        </footer>
      </div>

      <!-- Token list -->
      <div class="kl-tokens" :style="{ backgroundColor: theme.surfaceDim }">
        <div class="kl-tokens__title">Derived Tokens</div>
        <div v-for="t in tokens" :key="t.name" class="kl-token">
          <div class="kl-token__swatch" :style="{ backgroundColor: t.value }" />
          <span class="kl-token__name">{{ t.name }}</span>
          <span class="kl-token__value">{{ t.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kl-page {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  transition: background-color 0.2s, color 0.2s;
}

.kl-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid;
  gap: 16px;
  flex-wrap: wrap;
}

.kl-back {
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
  white-space: nowrap;
}

.kl-back:hover {
  opacity: 1;
}

.kl-page-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.kl-ctrl {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  opacity: 0.7;
}

.kl-ctrl input[type="color"] {
  width: 28px;
  height: 24px;
  padding: 0;
  border: 1px solid rgba(128, 128, 128, 0.3);
  cursor: pointer;
}

.kl-ctrl select {
  background: transparent;
  border: 1px solid rgba(128, 128, 128, 0.3);
  color: inherit;
  padding: 2px 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

.kl-stage {
  display: grid;
  grid-template-columns: 1fr 280px;
  min-height: 0;
}

@media (max-width: 720px) {
  .kl-stage {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
}

.kl-app {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.kl-app-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
  transition: background-color 0.2s, color 0.2s;
}

.kl-app-body {
  padding: 24px;
  display: grid;
  gap: 20px;
  align-content: start;
  transition: background-color 0.2s;
}

.kl-card {
  padding: 20px;
  display: grid;
  gap: 12px;
  transition: background-color 0.2s;
}

.kl-card__title {
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.kl-card__text {
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.85;
}

.kl-card__text code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
}

.kl-card__actions {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.kl-btn {
  padding: 8px 18px;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: default;
  transition: background-color 0.2s, color 0.2s;
}

.kl-btn--outline {
  background: transparent !important;
  border: 1px solid;
}

.kl-inputs {
  display: flex;
  gap: 10px;
}

.kl-input {
  flex: 1;
  padding: 8px 12px;
  font-size: 0.8rem;
  border: 1px solid;
}

.kl-app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  font-size: 0.72rem;
  font-family: var(--vp-font-family-mono);
  border-top: 1px solid;
}

.kl-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
  padding: 2px 6px;
}

.kl-badge--pass {
  color: #4ade80;
}

.kl-badge--fail {
  color: #f87171;
}

.kl-tokens {
  padding: 20px;
  display: grid;
  gap: 10px;
  align-content: start;
  border-left: 1px solid rgba(128, 128, 128, 0.2);
  transition: background-color 0.2s;
}

@media (max-width: 720px) {
  .kl-tokens {
    border-left: 0;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
  }
}

.kl-tokens__title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.5;
  margin-bottom: 4px;
}

.kl-token {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  gap: 8px;
  align-items: center;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
}

.kl-token__swatch {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  transition: background-color 0.2s;
}

.kl-token__name {
  opacity: 0.6;
}
</style>
