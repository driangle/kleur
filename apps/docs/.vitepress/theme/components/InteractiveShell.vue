<script setup lang="ts">
import { ref, computed } from "vue";
import { hex as parseHex, type KleurStruct } from "kleur";

interface Operation {
  method: string;
  arg: number;
}

const METHODS = [
  { name: "lighten", default: 0.2, min: 0, max: 1, step: 0.05 },
  { name: "darken", default: 0.2, min: 0, max: 1, step: 0.05 },
  { name: "saturate", default: 0.3, min: 0, max: 1, step: 0.05 },
  { name: "desaturate", default: 0.3, min: 0, max: 1, step: 0.05 },
  { name: "rotate", default: 90, min: 0, max: 360, step: 5 },
  { name: "fade", default: 0.3, min: 0, max: 1, step: 0.05 },
  { name: "warm", default: 0.2, min: 0, max: 1, step: 0.05 },
  { name: "cool", default: 0.2, min: 0, max: 1, step: 0.05 },
] as const;

const inputColor = ref("#ff7f50");
const operations = ref<Operation[]>([{ method: "lighten", arg: 0.2 }]);

const baseColor = computed(() => {
  try {
    return parseHex(inputColor.value);
  } catch {
    return null;
  }
});

const resultColor = computed(() => {
  if (!baseColor.value) return null;
  try {
    let color: KleurStruct = baseColor.value;
    for (const op of operations.value) {
      const fn = color[op.method as keyof KleurStruct];
      if (typeof fn === "function") {
        color = (fn as (arg: number) => KleurStruct).call(color, op.arg);
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
        <code class="kl-shell-snippet">
          <span class="kl-kw">const</span> result =
          <span class="kl-fn">kleur</span>(<span
            class="kl-str"
            :style="{ color: inputColor }"
            >"{{ inputColor }}"</span
          >)<template v-for="(op, i) in operations" :key="i"
            >.<span class="kl-fn">{{ op.method }}</span
            >(<span class="kl-num">{{ op.arg }}</span
            >)</template
          >.<span class="kl-fn">hex</span>()
        </code>
      </div>

      <!-- Controls -->
      <div class="kl-shell-controls">
        <!-- Color input -->
        <div class="kl-control-row">
          <label class="kl-control-label">Color</label>
          <div class="kl-color-input-wrap">
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
          <div class="kl-control-method">
            <select v-model="op.method" class="kl-method-select" @change="op.arg = getMethodConfig(op.method).default">
              <option v-for="m in METHODS" :key="m.name" :value="m.name">
                .{{ m.name }}()
              </option>
            </select>
            <button
              v-if="operations.length > 1"
              class="kl-remove-btn"
              @click="removeOperation(i)"
              aria-label="Remove operation"
            >
              &times;
            </button>
          </div>
          <div class="kl-slider-wrap">
            <input
              type="range"
              :min="getMethodConfig(op.method).min"
              :max="getMethodConfig(op.method).max"
              :step="getMethodConfig(op.method).step"
              v-model.number="op.arg"
              class="kl-slider"
            />
            <span class="kl-slider-value">{{ op.arg }}</span>
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
    grid-template-columns: 3fr 2fr;
  }
}

/* ── Code panel ── */
.kl-shell-code {
  background: #0e0e0e;
  padding: 32px 40px;
  border-left: 1px solid rgba(71, 71, 71, 0.3);
  border-top: 1px solid rgba(71, 71, 71, 0.3);
}

.kl-shell-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.kl-dot {
  width: 10px;
  height: 10px;
  background: #2a2a2a;
}

.kl-shell-label {
  margin-left: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #474747;
}

.kl-shell-line {
  margin-bottom: 28px;
  overflow-x: auto;
}

.kl-shell-snippet {
  font-family: var(--vp-font-family-mono) !important;
  font-size: clamp(0.8rem, 1.5vw, 1rem) !important;
  line-height: 1.8;
  color: #919191 !important;
  display: block;
  white-space: nowrap;
  background: none !important;
  padding: 0 !important;
}

.kl-kw { color: #666; }
.kl-fn { color: #e5e2e1; }
.kl-str { transition: color 0.2s; }
.kl-num { color: #e5e2e1; }

/* ── Controls ── */
.kl-shell-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #1c1b1b;
  padding-top: 20px;
}

.kl-control-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.kl-control-label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #666;
  width: 130px;
  flex-shrink: 0;
  font-weight: 600;
}

.kl-color-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.kl-color-picker {
  width: 28px;
  height: 28px;
  border: 1px solid #474747;
  background: none;
  cursor: pointer;
  padding: 0;
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
  font-size: 0.8125rem;
  background: #1c1b1b;
  border: 1px solid #353534;
  color: #e5e2e1;
  padding: 6px 10px;
  width: 100px;
  outline: none;
  transition: border-color 0.2s;
}

.kl-color-text:focus {
  border-color: #919191;
}

.kl-control-method {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 130px;
  flex-shrink: 0;
}

.kl-method-select {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  background: #1c1b1b;
  border: 1px solid #353534;
  color: #e5e2e1;
  padding: 5px 8px;
  outline: none;
  cursor: pointer;
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
}

.kl-method-select:focus {
  border-color: #919191;
}

.kl-remove-btn {
  background: none;
  border: 1px solid #353534;
  color: #666;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.2s, border-color 0.2s;
}

.kl-remove-btn:hover {
  color: #e5e2e1;
  border-color: #919191;
}

.kl-slider-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.kl-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  background: #353534;
  outline: none;
}

.kl-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #e5e2e1;
  cursor: pointer;
  border: none;
}

.kl-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: #e5e2e1;
  cursor: pointer;
  border: none;
}

.kl-slider-value {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: #919191;
  min-width: 40px;
  text-align: right;
}

.kl-add-btn {
  background: none;
  border: 1px dashed #353534;
  color: #666;
  padding: 8px;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  font-family: var(--vp-font-family-base);
}

.kl-add-btn:hover {
  color: #e5e2e1;
  border-color: #919191;
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
