<script setup lang="ts">
import { computed, ref } from "vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const baseHex = ref("#ff6b35");
const harmonyMode = ref<"tetradic" | "triadic" | "analogous">("tetradic");
const lightIntensity = ref(0.3);

const materials = computed(() => {
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
    const dark = c.darken(0.4);
    const norm = c.toNormalized();
    return {
      hex: c.toHex(),
      litHex: lit.toHex(),
      darkHex: dark.toHex(),
      normalized: [norm[0].toFixed(3), norm[1].toFixed(3), norm[2].toFixed(3)],
      textColor: readableTextColor(c.toHex()),
      litTextColor: readableTextColor(lit.toHex()),
    };
  });
});
</script>

<template>
  <div class="kl-page">
    <header class="kl-page-header">
      <a href="./threejs" class="kl-back">&larr; Three.js</a>
      <div class="kl-page-controls">
        <label class="kl-ctrl">
          <span>Base</span>
          <input v-model="baseHex" type="color" />
        </label>
        <label class="kl-ctrl">
          <span>Harmony</span>
          <select v-model="harmonyMode">
            <option value="tetradic">Tetradic</option>
            <option value="triadic">Triadic</option>
            <option value="analogous">Analogous</option>
          </select>
        </label>
        <label class="kl-ctrl">
          <span>Light {{ (lightIntensity * 100).toFixed(0) }}%</span>
          <input v-model.number="lightIntensity" type="range" min="0" max="0.8" step="0.05" />
        </label>
      </div>
    </header>

    <div class="kl-stage">
      <div v-for="(m, i) in materials" :key="i" class="kl-material">
        <!-- Main swatch with pseudo-3D lighting -->
        <div class="kl-material__surface" :style="{ backgroundColor: m.hex }">
          <div
            class="kl-material__highlight"
            :style="{ background: `linear-gradient(135deg, ${m.litHex}33 0%, transparent 50%, ${m.darkHex}66 100%)` }"
          />
          <div class="kl-material__label" :style="{ color: m.textColor }">
            <span class="kl-material__tag">color</span>
            <span class="kl-material__hex">{{ m.hex }}</span>
          </div>
        </div>

        <!-- Emissive variant -->
        <div class="kl-material__emissive" :style="{ backgroundColor: m.litHex }">
          <div class="kl-material__label" :style="{ color: m.litTextColor }">
            <span class="kl-material__tag">emissive</span>
            <span class="kl-material__hex">{{ m.litHex }}</span>
          </div>
        </div>

        <!-- Normalized values -->
        <div class="kl-material__data">
          <div class="kl-material__row">
            <span class="kl-material__dim">r</span>
            <span>{{ m.normalized[0] }}</span>
          </div>
          <div class="kl-material__row">
            <span class="kl-material__dim">g</span>
            <span>{{ m.normalized[1] }}</span>
          </div>
          <div class="kl-material__row">
            <span class="kl-material__dim">b</span>
            <span>{{ m.normalized[2] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kl-page {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--kl-surface-lowest);
  color: var(--kl-on-surface);
}

.kl-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface-dim);
  gap: 16px;
  flex-wrap: wrap;
}

.kl-back {
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
  color: var(--kl-on-surface-variant);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.kl-back:hover {
  color: var(--kl-on-surface);
}

.kl-page-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.kl-ctrl {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  color: var(--kl-on-surface-variant);
}

.kl-ctrl input[type="color"] {
  width: 28px;
  height: 24px;
  padding: 0;
  border: 1px solid var(--kl-outline-variant);
  cursor: pointer;
}

.kl-ctrl input[type="range"] {
  width: 80px;
}

.kl-ctrl select {
  background: var(--kl-surface-dim);
  border: 1px solid var(--kl-outline-variant);
  color: var(--kl-on-surface);
  padding: 2px 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

.kl-stage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 32px;
  gap: 24px;
  align-content: center;
  justify-items: stretch;
}

.kl-material {
  display: grid;
  grid-template-rows: 1fr auto auto;
}

.kl-material__surface {
  position: relative;
  aspect-ratio: 1;
  display: grid;
  align-items: end;
  padding: 14px;
  transition: background-color 0.2s;
}

.kl-material__highlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.kl-material__emissive {
  padding: 10px 14px;
  transition: background-color 0.2s;
}

.kl-material__label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

.kl-material__tag {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.6;
}

.kl-material__hex {
  font-weight: 500;
}

.kl-material__data {
  padding: 10px 14px;
  background: var(--kl-surface-dim);
  display: grid;
  gap: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
}

.kl-material__row {
  display: flex;
  justify-content: space-between;
}

.kl-material__dim {
  opacity: 0.4;
  text-transform: uppercase;
}
</style>
