<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const baseHex = ref("#ff6b35");
const harmonyMode = ref<"tetradic" | "triadic" | "analogous">("tetradic");
const lightIntensity = ref(0.3);

const swatches = computed(() => {
  const base = kleur(baseHex.value);
  let colors;
  switch (harmonyMode.value) {
    case "triadic":
      colors = base.triadic();
      break;
    case "analogous":
      colors = base.analogous();
      break;
    default:
      colors = base.tetradic();
  }

  return [...colors].map((c) => {
    const lit = c.lighten(lightIntensity.value);
    const norm = c.toNormalized();
    const litNorm = lit.toNormalized();
    return {
      hex: c.toHex(),
      normalized: `[${norm[0].toFixed(2)}, ${norm[1].toFixed(2)}, ${norm[2].toFixed(2)}]`,
      litHex: lit.toHex(),
      litNormalized: `[${litNorm[0].toFixed(2)}, ${litNorm[1].toFixed(2)}, ${litNorm[2].toFixed(2)}]`,
    };
  });
});

const code = computed(() => {
  const lines = [
    `import kleur from "@driangle/kleur";`,
    `import * as THREE from "three";`,
    ``,
    `const base = kleur("${baseHex.value}");`,
    `const palette = base.${harmonyMode.value}();`,
    ``,
    `// Apply to Three.js materials`,
    `for (const color of palette) {`,
    `  const [r, g, b] = color.toNormalized();`,
    `  const material = new THREE.MeshStandardMaterial({`,
    `    color: new THREE.Color(r, g, b),`,
    `  });`,
    ``,
    `  // Lightened variant for emissive`,
    `  const [er, eg, eb] = color`,
    `    .lighten(${lightIntensity.value})`,
    `    .toNormalized();`,
    `  material.emissive = new THREE.Color(er, eg, eb);`,
    `  material.emissiveIntensity = 0.15;`,
    `}`,
  ];
  return lines.join("\n");
});
</script>

<template>
  <DocsDemo
    title="Harmony colors for 3D materials"
    description="Map kleur harmonies to Three.js materials using toNormalized() for WebGL-ready float values."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>Base Color</span>
          <input v-model="baseHex" type="color" />
        </label>
        <label class="kl-field">
          <span>Harmony</span>
          <select v-model="harmonyMode">
            <option value="tetradic">Tetradic</option>
            <option value="triadic">Triadic</option>
            <option value="analogous">Analogous</option>
          </select>
        </label>
        <label class="kl-field">
          <span>Light Intensity ({{ lightIntensity.toFixed(2) }})</span>
          <input v-model.number="lightIntensity" type="range" min="0" max="0.8" step="0.05" />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-materials">
        <div v-for="(s, i) in swatches" :key="i" class="kl-material">
          <div class="kl-material__row">
            <div
              class="kl-material__swatch"
              :style="{
                backgroundColor: s.hex,
                boxShadow: `inset 0 -40px 30px -20px rgba(0,0,0,0.25), inset 0 2px 8px rgba(255,255,255,0.12)`,
              }"
            />
            <div
              class="kl-material__swatch kl-material__swatch--lit"
              :style="{
                backgroundColor: s.litHex,
                boxShadow: `inset 0 -40px 30px -20px rgba(0,0,0,0.15), inset 0 2px 8px rgba(255,255,255,0.18)`,
              }"
            />
          </div>
          <div class="kl-material__info">
            <div class="kl-material__label">
              <span class="kl-material__tag">color</span>
              <span :style="{ color: s.hex }">{{ s.hex }}</span>
            </div>
            <div class="kl-material__label">
              <span class="kl-material__tag">normalized</span>
              <span>{{ s.normalized }}</span>
            </div>
            <div class="kl-material__label">
              <span class="kl-material__tag">emissive</span>
              <span :style="{ color: s.litHex }">{{ s.litHex }}</span>
            </div>
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

.kl-materials {
  display: grid;
  gap: 16px;
  padding: 16px;
}

.kl-material__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.kl-material__swatch {
  height: 64px;
  transition: background-color 0.2s;
}

.kl-material__swatch--lit {
  opacity: 0.85;
}

.kl-material__info {
  display: grid;
  gap: 3px;
  padding: 8px 0;
}

.kl-material__label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
}

.kl-material__tag {
  font-size: 0.62rem;
  color: var(--kl-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 65px;
}
</style>
