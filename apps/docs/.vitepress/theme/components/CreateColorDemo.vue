<script setup lang="ts">
import { computed, ref } from "vue";
import kleur from "@driangle/kleur";
import DocsDemo from "./DocsDemo.vue";
import { formatColorOutputs, readableTextColor, tryParseColor } from "../lib/demo";

type Mode = "factory" | "hex" | "css" | "rgb" | "hsl" | "int";

const mode = ref<Mode>("factory");
const textInput = ref("#ff7f50");
const rgb = ref({ r: 255, g: 127, b: 80, a: 1 });
const hsl = ref({ h: 16, s: 100, l: 66, a: 1 });
const packedNumber = ref("0xff7f50");

const result = computed(() => {
  try {
    switch (mode.value) {
      case "factory":
        return tryParseColor(textInput.value);
      case "hex":
        return kleur.hex(textInput.value.trim());
      case "css":
        return kleur.css(textInput.value.trim());
      case "rgb":
        return kleur.rgb(rgb.value.r, rgb.value.g, rgb.value.b, rgb.value.a);
      case "hsl":
        return kleur.hsl(hsl.value.h, hsl.value.s, hsl.value.l, hsl.value.a);
      case "int":
        return kleur.int(Number(packedNumber.value));
    }
  } catch {
    return null;
  }
});

const outputs = computed(() => (result.value ? formatColorOutputs(result.value) : null));

const code = computed(() => {
  switch (mode.value) {
    case "factory":
      return `kleur("${textInput.value}")`;
    case "hex":
      return `kleur.hex("${textInput.value}")`;
    case "css":
      return `kleur.css("${textInput.value}")`;
    case "rgb":
      return [
        "kleur.rgb(",
        `  ${rgb.value.r},`,
        `  ${rgb.value.g},`,
        `  ${rgb.value.b},`,
        `  ${rgb.value.a}`,
        ")",
      ].join("\n");
    case "hsl":
      return [
        "kleur.hsl(",
        `  ${hsl.value.h},`,
        `  ${hsl.value.s},`,
        `  ${hsl.value.l},`,
        `  ${hsl.value.a}`,
        ")",
      ].join("\n");
    case "int":
      return `kleur.int(${packedNumber.value})`;
  }
});
</script>

<template>
  <DocsDemo
    title="Parse and create colors"
    description="Switch between creation APIs and immediately inspect the resolved color outputs."
  >
    <template #code>
      <pre class="kl-code">{{ code }}</pre>
    </template>

    <template #controls>
      <div class="kl-controls">
        <label class="kl-field">
          <span>API</span>
          <select v-model="mode">
            <option value="factory">kleur(...)</option>
            <option value="hex">kleur.hex()</option>
            <option value="css">kleur.css()</option>
            <option value="rgb">kleur.rgb()</option>
            <option value="hsl">kleur.hsl()</option>
            <option value="int">kleur.int()</option>
          </select>
        </label>

        <label v-if="mode === 'factory' || mode === 'hex' || mode === 'css'" class="kl-field">
          <span>Input</span>
          <input
            v-model="textInput"
            type="text"
            spellcheck="false"
            :placeholder="
              mode === 'hex'
                ? '#ff7f50'
                : mode === 'css'
                  ? 'rgb(255, 127, 80)'
                  : '#ff7f50, coral, or rgb(...)'
            "
          />
        </label>

        <div v-if="mode === 'rgb'" class="kl-grid">
          <label class="kl-field"><span>R</span><input v-model.number="rgb.r" type="range" min="0" max="255" /></label>
          <label class="kl-field"><span>G</span><input v-model.number="rgb.g" type="range" min="0" max="255" /></label>
          <label class="kl-field"><span>B</span><input v-model.number="rgb.b" type="range" min="0" max="255" /></label>
          <label class="kl-field"><span>A</span><input v-model.number="rgb.a" type="range" min="0" max="1" step="0.05" /></label>
        </div>

        <div v-if="mode === 'hsl'" class="kl-grid">
          <label class="kl-field"><span>H</span><input v-model.number="hsl.h" type="range" min="0" max="360" /></label>
          <label class="kl-field"><span>S</span><input v-model.number="hsl.s" type="range" min="0" max="100" /></label>
          <label class="kl-field"><span>L</span><input v-model.number="hsl.l" type="range" min="0" max="100" /></label>
          <label class="kl-field"><span>A</span><input v-model.number="hsl.a" type="range" min="0" max="1" step="0.05" /></label>
        </div>

        <label v-if="mode === 'number'" class="kl-field">
          <span>Packed Number</span>
          <input v-model="packedNumber" type="text" spellcheck="false" placeholder="0xff7f50" />
        </label>
      </div>
    </template>

    <template #preview>
      <div v-if="result && outputs" class="kl-preview">
        <div class="kl-swatch" :style="{ background: outputs.hex, color: readableTextColor(outputs.hex) }">
          {{ outputs.hex }}
        </div>
        <dl class="kl-output-list">
          <div><dt>Hex</dt><dd>{{ outputs.hex }}</dd></div>
          <div><dt>CSS</dt><dd>{{ outputs.css }}</dd></div>
          <div><dt>RGB</dt><dd>{{ outputs.rgb }}</dd></div>
          <div><dt>HSL</dt><dd>{{ outputs.hsl }}</dd></div>
        </dl>
      </div>
      <p v-else class="kl-error">This input cannot be parsed by the selected creation API.</p>
    </template>
  </DocsDemo>
</template>

<style scoped>
.kl-code,
.kl-output-list dd {
  font-family: var(--vp-font-family-mono);
}

.kl-code {
  margin: 0 0 18px;
  padding: 14px 16px;
  background: var(--kl-surface-lowest);
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.kl-controls,
.kl-grid {
  display: grid;
  gap: 12px;
}

.kl-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.kl-field {
  display: grid;
  gap: 6px;
}

.kl-field span {
  font-size: 0.8rem;
  color: var(--kl-on-surface-variant);
}

.kl-field input,
.kl-field select {
  width: 100%;
}

.kl-field input[type="text"],
.kl-field select {
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid var(--kl-outline);
  background: var(--kl-surface-lowest);
  color: var(--kl-on-surface);
}

.kl-field input[type="text"] {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.kl-field input[type="text"]:focus,
.kl-field select:focus {
  outline: none;
  border-color: var(--kl-primary);
  box-shadow: 0 0 0 1px var(--kl-primary);
}

.kl-preview {
  display: grid;
  gap: 18px;
}

.kl-swatch {
  min-height: 120px;
  display: grid;
  place-items: center;
  font-weight: 700;
}

.kl-output-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 16px 20px;
}

.kl-output-list div {
  display: grid;
  gap: 4px;
}

.kl-output-list dt {
  color: var(--kl-on-surface-variant);
}

.kl-output-list dd {
  margin: 0;
  word-break: break-word;
  white-space: pre-line;
}

.kl-error {
  margin: 0;
  color: #ff9f9f;
}

@media (max-width: 640px) {
  .kl-grid {
    grid-template-columns: 1fr;
  }
}
</style>
