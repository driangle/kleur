<script setup lang="ts">
import { ref, computed } from "vue";
import kleur from "@driangle/kleur";
import type { Color } from "@driangle/kleur";

interface Operation {
  method: string;
  arg: number;
  enabled: boolean;
}

const METHODS = [
  { name: "lighten", default: 0.2, min: 0, max: 1, step: 0.05 },
  { name: "darken", default: 0.2, min: 0, max: 1, step: 0.05 },
  { name: "saturate", default: 0.3, min: 0, max: 1, step: 0.05 },
  { name: "desaturate", default: 0.3, min: 0, max: 1, step: 0.05 },
  { name: "rotate", default: 90, min: 0, max: 360, step: 5 },
  { name: "warm", default: 0.2, min: 0, max: 1, step: 0.05 },
  { name: "cool", default: 0.2, min: 0, max: 1, step: 0.05 },
] as const;

const inputColor = ref("#ff7f50");
const operations = ref<Operation[]>([{ method: "lighten", arg: 0.2, enabled: true }]);

const baseColor = computed(() => {
  try {
    return kleur.hex(inputColor.value);
  } catch {
    return null;
  }
});

const resultColor = computed(() => {
  if (!baseColor.value) return null;
  try {
    let color: Color = baseColor.value;
    for (const op of operations.value) {
      if (!op.enabled) continue;
      const fn = color[op.method as keyof Color];
      if (typeof fn === "function") {
        color = (fn as (arg: number) => Color).call(color, op.arg);
      }
    }
    return color;
  } catch {
    return null;
  }
});

const resultHex = computed(() => resultColor.value?.toHex() ?? inputColor.value);

const codeString = computed(() => {
  const chain = operations.value
    .map((op) => `.${op.method}(${op.arg})`)
    .join("");
  return `kleur("${inputColor.value}")${chain}.hex()`;
});

function getMethodConfig(name: string) {
  return METHODS.find((m) => m.name === name) ?? METHODS[0];
}

function addOperation() {
  const available = METHODS.find(
    (m) => !operations.value.some((op) => op.method === m.name)
  );
  if (available) {
    operations.value.push({
      method: available.name,
      arg: available.default,
      enabled: true,
    });
  }
}

function removeOperation(index: number) {
  operations.value.splice(index, 1);
}

function textColor(hex: string): string {
  // Quick luminance check for readable text
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 140
    ? "rgba(0,0,0,0.7)"
    : "rgba(255,255,255,0.7)";
}

function textColorStrong(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 140 ? "#000" : "#fff";
}
</script>

<template>
  <section class="kl-shell">
    <div class="kl-shell-code">
      <div class="kl-shell-chrome">
        <span class="kl-dot"></span>
        <span class="kl-dot"></span>
        <span class="kl-dot"></span>
        <span class="kl-shell-label">Interactive Shell</span>
      </div>

      <!-- Code display -->
      <div class="kl-shell-line">
        <pre class="kl-shell-snippet"><span class="kl-kw">const</span> result = <span class="kl-fn">kleur</span>(<span class="kl-str" :style="{ color: inputColor }">"{{ inputColor }}"</span>)
<template v-for="(op, i) in operations" :key="i"><span :class="{ 'kl-disabled': !op.enabled }">  <span v-if="!op.enabled" class="kl-comment">// </span>.<span class="kl-fn">{{ op.method }}</span>(<span class="kl-num">{{ op.arg }}</span>)</span>
</template>  .<span class="kl-fn">hex</span>()</pre>
      </div>

      <!-- Controls -->
      <div class="kl-shell-controls">
        <!-- Color input -->
        <div class="kl-control-row">
          <div class="kl-row-left">
            <input
              type="color"
              v-model="inputColor"
              class="kl-color-picker"
            />
            <input
              type="text"
              v-model="inputColor"
              class="kl-color-text"
              spellcheck="false"
              maxlength="7"
            />
          </div>
        </div>

        <!-- Method operations -->
        <div
          v-for="(op, i) in operations"
          :key="i"
          class="kl-control-row"
        >
          <div class="kl-row-left">
            <button
              class="kl-toggle-btn"
              :class="{ 'kl-toggle-off': !op.enabled }"
              @click="op.enabled = !op.enabled"
              :aria-label="op.enabled ? 'Disable operation' : 'Enable operation'"
            >
              <span class="kl-toggle-track">
                <span class="kl-toggle-thumb"></span>
              </span>
            </button>
            <select v-model="op.method" class="kl-method-select" @change="op.arg = getMethodConfig(op.method).default">
              <option v-for="m in METHODS" :key="m.name" :value="m.name">
                .{{ m.name }}()
              </option>
            </select>
          </div>
          <div class="kl-row-right" :class="{ 'kl-slider-disabled': !op.enabled }">
            <input
              type="range"
              :min="getMethodConfig(op.method).min"
              :max="getMethodConfig(op.method).max"
              :step="getMethodConfig(op.method).step"
              v-model.number="op.arg"
              class="kl-slider"
            />
            <span class="kl-slider-value">{{ op.arg }}</span>
            <button
              v-if="operations.length > 1"
              class="kl-remove-btn"
              @click="removeOperation(i)"
              aria-label="Remove operation"
            >
              &times;
            </button>
          </div>
        </div>

        <!-- Add operation -->
        <button
          v-if="operations.length < METHODS.length"
          class="kl-add-btn"
          @click="addOperation"
        >
          + Add Method
        </button>
      </div>
    </div>

    <!-- Live preview -->
    <div class="kl-shell-preview-wrap">
      <div
        class="kl-shell-preview kl-preview-before"
        :style="{ background: inputColor }"
      >
        <span
          class="kl-preview-label"
          :style="{ color: textColor(inputColor) }"
        >
          Input
        </span>
        <span
          class="kl-preview-hex"
          :style="{ color: textColorStrong(inputColor) }"
        >
          {{ inputColor }}
        </span>
      </div>
      <div
        class="kl-shell-preview kl-preview-after"
        :style="{ background: resultHex }"
      >
        <span
          class="kl-preview-label"
          :style="{ color: textColor(resultHex) }"
        >
          Result
        </span>
        <span
          class="kl-preview-hex"
          :style="{ color: textColorStrong(resultHex) }"
        >
          {{ resultHex }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kl-shell {
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 120px;
}

@media (min-width: 768px) {
  .kl-shell {
    grid-template-columns: 60% 40%;
  }
}

/* ── Code panel ── */
.kl-shell-code {
  background: var(--kl-surface-dim);
  padding: 28px 32px;
  border: 1px solid var(--kl-outline-variant);
}

.kl-shell-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.kl-dot {
  width: 10px;
  height: 10px;
  background: var(--kl-surface-high);
}

.kl-shell-label {
  margin-left: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--kl-outline-variant);
}

.kl-shell-line {
  margin-bottom: 20px;
  overflow-x: auto;
}

.kl-shell-snippet {
  font-family: var(--vp-font-family-mono) !important;
  font-size: clamp(0.8rem, 1.5vw, 1rem) !important;
  line-height: 1.8;
  color: var(--kl-outline) !important;
  background: none !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  white-space: pre;
  overflow-x: auto;
}

.kl-kw { color: var(--kl-outline); }
.kl-fn { color: var(--kl-on-surface); }
.kl-str { transition: color 0.2s; }
.kl-num { color: var(--kl-on-surface); }
.kl-comment { color: var(--kl-outline-variant); }
.kl-disabled { opacity: 0.35; }
.kl-disabled .kl-fn,
.kl-disabled .kl-num { color: var(--kl-outline); }

/* ── Controls ── */
.kl-shell-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid var(--kl-surface-low);
  padding-top: 16px;
}

.kl-control-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Shared left column — fixed width for alignment */
.kl-row-left {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 148px;
  flex-shrink: 0;
}

/* Shared right column — fills remaining space */
.kl-row-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.kl-color-picker {
  width: 26px;
  height: 26px;
  border: 1px solid var(--kl-surface-highest);
  background: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  -webkit-appearance: none;
  appearance: none;
}

.kl-color-picker::-webkit-color-swatch-wrapper {
  padding: 2px;
}

.kl-color-picker::-webkit-color-swatch {
  border: none;
}

.kl-color-text {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  background: var(--kl-surface-low);
  border: 1px solid var(--kl-surface-highest);
  color: var(--kl-on-surface);
  padding: 5px 8px;
  width: 96px;
  outline: none;
  transition: border-color 0.2s;
}

.kl-color-text:focus {
  border-color: var(--kl-outline);
}

/* ── Toggle switch ── */
.kl-toggle-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.kl-toggle-track {
  display: block;
  width: 24px;
  height: 12px;
  background: var(--kl-on-surface);
  position: relative;
  transition: background 0.2s;
}

.kl-toggle-thumb {
  display: block;
  width: 8px;
  height: 8px;
  background: var(--kl-surface-dim);
  position: absolute;
  top: 2px;
  left: 14px;
  transition: left 0.2s;
}

.kl-toggle-off .kl-toggle-track {
  background: var(--kl-surface-highest);
}

.kl-toggle-off .kl-toggle-thumb {
  left: 2px;
  background: var(--kl-outline);
}

.kl-slider-disabled {
  opacity: 0.3;
  pointer-events: none;
}

.kl-method-select {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  background: var(--kl-surface-low);
  border: 1px solid var(--kl-surface-highest);
  color: var(--kl-on-surface);
  padding: 5px 8px;
  outline: none;
  cursor: pointer;
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
}

.kl-method-select:focus {
  border-color: var(--kl-outline);
}

.kl-remove-btn {
  background: none;
  border: none;
  color: var(--kl-surface-highest);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.15s;
}

.kl-remove-btn:hover {
  color: var(--kl-outline);
}

.kl-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  background: var(--kl-surface-highest);
  outline: none;
}

.kl-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: var(--kl-on-surface);
  cursor: pointer;
  border: none;
}

.kl-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: var(--kl-on-surface);
  cursor: pointer;
  border: none;
}

.kl-slider-value {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--kl-outline);
  width: 48px;
  flex-shrink: 0;
  text-align: right;
}

.kl-add-btn {
  background: none;
  border: 1px dashed var(--kl-surface-highest);
  color: var(--kl-outline);
  padding: 8px;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  font-family: var(--vp-font-family-base);
}

.kl-add-btn:hover {
  color: var(--kl-on-surface);
  border-color: var(--kl-outline);
}

/* ── Preview panels ── */
.kl-shell-preview-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 200px;
}

@media (max-width: 767px) {
  .kl-shell-preview-wrap {
    min-height: 160px;
  }
}

.kl-shell-preview {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  position: relative;
  transition: background-color 0.3s ease;
}

.kl-preview-label {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 4px;
  transition: color 0.3s;
}

.kl-preview-hex {
  font-size: 1.375rem;
  font-weight: 900;
  font-family: var(--vp-font-family-mono);
  transition: color 0.3s;
}
</style>
