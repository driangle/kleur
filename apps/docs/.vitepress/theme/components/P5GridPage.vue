<script setup lang="ts">
import { computed, ref, watchEffect, onMounted } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import kleur from "@driangle/kleur";

const baseHex = ref("#e84393");
const harmonyMode = ref<"analogous" | "triadic" | "tetradic">("analogous");
const cellCount = ref(12);

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

function draw() {
  const el = canvas.value;
  if (!el) return;
  const ctx = el.getContext("2d");
  if (!ctx) return;

  const rect = el.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  el.width = rect.width * dpr;
  el.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const count = cellCount.value;
  const w = rect.width;
  const h = rect.height;
  const cellW = w / count;
  const cellH = h / count;
  const colors = [...palette.value];

  ctx.clearRect(0, 0, w, h);

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      const idx = row * count + col;
      const color = colors[idx % colors.length];
      ctx.fillStyle = color.toHex();
      ctx.fillRect(col * cellW, row * cellH, cellW + 0.5, cellH + 0.5);
    }
  }
}

onMounted(() => {
  watchEffect(draw);
  window.addEventListener("resize", draw);
});

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    ``,
    `const base = kleur("${baseHex.value}");`,
    `const palette = base.${harmonyMode.value}()`,
    `  .spread(${cellCount.value * cellCount.value});`,
    ``,
    `function setup() {`,
    `  createCanvas(400, 400);`,
    `  noLoop();`,
    `}`,
    ``,
    `function draw() {`,
    `  const size = width / ${cellCount.value};`,
    `  let i = 0;`,
    ``,
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
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./p5js"
    back-label="p5.js"
    title="Palette-Driven Grid"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Base</span>
        <input v-model="baseHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>Harmony</span>
        <select v-model="harmonyMode">
          <option value="analogous">Analogous</option>
          <option value="triadic">Triadic</option>
          <option value="tetradic">Tetradic</option>
        </select>
      </label>
      <label class="kl-ctrl">
        <span>{{ cellCount }}&times;{{ cellCount }}</span>
        <input v-model.number="cellCount" type="range" min="3" max="24" step="1" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" />
    </template>

    <template #preview>
      <div class="kl-canvas-wrap">
        <canvas ref="canvas" class="kl-canvas" />
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-canvas-wrap {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.kl-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
