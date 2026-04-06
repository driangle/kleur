<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const fromHex = ref("#1a1a8e");
const toHex = ref("#e8a030");
const steps = ref(10);

const colors = computed(() => {
  const from = kleur(fromHex.value);
  const to = kleur(toHex.value);
  return Array.from({ length: steps.value }, (_, i) => {
    const t = i / (steps.value - 1);
    const c = kleur.mix(from, to, t);
    return { hex: c.toHex(), css: c.toCss(), t };
  });
});

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    ``,
    `const from = kleur("${fromHex.value}");`,
    `const to   = kleur("${toHex.value}");`,
    `const bars  = document.querySelectorAll(".bar");`,
    ``,
    `bars.forEach((bar, i) => {`,
    `  const t = i / (bars.length - 1);`,
    `  const color = kleur.mix(from, to, t);`,
    `  bar.style.backgroundColor = color.toHex();`,
    `  bar.style.color = kleur.isLight(color)`,
    `    ? "#111" : "#f5f5f5";`,
    `});`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./vanillajs"
    back-label="Vanilla JS"
    title="Color Interpolation"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>From</span>
        <input v-model="fromHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>To</span>
        <input v-model="toHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>{{ steps }}</span>
        <input v-model.number="steps" type="range" min="3" max="24" step="1" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" />
    </template>

    <template #preview>
      <div class="kl-stage">
        <div
          v-for="(c, i) in colors"
          :key="i"
          class="kl-strip"
          :style="{
            backgroundColor: c.hex,
            color: readableTextColor(c.hex),
            flex: 1,
          }"
        >
          <div class="kl-strip__inner">
            <span class="kl-strip__hex">{{ c.hex }}</span>
            <span class="kl-strip__t">{{ (c.t * 100).toFixed(0) }}%</span>
          </div>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-stage {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.kl-strip {
  display: grid;
  place-items: center;
  transition: background-color 0.15s;
}

.kl-strip__inner {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  opacity: 0.9;
}

.kl-strip__t {
  opacity: 0.5;
  font-size: 0.7rem;
}
</style>
