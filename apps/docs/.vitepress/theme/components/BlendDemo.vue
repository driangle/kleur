<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { blendColors, readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const base = ref("#ff0000");
const overlay = ref("#0000ff");
const mode = ref<"mix" | "multiply" | "screen" | "overlay" | "difference" | "lighten" | "darken">("mix");
const t = ref(0.5);

const result = computed(() => blendColors(kleur(base.value), kleur(overlay.value), mode.value, t.value));
const code = computed(() =>
  mode.value === "mix"
    ? [
        "const result = kleur.mix(",
        `  kleur("${base.value}"),`,
        `  kleur("${overlay.value}"),`,
        `  ${t.value}`,
        ");",
      ].join("\n")
    : [
        "const result = kleur.blend(",
        `  kleur("${base.value}"),`,
        `  kleur("${overlay.value}"),`,
        `  "${mode.value}"`,
        ");",
      ].join("\n")
);
</script>

<template>
  <DocsDemo
    title="Blend or mix two colors"
    description="Compare midpoint interpolation with common blend modes using the same pair of colors."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>Base</span>
          <input v-model="base" type="color" />
        </label>
        <label class="kl-field">
          <span>Overlay</span>
          <input v-model="overlay" type="color" />
        </label>
        <label class="kl-field">
          <span>Mode</span>
          <select v-model="mode">
            <option value="mix">mix()</option>
            <option value="screen">blend(..., "screen")</option>
            <option value="multiply">blend(..., "multiply")</option>
            <option value="overlay">blend(..., "overlay")</option>
            <option value="difference">blend(..., "difference")</option>
            <option value="lighten">blend(..., "lighten")</option>
            <option value="darken">blend(..., "darken")</option>
          </select>
        </label>
        <label v-if="mode === 'mix'" class="kl-field">
          <span>Mix Amount: {{ t }}</span>
          <input v-model.number="t" type="range" min="0" max="1" step="0.05" />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-strip">
          <div class="kl-block" :style="{ background: base, color: readableTextColor(base) }">Base</div>
          <div class="kl-block" :style="{ background: overlay, color: readableTextColor(overlay) }">Overlay</div>
          <div class="kl-block" :style="{ background: result.toHex(), color: readableTextColor(result.toHex()) }">Result</div>
        </div>
        <strong class="kl-hex">{{ result.toHex() }}</strong>
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

.kl-preview {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
}

.kl-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.kl-block {
  min-height: 140px;
  display: grid;
  place-items: center;
  padding: 12px;
  text-align: center;
}

.kl-hex {
  font-family: var(--vp-font-family-mono);
  padding: 12px 14px;
}

@media (max-width: 640px) {
  .kl-strip {
    grid-template-columns: 1fr;
  }
}
</style>
