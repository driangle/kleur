<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const startHex = ref("#0d0d0d");
const endHex = ref("#f5f5f5");
const scrollT = ref(0);

const bg = computed(() => kleur.mix(kleur(startHex.value), kleur(endHex.value), scrollT.value).toHex());
const textColor = computed(() => readableTextColor(bg.value));

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    ``,
    `const start = kleur("${startHex.value}");`,
    `const end   = kleur("${endHex.value}");`,
    ``,
    `window.addEventListener("scroll", () => {`,
    `  const t = window.scrollY`,
    `    / (document.body.scrollHeight`,
    `       - window.innerHeight);`,
    `  document.body.style.backgroundColor =`,
    `    kleur.mix(start, end, t).toHex();`,
    `});`,
    ``,
    `// Current t: ${scrollT.value.toFixed(2)}`,
    `// Color:     ${bg.value}`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./vanillajs"
    back-label="Vanilla JS"
    title="Scroll-Driven Color"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Start</span>
        <input v-model="startHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>End</span>
        <input v-model="endHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>Scroll {{ (scrollT * 100).toFixed(0) }}%</span>
        <input v-model.number="scrollT" type="range" min="0" max="1" step="0.01" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" />
    </template>

    <template #preview>
      <div class="kl-preview" :style="{ backgroundColor: bg, color: textColor }">
        <div class="kl-label">
          <span class="kl-label__t">t = {{ scrollT.toFixed(2) }}</span>
          <span class="kl-label__hex">{{ bg }}</span>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-preview {
  display: grid;
  place-items: center;
  height: 100%;
  transition: background-color 0.1s, color 0.1s;
}

.kl-label {
  display: grid;
  gap: 8px;
  text-align: center;
  font-family: var(--vp-font-family-mono);
}

.kl-label__t {
  font-size: 2rem;
  font-weight: 700;
}

.kl-label__hex {
  font-size: 1rem;
  opacity: 0.7;
}
</style>
