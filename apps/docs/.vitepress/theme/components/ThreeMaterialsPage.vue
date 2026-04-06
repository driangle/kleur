<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
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

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    `import * as THREE from "three";`,
    ``,
    `const base = kleur("${baseHex.value}");`,
    `const palette = base.${harmonyMode.value}();`,
    ``,
    `const meshes = [];`,
    `for (const color of palette) {`,
    `  const [r, g, b] = color.toNormalized();`,
    `  const material = new THREE.MeshStandardMaterial({`,
    `    color: new THREE.Color(r, g, b),`,
    `  });`,
    ``,
    `  const [er, eg, eb] = color`,
    `    .lighten(${lightIntensity.value}).toNormalized();`,
    `  material.emissive = new THREE.Color(er, eg, eb);`,
    `  material.emissiveIntensity = 0.15;`,
    ``,
    `  meshes.push(new THREE.Mesh(geometry, material));`,
    `}`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./threejs"
    back-label="Three.js"
    title="Material Colors"
  >
    <template #controls>
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
    </template>

    <template #code>
      <CodeBlock :code="code" />
    </template>

    <template #preview>
      <div class="kl-stage">
        <div v-for="(m, i) in materials" :key="i" class="kl-material">
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

          <div class="kl-material__emissive" :style="{ backgroundColor: m.litHex }">
            <div class="kl-material__label" :style="{ color: m.litTextColor }">
              <span class="kl-material__tag">emissive</span>
              <span class="kl-material__hex">{{ m.litHex }}</span>
            </div>
          </div>

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
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-stage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  padding: 24px;
  gap: 20px;
  align-content: center;
  height: 100%;
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
  padding: 12px;
  transition: background-color 0.2s;
}

.kl-material__highlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.kl-material__emissive {
  padding: 8px 12px;
  transition: background-color 0.2s;
}

.kl-material__label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
}

.kl-material__tag {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.6;
}

.kl-material__hex {
  font-weight: 500;
}

.kl-material__data {
  padding: 8px 12px;
  background: var(--kl-surface-dim);
  display: grid;
  gap: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
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
