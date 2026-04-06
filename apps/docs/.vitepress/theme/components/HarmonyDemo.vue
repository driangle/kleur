<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

type HarmonyKind = "triadic" | "tetradic" | "analogous" | "splitComplement";

const base = ref("#e64a19");
const kind = ref<HarmonyKind>("triadic");
const angle = ref(30);

const baseColor = computed(() => kleur(base.value));

const palette = computed(() => {
  const c = baseColor.value;
  switch (kind.value) {
    case "triadic":
      return [...c.triadic()];
    case "tetradic":
      return [...c.tetradic()];
    case "analogous":
      return [...c.analogous(angle.value)];
    case "splitComplement":
      return [...c.splitComplement(angle.value)];
  }
});

function wheelPoint(hueDeg: number, radius: number, centerX: number, centerY: number) {
  const rad = ((hueDeg - 90) * Math.PI) / 180;
  return { x: centerX + radius * Math.cos(rad), y: centerY + radius * Math.sin(rad) };
}

const wheelSize = 200;
const cx = wheelSize / 2;
const cy = wheelSize / 2;
const maxRadius = 78;
const dotRadius = 8;

const baseLightness = computed(() => baseColor.value.toHsl().l);

const wheelStyle = computed(() => {
  const l = baseLightness.value;
  const stops = Array.from({ length: 13 }, (_, i) => {
    const h = i * 30;
    return `hsl(${h}, 80%, ${l}%) ${h}deg`;
  });
  // Radial: gray at center (desaturated), full color at rim
  // The center gray matches the lightness of the palette
  return {
    background: [
      `radial-gradient(circle, hsl(0 0% ${l}%) 0%, transparent 70%)`,
      `conic-gradient(from 0deg, ${stops.join(", ")})`,
    ].join(", "),
  };
});

const dots = computed(() =>
  palette.value.map((color, i) => {
    const hsl = color.toHsl();
    const r = (hsl.s / 100) * maxRadius;
    const pos = wheelPoint(hsl.h, r, cx, cy);
    return {
      ...pos,
      hex: color.toHex(),
      textColor: readableTextColor(color.toHex()),
      isBase: i === 0 || (kind.value === "analogous" && i === 1),
    };
  })
);

const connectorPath = computed(() => {
  if (dots.value.length < 2) return "";
  const pts = dots.value.map((d) => `${d.x},${d.y}`);
  return `M${pts.join("L")}Z`;
});

const code = computed(() => {
  if (kind.value === "analogous" || kind.value === "splitComplement") {
    return [
      `kleur("${base.value}").${kind.value}(`,
      `  ${angle.value}`,
      ")",
    ].join("\n");
  }
  return `kleur("${base.value}").${kind.value}()`;
});
</script>

<template>
  <DocsDemo
    title="Explore color harmonies"
    description="See how harmony functions distribute colors around the hue wheel."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <div class="kl-field">
          <span>Base Color</span>
          <input v-model="base" type="color" />
        </div>
        <label class="kl-field">
          <span>Harmony</span>
          <select v-model="kind">
            <option value="triadic">triadic()</option>
            <option value="tetradic">tetradic()</option>
            <option value="analogous">analogous()</option>
            <option value="splitComplement">splitComplement()</option>
          </select>
        </label>
        <label
          v-if="kind === 'analogous' || kind === 'splitComplement'"
          class="kl-field"
        >
          <span>Angle: {{ angle }}&deg;</span>
          <input
            v-model.number="angle"
            type="range"
            min="10"
            max="90"
            step="5"
          />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-harmony-preview">
        <div class="kl-wheel-wrap">
          <div class="kl-wheel-bg" :style="wheelStyle"></div>
          <svg
            class="kl-wheel-svg"
            :viewBox="`0 0 ${wheelSize} ${wheelSize}`"
          >
            <path
              :d="connectorPath"
              fill="none"
              stroke="var(--kl-on-surface)"
              stroke-width="1.5"
              stroke-dasharray="4 3"
              opacity="0.5"
            />
            <g v-for="(dot, i) in dots" :key="i">
              <circle
                :cx="dot.x"
                :cy="dot.y"
                :r="dot.isBase ? dotRadius * 1.4 : dotRadius"
                :fill="dot.hex"
                stroke="var(--kl-on-surface)"
                :stroke-width="dot.isBase ? 2.5 : 1.5"
              />
            </g>
          </svg>
        </div>
        <div class="kl-swatches">
          <div
            v-for="(color, i) in palette"
            :key="i"
            class="kl-swatch"
            :style="{
              background: color.toHex(),
              color: readableTextColor(color.toHex()),
            }"
          >
            {{ color.toHex() }}
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

.kl-harmony-preview {
  display: grid;
  gap: 16px;
}

.kl-wheel-wrap {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.kl-wheel-bg {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.9;
}

.kl-wheel-svg {
  position: relative;
  width: 100%;
  height: 100%;
}

.kl-swatches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 6px;
}

.kl-swatch {
  min-height: 56px;
  display: grid;
  place-items: center;
  padding: 8px 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
}
</style>
