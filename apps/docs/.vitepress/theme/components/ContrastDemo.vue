<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { describeContrast, readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const foreground = ref("#ffffff");
const background = ref("#1a1a2e");
const summary = computed(() => describeContrast(kleur(foreground.value), kleur(background.value)));
const sample = ref("The quick brown fox jumps over the lazy dog.");
const code = computed(() =>
  [
    "kleur.contrast(",
    `  kleur("${background.value}"),`,
    `  kleur("${foreground.value}")`,
    ")",
  ].join("\n")
);
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
        <div class="kl-field">
          <span>Foreground</span>
          <input v-model="foreground" type="color" />
        </div>
        <div class="kl-field">
          <span>Background</span>
          <input v-model="background" type="color" />
        </div>
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
          <div
            class="kl-metric-row"
            tabindex="0"
          >
            <span>WCAG AA</span>
            <strong class="kl-metric-value">{{ summary.aa ? "Pass" : "Fail" }}</strong>
            <span class="kl-tooltip">
              {{
                summary.aa
                  ? "Passes WCAG AA for normal text because the contrast ratio is at least 4.5:1."
                  : "Fails WCAG AA for normal text because the contrast ratio is below 4.5:1."
              }}
            </span>
          </div>
          <div
            class="kl-metric-row"
            tabindex="0"
          >
            <span>WCAG AAA</span>
            <strong class="kl-metric-value">{{ summary.aaa ? "Pass" : "Fail" }}</strong>
            <span class="kl-tooltip">
              {{
                summary.aaa
                  ? "Passes WCAG AAA for normal text because the contrast ratio is at least 7:1."
                  : "Fails WCAG AAA for normal text because the contrast ratio is below 7:1."
              }}
            </span>
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

.kl-controls,
.kl-metrics {
  display: grid;
  gap: 12px;
}

.kl-metrics {
  padding: 16px 20px;
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

.kl-metric-row {
  position: relative;
  cursor: help;
}

.kl-tooltip {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 1;
  width: min(260px, 80vw);
  padding: 10px 12px;
  border: 1px solid var(--kl-outline);
  background: var(--kl-surface-lowest);
  color: var(--kl-on-surface);
  font-size: 0.76rem;
  line-height: 1.45;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.kl-metric-row:hover .kl-tooltip,
.kl-metric-row:focus-visible .kl-tooltip {
  opacity: 1;
  transform: translateY(0);
}

.kl-metric-row:focus-visible {
  outline: 1px solid var(--kl-primary);
  outline-offset: 4px;
}

.kl-metrics strong {
  font-family: var(--vp-font-family-mono);
}
</style>
