<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const fromHex = ref("#1a1a8e");
const toHex = ref("#e8a030");
const steps = ref(8);

const colors = computed(() => {
  const from = kleur(fromHex.value);
  const to = kleur(toHex.value);
  return Array.from({ length: steps.value }, (_, i) => {
    const t = i / (steps.value - 1);
    const c = kleur.mix(from, to, t);
    return { hex: c.toHex(), t: t.toFixed(2) };
  });
});

const code = computed(() => {
  const lines = [
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
    `  bar.style.color = kleur.isLight(color) ? "#111" : "#f5f5f5";`,
    `});`,
  ];
  return lines.join("\n");
});
</script>

<template>
  <DocsDemo
    title="Color interpolation for DOM elements"
    description="Use kleur.mix() to generate smooth color transitions and apply them to any DOM element."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>From</span>
          <input v-model="fromHex" type="color" />
        </label>
        <label class="kl-field">
          <span>To</span>
          <input v-model="toHex" type="color" />
        </label>
        <label class="kl-field">
          <span>Steps ({{ steps }})</span>
          <input v-model.number="steps" type="range" min="3" max="16" step="1" />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-bars">
        <div
          v-for="(c, i) in colors"
          :key="i"
          class="kl-bar"
          :style="{
            backgroundColor: c.hex,
            color: readableTextColor(c.hex),
            width: `${60 + Math.sin(i * 0.8) * 30}%`,
          }"
        >
          <span class="kl-bar__hex">{{ c.hex }}</span>
          <span class="kl-bar__t">t={{ c.t }}</span>
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

.kl-bars {
  display: grid;
  gap: 4px;
  padding: 16px;
  align-content: center;
  min-height: 200px;
}

.kl-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  transition: background-color 0.2s;
}

.kl-bar__t {
  opacity: 0.6;
}
</style>
