<script setup lang="ts">
import { computed, ref, watchEffect, onMounted, onUnmounted } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const baseHex = ref("#e84393");
const harmonyMode = ref<"analogous" | "triadic" | "tetradic">("analogous");
const cellCount = ref(10);

const canvas = ref<HTMLCanvasElement | null>(null);

const palette = computed(() => {
  const base = kleur(baseHex.value);
  let colors;
  switch (harmonyMode.value) {
    case "triadic":
      colors = base.triadic();
      break;
    case "tetradic":
      colors = base.tetradic();
      break;
    default:
      colors = base.analogous();
  }
  return colors.spread(cellCount.value * cellCount.value);
});

const hexList = computed(() => [...palette.value].map((c) => c.toHex()));

function draw() {
  const el = canvas.value;
  if (!el) return;
  const ctx = el.getContext("2d");
  if (!ctx) return;

  const count = cellCount.value;
  const size = el.width / count;
  const colors = [...palette.value];

  ctx.clearRect(0, 0, el.width, el.height);

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      const idx = row * count + col;
      const color = colors[idx % colors.length];
      ctx.fillStyle = color.toHex();
      ctx.fillRect(col * size, row * size, size, size);
    }
  }
}

onMounted(() => {
  watchEffect(draw);
});

const code = computed(() => {
  const lines = [
    `import kleur from "@driangle/kleur";`,
    ``,
    `const base = kleur("${baseHex.value}");`,
    `const palette = base.${harmonyMode.value}()`,
    `  .spread(${cellCount.value * cellCount.value});`,
    ``,
    `// In p5.js setup() / draw():`,
    `function draw() {`,
    `  const size = width / ${cellCount.value};`,
    `  let i = 0;`,
    `  for (const color of palette) {`,
    `    const [r, g, b] = color.toArray();`,
    `    fill(r, g, b);`,
    `    noStroke();`,
    `    rect(`,
    `      (i % ${cellCount.value}) * size,`,
    `      Math.floor(i / ${cellCount.value}) * size,`,
    `      size, size`,
    `    );`,
    `    i++;`,
    `  }`,
    `}`,
  ];
  return lines.join("\n");
});
</script>

<template>
  <DocsDemo
    title="Palette-driven generative grid"
    description="Use kleur harmonies spread across a grid to create generative color fields — ready for p5.js fill() calls."
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
            <option value="analogous">Analogous</option>
            <option value="triadic">Triadic</option>
            <option value="tetradic">Tetradic</option>
          </select>
        </label>
        <label class="kl-field">
          <span>Grid Size ({{ cellCount }}&times;{{ cellCount }})</span>
          <input v-model.number="cellCount" type="range" min="3" max="16" step="1" />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-canvas-wrap">
        <canvas ref="canvas" width="400" height="400" class="kl-canvas" />
        <div class="kl-color-row">
          <div
            v-for="(hex, i) in hexList.slice(0, 6)"
            :key="i"
            class="kl-mini-swatch"
            :style="{ backgroundColor: hex, color: readableTextColor(hex) }"
          >
            {{ hex }}
          </div>
          <div v-if="hexList.length > 6" class="kl-mini-swatch kl-mini-swatch--more">
            +{{ hexList.length - 6 }}
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

.kl-canvas-wrap {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 200px;
}

.kl-canvas {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  display: block;
}

.kl-color-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 10px;
  border-top: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface-lowest);
}

.kl-mini-swatch {
  padding: 3px 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  white-space: nowrap;
}

.kl-mini-swatch--more {
  background: transparent;
  color: var(--kl-on-surface-variant);
  border: 1px dashed var(--kl-outline-variant);
}
</style>
