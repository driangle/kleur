<script setup lang="ts">
import { computed, ref } from "vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const fromHex = ref("#1a1a8e");
const toHex = ref("#e8a030");
const steps = ref(10);

const colors = computed(() => {
  const from = kleur(fromHex.value);
  const to = kleur(toHex.value);
  return Array.from({ length: steps.value }, (_, i) => {
    const t = i / (steps.value - 1);
    const c = kleur.mix(from, to, t);
    return { hex: c.toHex(), css: c.toCss(), t };
  });
});
</script>

<template>
  <div class="kl-page">
    <header class="kl-page-header">
      <a href="./vanillajs" class="kl-back">&larr; Vanilla JS</a>
      <div class="kl-page-controls">
        <label class="kl-ctrl">
          <span>From</span>
          <input v-model="fromHex" type="color" />
        </label>
        <label class="kl-ctrl">
          <span>To</span>
          <input v-model="toHex" type="color" />
        </label>
        <label class="kl-ctrl">
          <span>{{ steps }}</span>
          <input v-model.number="steps" type="range" min="3" max="24" step="1" />
        </label>
      </div>
    </header>

    <div class="kl-stage">
      <div
        v-for="(c, i) in colors"
        :key="i"
        class="kl-strip"
        :style="{
          backgroundColor: c.hex,
          color: readableTextColor(c.hex),
          flex: 1,
        }"
      >
        <div class="kl-strip__inner">
          <span class="kl-strip__hex">{{ c.hex }}</span>
          <span class="kl-strip__t">{{ (c.t * 100).toFixed(0) }}%</span>
        </div>
      </div>
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

.kl-stage {
  display: flex;
  flex-direction: column;
}

.kl-strip {
  display: grid;
  place-items: center;
  transition: background-color 0.15s;
}

.kl-strip__inner {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  opacity: 0.9;
}

.kl-strip__t {
  opacity: 0.5;
  font-size: 0.7rem;
}
</style>
