<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
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
  const onSurface = isDark ? "#e8e8e8" : "#1a1a1a";
  const onPrimary = readableTextColor(primary);

  const bg = kleur(surface);
  const fg = kleur(onSurface);
  const contrastRatio = kleur.contrast(fg, bg);
  const primaryContrastRatio = kleur.contrast(kleur(onPrimary), seed);

  return {
    primary,
    primaryLight,
    primaryDark,
    surface,
    surfaceDim,
    onSurface,
    onPrimary,
    contrastRatio: contrastRatio.toFixed(2),
    contrastAA: contrastRatio >= 4.5,
    primaryContrastRatio: primaryContrastRatio.toFixed(2),
    primaryContrastAA: primaryContrastRatio >= 4.5,
  };
});

const code = computed(() => {
  const lines = [
    `import kleur from "@driangle/kleur";`,
    ``,
    `function deriveTheme(seed, mode) {`,
    `  const base = kleur(seed);`,
    `  const isDark = mode === "dark";`,
    ``,
    `  return {`,
    `    "--primary":       base.toHex(),`,
    `    "--primary-light":  base.lighten(0.3).toHex(),`,
    `    "--primary-dark":   base.darken(0.3).toHex(),`,
    `    "--surface":        isDark ? "#141414" : "#f5f5f5",`,
    `    "--on-surface":     isDark ? "#e8e8e8" : "#1a1a1a",`,
    `    "--on-primary":     kleur.isLight(base)`,
    `                          ? "#111111" : "#f5f5f5",`,
    `  };`,
    `}`,
    ``,
    `// Apply to root element`,
    `const vars = deriveTheme("${seedHex.value}", "${scheme.value}");`,
    `Object.entries(vars).forEach(([k, v]) =>`,
    `  document.documentElement.style.setProperty(k, v)`,
    `);`,
  ];
  return lines.join("\n");
});
</script>

<template>
  <DocsDemo
    title="Derive a UI theme from a seed color"
    description="Generate primary, surface, and contrast-safe text colors from a single seed using kleur."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>Seed Color</span>
          <input v-model="seedHex" type="color" />
        </label>
        <label class="kl-field">
          <span>Scheme</span>
          <select v-model="scheme">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-theme-preview" :style="{ backgroundColor: theme.surface, color: theme.onSurface }">
        <div class="kl-theme-nav" :style="{ backgroundColor: theme.primary, color: theme.onPrimary }">
          <span class="kl-theme-nav__title">App Title</span>
          <span class="kl-theme-nav__badge" :class="theme.primaryContrastAA ? 'kl-badge--pass' : 'kl-badge--fail'">
            {{ theme.primaryContrastRatio }}:1 {{ theme.primaryContrastAA ? "AA" : "Fail" }}
          </span>
        </div>

        <div class="kl-theme-body">
          <div class="kl-theme-card" :style="{ backgroundColor: theme.surfaceDim }">
            <div class="kl-theme-card__title">Card Title</div>
            <div class="kl-theme-card__text">
              This mock UI demonstrates theme tokens derived from a single seed color using kleur's
              <code>lighten()</code>, <code>darken()</code>, and <code>contrast()</code> APIs.
            </div>
            <div class="kl-theme-card__actions">
              <div
                class="kl-theme-btn"
                :style="{ backgroundColor: theme.primary, color: theme.onPrimary }"
              >
                Primary Action
              </div>
              <div
                class="kl-theme-btn kl-theme-btn--outline"
                :style="{ borderColor: theme.primary, color: theme.primary }"
              >
                Secondary
              </div>
            </div>
          </div>

          <div class="kl-theme-tokens">
            <div class="kl-token" v-for="(value, label) in {
              'primary': theme.primary,
              'primary-light': theme.primaryLight,
              'primary-dark': theme.primaryDark,
              'surface': theme.surface,
              'on-surface': theme.onSurface,
            }" :key="label">
              <div class="kl-token__swatch" :style="{ backgroundColor: value }" />
              <div class="kl-token__info">
                <span class="kl-token__name">--{{ label }}</span>
                <span class="kl-token__value">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="kl-theme-contrast">
          <span>Surface contrast: {{ theme.contrastRatio }}:1</span>
          <span :class="theme.contrastAA ? 'kl-badge--pass' : 'kl-badge--fail'">
            {{ theme.contrastAA ? "WCAG AA" : "Fail" }}
          </span>
        </div>
      </div>
    </template>
  </DocsDemo>
</template>

<style scoped>
.kl-code {
  margin: 0 0 18px;
  padding: 14px 16px;
  background: var(--kl-surface-lowest);
  font-family: var(--vp-font-family-mono);
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.kl-controls {
  display: grid;
  gap: 12px;
}

.kl-field {
  display: grid;
  gap: 6px;
}

.kl-field span {
  font-size: 0.8rem;
  color: var(--kl-on-surface-variant);
}

.kl-theme-preview {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 320px;
  transition: background-color 0.2s, color 0.2s;
}

.kl-theme-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: background-color 0.2s, color 0.2s;
}

.kl-theme-nav__badge {
  font-size: 0.65rem;
  padding: 2px 6px;
  font-weight: 500;
  font-family: var(--vp-font-family-mono);
}

.kl-theme-body {
  padding: 14px;
  display: grid;
  gap: 14px;
}

.kl-theme-card {
  padding: 14px;
  display: grid;
  gap: 10px;
  transition: background-color 0.2s;
}

.kl-theme-card__title {
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.kl-theme-card__text {
  font-size: 0.8rem;
  line-height: 1.5;
  opacity: 0.85;
}

.kl-theme-card__text code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  opacity: 0.9;
}

.kl-theme-card__actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.kl-theme-btn {
  padding: 6px 14px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: default;
  transition: background-color 0.2s, color 0.2s;
}

.kl-theme-btn--outline {
  background: transparent !important;
  border: 1px solid;
}

.kl-theme-tokens {
  display: grid;
  gap: 6px;
}

.kl-token {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  align-items: center;
}

.kl-token__swatch {
  width: 24px;
  height: 24px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  transition: background-color 0.2s;
}

.kl-token__info {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  font-family: var(--vp-font-family-mono);
}

.kl-token__name {
  opacity: 0.7;
}

.kl-theme-contrast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  font-size: 0.72rem;
  font-family: var(--vp-font-family-mono);
  border-top: 1px solid rgba(128, 128, 128, 0.2);
}

.kl-badge--pass {
  color: #4ade80;
}

.kl-badge--fail {
  color: #f87171;
}
</style>
