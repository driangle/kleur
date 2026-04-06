<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import kleur from "@driangle/kleur";

const seedHex = ref("#3a6bd5");
const scheme = ref<"dark" | "light">("dark");

const theme = computed(() => {
  const seed = kleur(seedHex.value);
  const isDark = scheme.value === "dark";

  const neutral = seed.desaturate(0.85);
  const primary = seed.toHex();
  const primaryLight = seed.lighten(0.3).toHex();
  const primaryDark = seed.darken(0.3).toHex();
  const surface = (isDark ? neutral.withLightness(8) : neutral.withLightness(96)).toHex();
  const surfaceDim = (isDark ? neutral.withLightness(12) : neutral.withLightness(91)).toHex();
  const surfaceHigh = (isDark ? neutral.withLightness(17) : neutral.withLightness(87)).toHex();
  const onSurface = (isDark ? neutral.withLightness(91) : neutral.withLightness(10)).toHex();
  const onPrimary = (kleur.isLight(seed) ? seed.darken(0.8) : seed.lighten(0.9)).toHex();

  const contrastRatio = kleur.contrast(onSurface, surface);
  const primaryContrastRatio = kleur.contrast(onPrimary, primary);

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
  { name: "--surface-high", value: theme.value.surfaceHigh },
  { name: "--on-surface", value: theme.value.onSurface },
  { name: "--on-primary", value: theme.value.onPrimary },
]);

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    `import { useMemo } from "react";`,
    ``,
    `function useTheme(seed, mode) {`,
    `  return useMemo(() => {`,
    `    const base = kleur(seed);`,
    `    const isDark = mode === "dark";`,
    `    const neutral = base.desaturate(0.85);`,
    ``,
    `    const surface = isDark`,
    `      ? neutral.withLightness(8)`,
    `      : neutral.withLightness(96);`,
    `    const onSurface = isDark`,
    `      ? neutral.withLightness(91)`,
    `      : neutral.withLightness(10);`,
    ``,
    `    return {`,
    `      "--primary": base.toHex(),`,
    `      "--primary-light": base.lighten(0.3).toHex(),`,
    `      "--primary-dark": base.darken(0.3).toHex(),`,
    `      "--surface": surface.toHex(),`,
    `      "--surface-dim": isDark`,
    `        ? neutral.withLightness(12).toHex()`,
    `        : neutral.withLightness(91).toHex(),`,
    `      "--on-surface": onSurface.toHex(),`,
    `      "--on-primary": kleur.isLight(base)`,
    `        ? base.darken(0.8).toHex()`,
    `        : base.lighten(0.9).toHex(),`,
    `    };`,
    `  }, [seed, mode]);`,
    `}`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./reactjs"
    back-label="React"
    title="Dynamic Theming"
  >
    <template #controls>
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
    </template>

    <template #code>
      <CodeBlock :code="code" lang="jsx" />
    </template>

    <template #preview>
      <div class="kl-preview" :style="{ backgroundColor: theme.surface, color: theme.onSurface }">
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
                Styled entirely from tokens derived from a single seed color using
                <code>lighten()</code>, <code>darken()</code>, and <code>contrast()</code>.
              </p>
              <div class="kl-card__actions">
                <div class="kl-btn" :style="{ backgroundColor: theme.primary, color: theme.onPrimary }">Primary</div>
                <div class="kl-btn kl-btn--outline" :style="{ borderColor: theme.primary, color: theme.primary }">Secondary</div>
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

        <div class="kl-tokens" :style="{ backgroundColor: theme.surfaceDim }">
          <div class="kl-tokens__title">Derived Tokens</div>
          <div v-for="t in tokens" :key="t.name" class="kl-token">
            <div class="kl-token__swatch" :style="{ backgroundColor: t.value }" />
            <span class="kl-token__name">{{ t.name }}</span>
            <span class="kl-token__value">{{ t.value }}</span>
          </div>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-preview {
  display: grid;
  grid-template-columns: 1fr 240px;
  height: 100%;
  transition: background-color 0.2s, color 0.2s;
}

@media (max-width: 860px) {
  .kl-preview {
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
  padding: 12px 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.85rem;
  transition: background-color 0.2s, color 0.2s;
}

.kl-app-body {
  padding: 20px;
  display: grid;
  gap: 16px;
  align-content: start;
  transition: background-color 0.2s;
}

.kl-card {
  padding: 16px;
  display: grid;
  gap: 10px;
  transition: background-color 0.2s;
}

.kl-card__title {
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.kl-card__text {
  font-size: 0.8rem;
  line-height: 1.6;
  opacity: 0.85;
}

.kl-card__text code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

.kl-card__actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.kl-btn {
  padding: 7px 16px;
  font-size: 0.75rem;
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

.kl-app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  font-size: 0.7rem;
  font-family: var(--vp-font-family-mono);
  border-top: 1px solid;
}

.kl-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  padding: 2px 6px;
}

.kl-badge--pass { color: #4ade80; }
.kl-badge--fail { color: #f87171; }

.kl-tokens {
  padding: 16px;
  display: grid;
  gap: 8px;
  align-content: start;
  border-left: 1px solid rgba(128, 128, 128, 0.2);
  transition: background-color 0.2s;
}

@media (max-width: 860px) {
  .kl-tokens {
    border-left: 0;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
  }
}

.kl-tokens__title {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.5;
  margin-bottom: 2px;
}

.kl-token {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 8px;
  align-items: center;
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
}

.kl-token__swatch {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  transition: background-color 0.2s;
}

.kl-token__name {
  opacity: 0.6;
}
</style>
