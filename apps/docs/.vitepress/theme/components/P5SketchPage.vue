<script setup lang="ts">
import { computed, ref, watchEffect, onMounted } from "vue";
import { readableTextColor } from "../lib/demo";
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
</script>

<template>
  <div class="kl-page">
    <header class="kl-page-header">
      <a href="./p5js" class="kl-back">&larr; p5.js</a>
      <div class="kl-page-controls">
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
      </div>
    </header>

    <div class="kl-stage">
      <canvas ref="canvas" class="kl-canvas" />
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
  position: relative;
  overflow: hidden;
}

.kl-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
