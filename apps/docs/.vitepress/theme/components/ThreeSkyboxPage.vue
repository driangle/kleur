<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const horizonHex = ref("#ff7b54");
const zenithHex = ref("#1a1a3e");
const bands = ref(8);

const gradient = computed(() => {
  const horizon = kleur(horizonHex.value);
  const zenith = kleur(zenithHex.value);
  return Array.from({ length: bands.value }, (_, i) => {
    const t = i / (bands.value - 1);
    const c = kleur.mix(horizon, zenith, t);
    const norm = c.toNormalized();
    return {
      hex: c.toHex(),
      t,
      normalized: [norm[0].toFixed(3), norm[1].toFixed(3), norm[2].toFixed(3)],
      textColor: readableTextColor(c.toHex()),
    };
  });
});

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    `import * as THREE from "three";`,
    ``,
    `const horizon = kleur("${horizonHex.value}");`,
    `const zenith  = kleur("${zenithHex.value}");`,
    ``,
    `for (let i = 0; i < ${bands.value}; i++) {`,
    `  const t = i / ${bands.value - 1};`,
    `  const [r, g, b] = kleur`,
    `    .mix(horizon, zenith, t)`,
    `    .toNormalized();`,
    `  uniforms.skyColors.value[i] =`,
    `    new THREE.Color(r, g, b);`,
    `}`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./threejs"
    back-label="Three.js"
    title="Gradient Skybox"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Horizon</span>
        <input v-model="horizonHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>Zenith</span>
        <input v-model="zenithHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>Bands {{ bands }}</span>
        <input v-model.number="bands" type="range" min="3" max="16" step="1" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" />
    </template>

    <template #preview>
      <div class="kl-preview">
        <div
          v-for="(b, i) in gradient"
          :key="i"
          class="kl-band"
          :style="{ backgroundColor: b.hex, color: b.textColor, flex: 1 }"
        >
          <span class="kl-band__info">
            <span class="kl-band__hex">{{ b.hex }}</span>
            <span class="kl-band__norm">vec3({{ b.normalized.join(", ") }})</span>
          </span>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-preview {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.kl-band {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s;
}

.kl-band__info {
  display: flex;
  gap: 16px;
  align-items: center;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

.kl-band__norm {
  opacity: 0.6;
  font-size: 0.68rem;
}
</style>
