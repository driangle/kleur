<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import { LinearGradientBuilder, RadialGradientBuilder } from "@driangle/kleur";

interface Stop {
  offset: number;
  color: string;
}

const kind = ref<"linear" | "radial">("linear");
const stops = ref<Stop[]>([
  { offset: 0, color: "#ff0000" },
  { offset: 0.5, color: "#00ff00" },
  { offset: 1, color: "#0000ff" },
]);

function addStop() {
  const last = stops.value[stops.value.length - 1];
  stops.value.push({ offset: Math.min(last.offset + 0.1, 1), color: "#ffff00" });
}

function removeStop(index: number) {
  if (stops.value.length > 2) {
    stops.value.splice(index, 1);
  }
}

const gradient = computed(() => {
  if (kind.value === "radial") {
    const builder = new RadialGradientBuilder().from(50, 50, 0).to(50, 50, 50);
    for (const stop of stops.value) builder.addStop(stop.offset, stop.color);
    return builder.build();
  }

  const builder = new LinearGradientBuilder().from(0, 0).to(0, 100);
  for (const stop of stops.value) builder.addStop(stop.offset, stop.color);
  return builder.build();
});

const cssGradient = computed(() => {
  const colorStops = gradient.value.stops
    .map((s) => `${s.color.toHex()} ${Math.round(s.offset * 100)}%`)
    .join(", ");

  return kind.value === "radial"
    ? `radial-gradient(circle, ${colorStops})`
    : `linear-gradient(to bottom, ${colorStops})`;
});

const code = computed(() => {
  if (kind.value === "radial") {
    const lines = [
      "new RadialGradientBuilder()",
      "  .from(50, 50, 0)",
      "  .to(50, 50, 50)",
    ];
    for (const stop of stops.value) {
      lines.push(`  .addStop(${stop.offset}, "${stop.color}")`);
    }
    lines.push("  .build()");
    return lines.join("\n");
  }

  const lines = [
    "new LinearGradientBuilder()",
    "  .from(0, 0)",
    "  .to(0, 100)",
  ];
  for (const stop of stops.value) {
    lines.push(`  .addStop(${stop.offset}, "${stop.color}")`);
  }
  lines.push("  .build()");
  return lines.join("\n");
});
</script>

<template>
  <DocsDemo
    title="Build gradients interactively"
    description="Use the fluent builder API to construct linear or radial gradients with color stops."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>Type</span>
          <select v-model="kind">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </label>

        <div class="kl-stops">
          <span class="kl-stops__label">Color Stops</span>
          <div v-for="(stop, i) in stops" :key="i" class="kl-stop">
            <input v-model="stop.color" type="color" class="kl-stop__color" />
            <label class="kl-stop__offset">
              <span>{{ stop.offset.toFixed(2) }}</span>
              <input v-model.number="stop.offset" type="range" min="0" max="1" step="0.01" />
            </label>
            <button
              v-if="stops.length > 2"
              class="kl-stop__remove"
              title="Remove stop"
              @click="removeStop(i)"
            >
              &times;
            </button>
          </div>
          <button class="kl-stops__add" @click="addStop">+ Add Stop</button>
        </div>
      </div>
    </template>

    <template #preview>
      <div class="kl-gradient-preview" :class="`kl-gradient-preview--${kind}`">
        <!-- Linear preview -->
        <template v-if="kind === 'linear'">
          <div class="kl-gradient-bar">
            <div class="kl-gradient-fill" :style="{ background: cssGradient }" />
          </div>
          <div class="kl-gradient-stops">
            <div
              v-for="(stop, i) in gradient.stops"
              :key="i"
              class="kl-gradient-stop-caret"
              :style="{ top: `${stop.offset * 100}%`, transform: 'translateY(-50%)', borderRightColor: stop.color.toHex() }"
            />
            <div
              v-for="(stop, i) in gradient.stops"
              :key="`label-${i}`"
              class="kl-gradient-stop-label"
              :style="{
                top: `${stop.offset * 100}%`,
                left: '6px',
                transform: `translateY(${-stop.offset * 100}%)`,
                background: stop.color.toHex(),
                color: readableTextColor(stop.color.toHex()),
              }"
            >
              {{ stop.color.toHex() }}
            </div>
          </div>
        </template>

        <!-- Radial preview -->
        <template v-else>
          <div class="kl-radial-container">
            <div class="kl-radial-circle" :style="{ background: cssGradient }">
              <div
                v-for="(stop, i) in gradient.stops"
                :key="i"
                class="kl-radial-ring"
                :style="{
                  width: `${stop.offset * 100}%`,
                  height: `${stop.offset * 100}%`,
                  borderColor: readableTextColor(stop.color.toHex()),
                }"
              />
            </div>
            <div class="kl-radial-labels">
              <div
                v-for="(stop, i) in gradient.stops"
                :key="i"
                class="kl-radial-label"
                :style="{
                  background: stop.color.toHex(),
                  color: readableTextColor(stop.color.toHex()),
                }"
              >
                {{ stop.color.toHex() }} @ {{ Math.round(stop.offset * 100) }}%
              </div>
            </div>
          </div>
        </template>
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

.kl-stops {
  display: grid;
  gap: 8px;
}

.kl-stops__label {
  font-size: 0.8rem;
  color: var(--kl-on-surface-variant);
}

.kl-stop {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  gap: 8px;
}

.kl-stop__color {
  width: 32px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--kl-outline-variant);
  cursor: pointer;
}

.kl-stop__offset {
  display: grid;
  gap: 2px;
}

.kl-stop__offset span {
  font-size: 0.72rem;
  font-family: var(--vp-font-family-mono);
  color: var(--kl-on-surface-variant);
}

.kl-stop__remove {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border: 1px solid var(--kl-outline-variant);
  background: transparent;
  color: var(--kl-on-surface-variant);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}

.kl-stop__remove:hover {
  background: var(--kl-surface-lowest);
}

.kl-stops__add {
  padding: 6px 12px;
  border: 1px dashed var(--kl-outline-variant);
  background: transparent;
  color: var(--kl-on-surface-variant);
  cursor: pointer;
  font-size: 0.8rem;
}

.kl-stops__add:hover {
  background: var(--kl-surface-lowest);
}

.kl-gradient-preview {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  min-height: 200px;
}

.kl-gradient-preview--linear {
  grid-template-rows: none;
  grid-template-columns: 1fr auto;
}

.kl-gradient-bar {
  min-height: 140px;
}

.kl-gradient-fill {
  width: 100%;
  height: 100%;
}

.kl-radial-container {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  min-height: 200px;
}

.kl-radial-circle {
  position: relative;
  aspect-ratio: 1;
  max-height: 300px;
  border-radius: 50%;
  margin: 12px auto;
  display: grid;
  place-items: center;
}

.kl-radial-ring {
  position: absolute;
  border: 1px dashed;
  border-radius: 50%;
  opacity: 0.5;
}

.kl-radial-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px;
  justify-content: center;
  border-top: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface-lowest);
}

.kl-radial-label {
  padding: 3px 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  white-space: nowrap;
}

.kl-gradient-stops {
  position: relative;
  height: 60px;
  border-top: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface-lowest);
}

.kl-gradient-preview--linear .kl-gradient-stops {
  height: auto;
  width: 80px;
  border-top: 0;
  border-left: 1px solid var(--kl-outline-variant);
}

.kl-gradient-stop-caret {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid transparent;
}

.kl-gradient-preview--linear .kl-gradient-stop-caret {
  border-left: 0;
  border-right: 6px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.kl-gradient-stop-label {
  position: absolute;
  padding: 3px 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  white-space: nowrap;
}
</style>
