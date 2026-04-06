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
  | "warm"
  | "cool"
  | "invert"
  | "grayscale"
  | "complement"
  | "balanceLightness"
  | "harmonize";

type PaletteSource = "triadic" | "tetradic" | "analogous";

const base = ref("#e05030");
const source = ref<PaletteSource>("triadic");
const operation = ref<Operation>("desaturate");
const amount = ref(0.3);

const noParam = computed(() =>
  ["invert", "grayscale", "complement"].includes(operation.value),
);

const config = computed(() => {
  if (operation.value === "rotate") {
    return { min: 0, max: 360, step: 5, label: `${amount.value}\u00b0` };
  }
  return { min: 0, max: 1, step: 0.05, label: String(amount.value) };
});

const originalPalette = computed(() =>
  kleur(base.value)[source.value](),
);

const adjustedPalette = computed(() => {
  const p = originalPalette.value;
  switch (operation.value) {
    case "lighten": return p.lighten(amount.value);
    case "darken": return p.darken(amount.value);
    case "saturate": return p.saturate(amount.value);
    case "desaturate": return p.desaturate(amount.value);
    case "rotate": return p.rotate(amount.value);
    case "warm": return p.warm(amount.value);
    case "cool": return p.cool(amount.value);
    case "invert": return p.invert();
    case "grayscale": return p.grayscale();
    case "complement": return p.complement();
    case "balanceLightness": return p.balanceLightness();
    case "harmonize": return p.harmonize(amount.value);
  }
});

const code = computed(() => {
  const chain = `kleur("${base.value}").${source.value}()`;
  if (noParam.value) {
    return `${chain}\n  .${operation.value}()`;
  }
  return `${chain}\n  .${operation.value}(${amount.value})`;
});
</script>

<template>
  <DocsDemo
    title="Bulk color adjustments"
    description="Apply a single adjustment to every color in a palette and compare the result."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <div class="kl-field">
          <span>Base Color</span>
          <input v-model="base" type="color" />
        </div>
        <label class="kl-field">
          <span>Palette Source</span>
          <select v-model="source">
            <option value="triadic">triadic()</option>
            <option value="tetradic">tetradic()</option>
            <option value="analogous">analogous()</option>
          </select>
        </label>
        <label class="kl-field">
          <span>Operation</span>
          <select v-model="operation">
            <option value="lighten">lighten()</option>
            <option value="darken">darken()</option>
            <option value="saturate">saturate()</option>
            <option value="desaturate">desaturate()</option>
            <option value="rotate">rotate()</option>
            <option value="warm">warm()</option>
            <option value="cool">cool()</option>
            <option value="invert">invert()</option>
            <option value="grayscale">grayscale()</option>
            <option value="complement">complement()</option>
            <option value="balanceLightness">balanceLightness()</option>
            <option value="harmonize">harmonize()</option>
          </select>
        </label>
        <label class="kl-field" :class="{ 'kl-field--disabled': noParam }">
          <span>Amount: {{ noParam ? '\u2014' : config.label }}</span>
          <input
            v-model.number="amount"
            type="range"
            :min="config.min"
            :max="config.max"
            :step="config.step"
            :disabled="noParam"
          />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-row">
          <span class="kl-row-label">Original</span>
          <div class="kl-swatches">
            <div
              v-for="(color, i) in originalPalette"
              :key="'o' + i"
              class="kl-swatch"
              :style="{ background: color.toHex(), color: readableTextColor(color.toHex()) }"
            >{{ color.toHex() }}</div>
          </div>
        </div>
        <div class="kl-row">
          <span class="kl-row-label">Adjusted</span>
          <div class="kl-swatches">
            <div
              v-for="(color, i) in adjustedPalette"
              :key="'a' + i"
              class="kl-swatch"
              :style="{ background: color.toHex(), color: readableTextColor(color.toHex()) }"
            >{{ color.toHex() }}</div>
          </div>
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

.kl-field--disabled {
  opacity: 0.4;
  pointer-events: none;
}

.kl-preview {
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100%;
}

.kl-row {
  position: relative;
}

.kl-row-label {
  position: absolute;
  top: 6px;
  left: 8px;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #f5f5f5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.kl-swatches {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  height: 100%;
}

.kl-swatch {
  display: grid;
  place-items: center;
  padding: 8px 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
}
</style>
