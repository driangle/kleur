<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { buildPalette, readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const base = ref("#ff6600");
const kind = ref<"triadic" | "tetradic" | "analogous" | "splitComplement" | "tints" | "shades" | "tones">("triadic");
const angle = ref(30);
const count = ref(4);

const palette = computed(() => buildPalette(kleur(base.value), kind.value, { angle: angle.value, count: count.value }));

const code = computed(() => {
  if (kind.value === "analogous" || kind.value === "splitComplement") {
    return `const palette = kleur("${base.value}").${kind.value}(${angle.value})`;
  }

  if (kind.value === "tints" || kind.value === "shades" || kind.value === "tones") {
    return `const palette = kleur("${base.value}").${kind.value}(${count.value})`;
  }

  return `const palette = kleur("${base.value}").${kind.value}()`;
});
</script>

<template>
  <DocsDemo
    title="Generate harmonies and tonal sets"
    description="Preview how each harmony function expands a base color into a related palette."
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
          <span>Palette Type</span>
          <select v-model="kind">
            <option value="triadic">triadic()</option>
            <option value="tetradic">tetradic()</option>
            <option value="analogous">analogous()</option>
            <option value="splitComplement">splitComplement()</option>
            <option value="tints">tints()</option>
            <option value="shades">shades()</option>
            <option value="tones">tones()</option>
          </select>
        </label>
        <label v-if="kind === 'analogous' || kind === 'splitComplement'" class="kl-field">
          <span>Angle: {{ angle }}&deg;</span>
          <input v-model.number="angle" type="range" min="10" max="90" step="5" />
        </label>
        <label v-if="kind === 'tints' || kind === 'shades' || kind === 'tones'" class="kl-field">
          <span>Count: {{ count }}</span>
          <input v-model.number="count" type="range" min="2" max="7" step="1" />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-palette">
        <div
          v-for="color in palette"
          :key="color.toHex()"
          class="kl-swatch"
          :style="{ background: color.toHex(), color: readableTextColor(color.toHex()) }"
        >
          {{ color.toHex() }}
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

.kl-palette {
  display: grid;
  gap: 10px;
}

.kl-swatch {
  min-height: 76px;
  display: grid;
  place-items: center;
  padding: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
}
</style>
