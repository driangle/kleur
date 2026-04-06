<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const hex = ref("#ff7f50");

const color = computed(() => kleur(hex.value));

const channels = computed(() => {
  const c = color.value;
  const hsl = c.hsl;
  const hsb = c.hsb;

  return [
    { getter: "red", value: c.red, range: "0-255" },
    { getter: "green", value: c.green, range: "0-255" },
    { getter: "blue", value: c.blue, range: "0-255" },
    { getter: "hue", value: c.hue, range: "0-360" },
    { getter: "saturationHsl", value: c.saturationHsl, range: "0-100" },
    { getter: "lightness", value: c.lightness, range: "0-100" },
    { getter: "saturationHsb", value: c.saturationHsb, range: "0-100" },
    { getter: "brightness", value: c.brightness, range: "0-100" },
    { getter: "alpha", value: c.alpha, range: "0-1" },
    { getter: "hsl", value: JSON.stringify(hsl, null, 2), range: "" },
    { getter: "hsb", value: JSON.stringify(hsb, null, 2), range: "" },
  ];
});

const code = computed(() => {
  return `kleur("${hex.value}")`;
});
</script>

<template>
  <DocsDemo
    title="Channel getters"
    description="Pick a color to see all channel getter values update live."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <div class="kl-field">
          <span>Color</span>
          <input v-model="hex" type="color" />
        </div>
      </div>
    </template>

    <template #preview>
      <div class="kl-swatch" :style="{ background: hex, color: readableTextColor(hex) }">
        {{ hex }}
      </div>
    </template>
  </DocsDemo>

  <table class="kl-channel-table">
    <thead>
      <tr>
        <th style="width: 35%">Getter</th>
        <th style="width: 45%">Value</th>
        <th style="width: 20%">Range</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ch in channels" :key="ch.getter">
        <td class="kl-getter"><code>{{ ch.getter }}</code></td>
        <td class="kl-value"><code>{{ ch.value }}</code></td>
        <td class="kl-range">{{ ch.range }}</td>
      </tr>
    </tbody>
  </table>
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

.kl-swatch {
  min-height: 80px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
}

.kl-channel-table {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin-top: 0;
  border: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface);
}

.kl-channel-table th {
  text-align: left;
  padding: 8px 14px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--kl-on-surface-variant);
  border-bottom: 1px solid var(--kl-outline-variant);
}

.kl-channel-table td {
  padding: 7px 14px;
  border-bottom: 1px solid var(--kl-outline-variant);
}

.kl-channel-table tr:last-child td {
  border-bottom: none;
}

.kl-getter code {
  color: var(--kl-primary, #a8c7fa);
}

.kl-value code {
  font-family: var(--vp-font-family-mono);
  white-space: pre;
}

.kl-range {
  color: var(--kl-on-surface-variant);
  font-size: 0.8rem;
}
</style>
