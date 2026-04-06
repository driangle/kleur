<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import kleur from "@driangle/kleur";

const hueRange = ref<"warm" | "cool" | "any">("warm");
const satMin = ref(40);
const satMax = ref(80);
const lightMin = ref(30);
const lightMax = ref(70);
const dotCount = ref(50);

const canvas = ref<HTMLCanvasElement | null>(null);
let seed = 0;

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

  ctx.fillStyle = "var(--kl-surface-lowest, #0e0e0e)";
  ctx.fillRect(0, 0, rect.width, rect.height);

  // Simple seeded random for deterministic output per config
  seed = 42;
  function rand() {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  }

  const hueOpt = hueRange.value === "any" ? undefined : hueRange.value;
  for (let i = 0; i < dotCount.value; i++) {
    const color = kleur.random({
      hue: hueOpt,
      saturation: [satMin.value, satMax.value],
      lightness: [lightMin.value, lightMax.value],
    });
    const [r, g, b] = color.toArray();
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.arc(rand() * rect.width, rand() * rect.height, 10 + rand() * 15, 0, Math.PI * 2);
    ctx.fill();
  }
}

onMounted(() => {
  watchEffect(draw);
  window.addEventListener("resize", draw);
});

const code = ref("");
watchEffect(() => {
  code.value = [
    `import kleur from "@driangle/kleur";`,
    ``,
    `function draw() {`,
    `  for (let i = 0; i < ${dotCount.value}; i++) {`,
    `    const color = kleur.random({`,
    hueRange.value !== "any"
      ? `      hue: "${hueRange.value}",`
      : `      // hue: unconstrained`,
    `      saturation: [${satMin.value}, ${satMax.value}],`,
    `      lightness: [${lightMin.value}, ${lightMax.value}],`,
    `    });`,
    `    const [r, g, b] = color.toArray();`,
    `    fill(r, g, b);`,
    `    ellipse(`,
    `      random(width), random(height),`,
    `      20, 20`,
    `    );`,
    `  }`,
    `}`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./p5js"
    back-label="p5.js"
    title="Random Variations"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Hue</span>
        <select v-model="hueRange">
          <option value="warm">Warm</option>
          <option value="cool">Cool</option>
          <option value="any">Any</option>
        </select>
      </label>
      <label class="kl-ctrl">
        <span>Dots {{ dotCount }}</span>
        <input v-model.number="dotCount" type="range" min="10" max="120" step="5" />
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
