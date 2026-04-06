<script setup lang="ts">
import { computed, ref, onMounted, watchEffect } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import kleur from "@driangle/kleur";

const baseHex = ref("#e84393");
const canvas = ref<HTMLCanvasElement | null>(null);

const formats = computed(() => {
  const c = kleur(baseHex.value);
  const [r, g, b] = c.toArray();
  return {
    array: { r, g, b, label: `fill(${r}, ${g}, ${b})`, method: ".toArray()" },
    hex: { value: c.toHex(), label: `fill("${c.toHex()}")`, method: ".toHex()" },
    css: { value: c.toCss(), label: `fill("${c.toCss()}")`, method: ".toCss()" },
  };
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

  const w = rect.width;
  const h = rect.height;
  const c = kleur(baseHex.value);
  const [r, g, b] = c.toArray();
  const hex = c.toHex();
  const css = c.toCss();

  // Background
  ctx.fillStyle = "#0e0e0e";
  ctx.fillRect(0, 0, w, h);

  const colW = w / 3;
  const shapeSize = Math.min(colW * 0.55, h * 0.35);
  const cy = h * 0.42;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Column 1: fill(r, g, b) via .toArray()
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.beginPath();
  ctx.arc(colW * 0.5, cy, shapeSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Column 2: fill(hex) via .toHex()
  ctx.fillStyle = hex;
  const x2 = colW * 1.5 - shapeSize / 2;
  ctx.fillRect(x2, cy - shapeSize / 2, shapeSize, shapeSize);

  // Column 3: fill(css) via .toCss()
  ctx.fillStyle = css;
  const x3 = colW * 2.5;
  ctx.beginPath();
  ctx.moveTo(x3, cy - shapeSize / 2);
  ctx.lineTo(x3 + shapeSize / 2, cy + shapeSize / 2);
  ctx.lineTo(x3 - shapeSize / 2, cy + shapeSize / 2);
  ctx.closePath();
  ctx.fill();

  // Labels
  const labelY = cy + shapeSize / 2 + 28;
  const methodY = labelY + 20;
  ctx.font = "500 12px 'JetBrains Mono', monospace";

  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText(".toArray()", colW * 0.5, labelY);
  ctx.fillText(".toHex()", colW * 1.5, labelY);
  ctx.fillText(".toCss()", colW * 2.5, labelY);

  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.fillText(`fill(${r}, ${g}, ${b})`, colW * 0.5, methodY);
  ctx.fillText(`fill("${hex}")`, colW * 1.5, methodY);
  ctx.fillText(`fill("${css}")`, colW * 2.5, methodY);
}

onMounted(() => {
  watchEffect(draw);
  window.addEventListener("resize", draw);
});

const code = computed(() => {
  const c = kleur(baseHex.value);
  const [r, g, b] = c.toArray();
  return [
    `import kleur from "@driangle/kleur";`,
    ``,
    `const color = kleur("${baseHex.value}");`,
    ``,
    `// RGB components for fill(r, g, b)`,
    `const [r, g, b] = color.toArray();`,
    `fill(r, g, b); // fill(${r}, ${g}, ${b})`,
    `ellipse(x, y, size, size);`,
    ``,
    `// Hex string for fill("#...")`,
    `fill(color.toHex()); // fill("${c.toHex()}")`,
    `rect(x, y, size, size);`,
    ``,
    `// CSS string for p5's color()`,
    `fill(color.toCss()); // fill("${c.toCss()}")`,
    `triangle(x1, y1, x2, y2, x3, y3);`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./p5js"
    back-label="p5.js"
    title="Color Output Formats"
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
