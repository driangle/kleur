<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { describeContrast, readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const foreground = ref("#ffffff");
const background = ref("#1a1a2e");
const summary = computed(() => describeContrast(kleur(foreground.value), kleur(background.value)));
const sample = ref("The quick brown fox jumps over the lazy dog.");
const code = computed(() => `const ratio = kleur.contrast(kleur("${background.value}"), kleur("${foreground.value}"))`);
</script>

<template>
  <DocsDemo
    title="Check contrast and readability"
    description="Adjust foreground and background colors to see the WCAG ratio and pass/fail thresholds update live."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>Foreground</span>
          <input v-model="foreground" type="color" />
        </label>
        <label class="kl-field">
          <span>Background</span>
          <input v-model="background" type="color" />
        </label>
        <label class="kl-field">
          <span>Preview Text</span>
          <input v-model="sample" type="text" spellcheck="false" />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-sample" :style="{ background, color: foreground, borderColor: readableTextColor(background) }">
          {{ sample }}
        </div>
        <div class="kl-metrics">
          <div><span>Contrast</span><strong>{{ summary.ratio }}:1</strong></div>
          <div><span>WCAG AA</span><strong>{{ summary.aa ? "Pass" : "Fail" }}</strong></div>
          <div><span>WCAG AAA</span><strong>{{ summary.aaa ? "Pass" : "Fail" }}</strong></div>
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
  overflow-x: auto;
}

.kl-controls,
.kl-metrics {
  display: grid;
  gap: 12px;
}

.kl-field {
  display: grid;
  gap: 6px;
}

.kl-field span,
.kl-metrics span {
  font-size: 0.8rem;
  color: var(--kl-on-surface-variant);
}

.kl-preview {
  display: grid;
  gap: 14px;
}

.kl-sample {
  min-height: 140px;
  padding: 18px;
  display: grid;
  place-items: center;
  text-align: center;
  border: 1px solid currentColor;
}

.kl-metrics div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.kl-metrics strong {
  font-family: var(--vp-font-family-mono);
}
</style>
