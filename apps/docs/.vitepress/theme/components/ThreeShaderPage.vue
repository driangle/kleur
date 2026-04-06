<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const baseHex = ref("#3a6bd5");

const result = computed(() => {
  const c = kleur(baseHex.value);
  const [r, g, b, a] = c.toNormalized();
  return {
    hex: c.toHex(),
    r: r.toFixed(4),
    g: g.toFixed(4),
    b: b.toFixed(4),
    a: a.toFixed(4),
    textColor: readableTextColor(c.toHex()),
  };
});

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    `import * as THREE from "three";`,
    ``,
    `const color = kleur("${baseHex.value}");`,
    `const [r, g, b, a] = color.toNormalized();`,
    `// => [${result.value.r}, ${result.value.g},`,
    `//     ${result.value.b}, ${result.value.a}]`,
    ``,
    `material.uniforms.uColor = {`,
    `  value: new THREE.Vector4(r, g, b, a),`,
    `};`,
    ``,
    `// GLSL usage:`,
    `// uniform vec4 uColor;`,
    `// gl_FragColor = uColor;`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./threejs"
    back-label="Three.js"
    title="Shader Uniforms"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Color</span>
        <input v-model="baseHex" type="color" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" />
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-swatch" :style="{ backgroundColor: result.hex, color: result.textColor }">
          <span class="kl-swatch__hex">{{ result.hex }}</span>
        </div>

        <div class="kl-uniforms">
          <div class="kl-uniform__title">toNormalized() &rarr; vec4</div>
          <div class="kl-uniform">
            <span class="kl-uniform__label">r</span>
            <div class="kl-uniform__bar-wrap">
              <div class="kl-uniform__bar" :style="{ width: `${parseFloat(result.r) * 100}%`, backgroundColor: `rgb(${Math.round(parseFloat(result.r) * 255)}, 0, 0)` }" />
            </div>
            <span class="kl-uniform__value">{{ result.r }}</span>
          </div>
          <div class="kl-uniform">
            <span class="kl-uniform__label">g</span>
            <div class="kl-uniform__bar-wrap">
              <div class="kl-uniform__bar" :style="{ width: `${parseFloat(result.g) * 100}%`, backgroundColor: `rgb(0, ${Math.round(parseFloat(result.g) * 255)}, 0)` }" />
            </div>
            <span class="kl-uniform__value">{{ result.g }}</span>
          </div>
          <div class="kl-uniform">
            <span class="kl-uniform__label">b</span>
            <div class="kl-uniform__bar-wrap">
              <div class="kl-uniform__bar" :style="{ width: `${parseFloat(result.b) * 100}%`, backgroundColor: `rgb(0, 0, ${Math.round(parseFloat(result.b) * 255)})` }" />
            </div>
            <span class="kl-uniform__value">{{ result.b }}</span>
          </div>
          <div class="kl-uniform">
            <span class="kl-uniform__label">a</span>
            <div class="kl-uniform__bar-wrap">
              <div class="kl-uniform__bar" :style="{ width: `${parseFloat(result.a) * 100}%`, backgroundColor: 'rgba(255, 255, 255, 0.4)' }" />
            </div>
            <span class="kl-uniform__value">{{ result.a }}</span>
          </div>
        </div>

        <div class="kl-glsl">
          <span class="kl-glsl__label">GLSL</span>
          <pre class="kl-glsl__code">uniform vec4 uColor;
// vec4({{ result.r }}, {{ result.g }}, {{ result.b }}, {{ result.a }})</pre>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-preview {
  display: grid;
  gap: 20px;
  padding: 24px;
  align-content: center;
  height: 100%;
}

.kl-swatch {
  height: 100px;
  display: grid;
  place-items: center;
  font-family: var(--vp-font-family-mono);
  font-size: 1.5rem;
  font-weight: 700;
  transition: background-color 0.2s;
}

.kl-uniforms {
  display: grid;
  gap: 8px;
}

.kl-uniform__title {
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.5;
  margin-bottom: 2px;
}

.kl-uniform {
  display: grid;
  grid-template-columns: 20px 1fr 70px;
  gap: 10px;
  align-items: center;
}

.kl-uniform__label {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  opacity: 0.4;
  text-transform: uppercase;
}

.kl-uniform__bar-wrap {
  height: 20px;
  background: var(--kl-surface-dim);
}

.kl-uniform__bar {
  height: 100%;
  transition: width 0.2s, background-color 0.2s;
}

.kl-uniform__value {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  text-align: right;
}

.kl-glsl {
  background: var(--kl-surface-dim);
  padding: 14px;
}

.kl-glsl__label {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.5;
  margin-bottom: 8px;
}

.kl-glsl__code {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--kl-on-surface);
}
</style>
