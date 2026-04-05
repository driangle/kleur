<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

type Operation =
  | "lighten"
  | "darken"
  | "saturate"
  | "desaturate"
  | "rotate"
  | "scaleAlpha"
  | "warm"
  | "cool";

const base = ref("#ff7f50");
const operation = ref<Operation>("lighten");
const amount = ref(0.3);

const config = computed(() => {
  if (operation.value === "rotate") {
    return { min: 0, max: 360, step: 5 };
  }

  return { min: 0, max: 1, step: 0.05 };
});

const before = computed(() => kleur(base.value));
const after = computed(() => {
  const color = before.value;

  switch (operation.value) {
    case "lighten":
      return color.lighten(amount.value);
    case "darken":
      return color.darken(amount.value);
    case "saturate":
      return color.saturate(amount.value);
    case "desaturate":
      return color.desaturate(amount.value);
    case "rotate":
      return color.rotate(amount.value);
    case "scaleAlpha":
      return color.scaleAlpha(amount.value);
    case "warm":
      return color.warm(amount.value);
    case "cool":
      return color.cool(amount.value);
  }
});

const code = computed(() => `const result = kleur("${base.value}").${operation.value}(${amount.value})`);
</script>

<template>
  <DocsDemo
    title="Explore immutable adjustments"
    description="Change one color operation at a time and compare the original with the returned new color."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>Base Color</span>
          <input v-model="base" type="color" />
        </label>
        <label class="kl-field">
          <span>Operation</span>
          <select v-model="operation">
            <option value="lighten">lighten()</option>
            <option value="darken">darken()</option>
            <option value="saturate">saturate()</option>
            <option value="desaturate">desaturate()</option>
            <option value="rotate">rotate()</option>
            <option value="scaleAlpha">scaleAlpha()</option>
            <option value="warm">warm()</option>
            <option value="cool">cool()</option>
          </select>
        </label>
        <label class="kl-field">
          <span>Amount: {{ amount }}</span>
          <input
            v-model.number="amount"
            type="range"
            :min="config.min"
            :max="config.max"
            :step="config.step"
          />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-compare">
        <div class="kl-swatch" :style="{ background: before.toHex(), color: readableTextColor(before.toHex()) }">
          <span>Original</span>
          <strong>{{ before.toHex() }}</strong>
        </div>
        <div class="kl-swatch" :style="{ background: after.toHex(), color: readableTextColor(after.toHex()) }">
          <span>Result</span>
          <strong>{{ after.toHex() }}</strong>
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

.kl-controls,
.kl-compare {
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

.kl-swatch {
  min-height: 120px;
  display: grid;
  align-content: end;
  gap: 4px;
  padding: 14px;
}

.kl-swatch strong {
  font-family: var(--vp-font-family-mono);
}
</style>
