<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const baseHex = ref("#3a6bd5");

const derived = computed(() => {
  const c = kleur(baseHex.value);
  const { r, g, b } = c.toRgb();
  const lighter = c.lighten(0.2);
  const darker = c.darken(0.2);
  return {
    r, g, b,
    hex: c.toHex(),
    css: c.toCss(),
    lighterHex: lighter.toHex(),
    darkerHex: darker.toHex(),
    borderCss: `rgba(${r}, ${g}, ${b}, 0.5)`,
    bgCss: lighter.toCss(),
    textColor: readableTextColor(c.toHex()),
    lighterTextColor: readableTextColor(lighter.toHex()),
    darkerTextColor: readableTextColor(darker.toHex()),
  };
});

const code = computed(() => {
  const d = derived.value;
  return [
    `import kleur from "@driangle/kleur";`,
    ``,
    `const color = kleur("${baseHex.value}");`,
    `const { r, g, b } = color.toRgb();`,
    `// => { r: ${d.r}, g: ${d.g}, b: ${d.b} }`,
    ``,
    `// Use channels individually`,
    `element.style.borderColor =`,
    `  \`rgba(\${r}, \${g}, \${b}, 0.5)\`;`,
    `// => "${d.borderCss}"`,
    ``,
    `// Or use toCss() directly`,
    `element.style.backgroundColor =`,
    `  color.lighten(0.2).toCss();`,
    `// => "${d.bgCss}"`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./vanillajs"
    back-label="Vanilla JS"
    title="Data-Driven Styling"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Base</span>
        <input v-model="baseHex" type="color" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" />
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-channels">
          <div class="kl-channel">
            <span class="kl-channel__label">R</span>
            <div class="kl-channel__bar" :style="{ width: `${(derived.r / 255) * 100}%`, backgroundColor: `rgb(${derived.r}, 0, 0)` }">
              <span>{{ derived.r }}</span>
            </div>
          </div>
          <div class="kl-channel">
            <span class="kl-channel__label">G</span>
            <div class="kl-channel__bar" :style="{ width: `${(derived.g / 255) * 100}%`, backgroundColor: `rgb(0, ${derived.g}, 0)` }">
              <span>{{ derived.g }}</span>
            </div>
          </div>
          <div class="kl-channel">
            <span class="kl-channel__label">B</span>
            <div class="kl-channel__bar" :style="{ width: `${(derived.b / 255) * 100}%`, backgroundColor: `rgb(0, 0, ${derived.b})` }">
              <span>{{ derived.b }}</span>
            </div>
          </div>
        </div>

        <div class="kl-swatches">
          <div class="kl-swatch" :style="{ backgroundColor: derived.darkerHex, color: derived.darkerTextColor }">
            <span class="kl-swatch__label">darken(0.2)</span>
            <span class="kl-swatch__hex">{{ derived.darkerHex }}</span>
          </div>
          <div class="kl-swatch kl-swatch--main" :style="{ backgroundColor: derived.hex, color: derived.textColor, borderColor: derived.borderCss }">
            <span class="kl-swatch__label">base</span>
            <span class="kl-swatch__hex">{{ derived.hex }}</span>
          </div>
          <div class="kl-swatch" :style="{ backgroundColor: derived.lighterHex, color: derived.lighterTextColor }">
            <span class="kl-swatch__label">lighten(0.2)</span>
            <span class="kl-swatch__hex">{{ derived.lighterHex }}</span>
          </div>
        </div>

        <div class="kl-styled-el" :style="{ borderColor: derived.borderCss, backgroundColor: derived.bgCss, color: derived.lighterTextColor }">
          <span>Styled element</span>
          <span class="kl-styled-el__sub">border: rgba({{ derived.r }}, {{ derived.g }}, {{ derived.b }}, 0.5)</span>
          <span class="kl-styled-el__sub">bg: {{ derived.bgCss }}</span>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-preview {
  display: grid;
  gap: 24px;
  padding: 24px;
  align-content: center;
  height: 100%;
}

.kl-channels {
  display: grid;
  gap: 8px;
}

.kl-channel {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  align-items: center;
}

.kl-channel__label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  opacity: 0.5;
  text-align: center;
}

.kl-channel__bar {
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: #fff;
  transition: width 0.2s, background-color 0.2s;
  min-width: 40px;
}

.kl-swatches {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px;
}

.kl-swatch {
  padding: 16px 12px;
  display: grid;
  gap: 4px;
  font-family: var(--vp-font-family-mono);
  transition: background-color 0.2s;
}

.kl-swatch--main {
  border: 2px solid;
}

.kl-swatch__label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.6;
}

.kl-swatch__hex {
  font-size: 0.8rem;
  font-weight: 500;
}

.kl-styled-el {
  border: 2px solid;
  padding: 16px;
  display: grid;
  gap: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  transition: background-color 0.2s, border-color 0.2s;
}

.kl-styled-el__sub {
  font-size: 0.7rem;
  opacity: 0.7;
}
</style>
