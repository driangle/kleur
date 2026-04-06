<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { measureDistance, readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const a = ref("#ff6600");
const b = ref("#ff5500");
const preset = ref<"fast" | "perceptual" | "accurate" | "modern">("perceptual");
const distance = computed(() => measureDistance(kleur(a.value), kleur(b.value), preset.value));
const code = computed(() =>
  [
    "kleur.distance(",
    `  kleur("${a.value}"),`,
    `  kleur("${b.value}"),`,
    `  { preset: "${preset.value}" }`,
    ")",
  ].join("\n")
);
</script>

<template>
  <DocsDemo
    title="Compare distance presets"
    description="Swap presets to see how mathematical and perceptual distance strategies rank the same two colors."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <div class="kl-field">
          <span>Color A</span>
          <input v-model="a" type="color" />
        </div>
        <div class="kl-field">
          <span>Color B</span>
          <input v-model="b" type="color" />
        </div>
        <label class="kl-field">
          <span>Preset</span>
          <select v-model="preset">
            <option value="fast">fast</option>
            <option value="perceptual">perceptual</option>
            <option value="accurate">accurate</option>
            <option value="modern">modern</option>
          </select>
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-strip">
          <div class="kl-block" :style="{ background: a, color: readableTextColor(a) }">{{ a }}</div>
          <div class="kl-block" :style="{ background: b, color: readableTextColor(b) }">{{ b }}</div>
        </div>
        <div class="kl-card">
          <span>Distance</span>
          <strong>{{ distance }}</strong>
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
.kl-preview {
  display: grid;
  gap: 12px;
}

.kl-field {
  display: grid;
  gap: 6px;
}

.kl-field span,
.kl-card span {
  font-size: 0.8rem;
  color: var(--kl-on-surface-variant);
}

.kl-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.kl-block,
.kl-card {
  min-height: 110px;
  display: grid;
  place-items: center;
  padding: 12px;
}

.kl-card {
  border: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface-low);
}

.kl-card strong {
  font-family: var(--vp-font-family-mono);
  font-size: 1.6rem;
}

@media (max-width: 640px) {
  .kl-strip {
    grid-template-columns: 1fr;
  }
}
</style>
