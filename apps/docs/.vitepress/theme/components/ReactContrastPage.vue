<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const fgHex = ref("#f5f5f5");
const bgHex = ref("#3a6bd5");

const result = computed(() => {
  const ratio = kleur.contrast(fgHex.value, bgHex.value);
  return {
    ratio: ratio.toFixed(2),
    passAA: ratio >= 4.5,
    passAALarge: ratio >= 3.0,
    passAAA: ratio >= 7.0,
  };
});

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    ``,
    `function ContrastBadge({ fg, bg }) {`,
    `  const ratio = kleur.contrast(`,
    `    "${fgHex.value}",`,
    `    "${bgHex.value}"`,
    `  );`,
    `  // => ${result.value.ratio}`,
    ``,
    `  const passAA = ratio >= 4.5;`,
    `  // => ${result.value.passAA}`,
    ``,
    `  return (`,
    `    <span className={passAA ? "pass" : "fail"}>`,
    `      {ratio.toFixed(2)}:1`,
    `      {passAA ? "AA" : "Fail"}`,
    `    </span>`,
    `  );`,
    `}`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./reactjs"
    back-label="React"
    title="Contrast Validation"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Foreground</span>
        <input v-model="fgHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>Background</span>
        <input v-model="bgHex" type="color" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" lang="jsx" />
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-sample" :style="{ backgroundColor: bgHex, color: fgHex }">
          <span class="kl-sample__text">The quick brown fox jumps over the lazy dog</span>
          <span class="kl-sample__small">Small text sample for AA compliance testing</span>
        </div>

        <div class="kl-ratio">
          <span class="kl-ratio__value">{{ result.ratio }}:1</span>
        </div>

        <div class="kl-badges">
          <div class="kl-wcag" :class="result.passAALarge ? 'kl-wcag--pass' : 'kl-wcag--fail'">
            <span class="kl-wcag__label">AA Large</span>
            <span class="kl-wcag__status">{{ result.passAALarge ? "Pass" : "Fail" }}</span>
            <span class="kl-wcag__req">&ge; 3.0:1</span>
          </div>
          <div class="kl-wcag" :class="result.passAA ? 'kl-wcag--pass' : 'kl-wcag--fail'">
            <span class="kl-wcag__label">AA</span>
            <span class="kl-wcag__status">{{ result.passAA ? "Pass" : "Fail" }}</span>
            <span class="kl-wcag__req">&ge; 4.5:1</span>
          </div>
          <div class="kl-wcag" :class="result.passAAA ? 'kl-wcag--pass' : 'kl-wcag--fail'">
            <span class="kl-wcag__label">AAA</span>
            <span class="kl-wcag__status">{{ result.passAAA ? "Pass" : "Fail" }}</span>
            <span class="kl-wcag__req">&ge; 7.0:1</span>
          </div>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-preview {
  display: grid;
  gap: 20px;
  padding: 24px;
  align-content: center;
  height: 100%;
}

.kl-sample {
  padding: 24px;
  display: grid;
  gap: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.kl-sample__text {
  font-size: 1.1rem;
  font-weight: 500;
}

.kl-sample__small {
  font-size: 0.8rem;
  opacity: 0.9;
}

.kl-ratio {
  text-align: center;
}

.kl-ratio__value {
  font-family: var(--vp-font-family-mono);
  font-size: 2.5rem;
  font-weight: 800;
}

.kl-badges {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.kl-wcag {
  padding: 14px;
  display: grid;
  gap: 4px;
  text-align: center;
  font-family: var(--vp-font-family-mono);
}

.kl-wcag--pass {
  background: rgba(74, 222, 128, 0.1);
}

.kl-wcag--fail {
  background: rgba(248, 113, 113, 0.1);
}

.kl-wcag__label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.6;
}

.kl-wcag__status {
  font-size: 1.1rem;
  font-weight: 700;
}

.kl-wcag--pass .kl-wcag__status { color: #4ade80; }
.kl-wcag--fail .kl-wcag__status { color: #f87171; }

.kl-wcag__req {
  font-size: 0.65rem;
  opacity: 0.5;
}
</style>
