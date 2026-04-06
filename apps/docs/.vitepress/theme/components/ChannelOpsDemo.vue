<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "./DocsDemo.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

type Channel =
  | "Alpha"
  | "Hue"
  | "SaturationHsl"
  | "SaturationHsb"
  | "Lightness"
  | "Brightness";

type Mode = "with" | "adjust" | "scale";

const channelConfig: Record<Channel, { modes: Mode[]; range: { with: [number, number, number]; adjust: [number, number, number]; scale: [number, number, number] } }> = {
  Alpha: {
    modes: ["with", "adjust", "scale"],
    range: {
      with: [0, 1, 0.05],
      adjust: [-1, 1, 0.05],
      scale: [0, 3, 0.05],
    },
  },
  Hue: {
    modes: ["with", "adjust"],
    range: {
      with: [0, 360, 5],
      adjust: [-180, 180, 5],
      scale: [0, 0, 0],
    },
  },
  SaturationHsl: {
    modes: ["with", "adjust", "scale"],
    range: {
      with: [0, 100, 1],
      adjust: [-100, 100, 1],
      scale: [0, 3, 0.05],
    },
  },
  SaturationHsb: {
    modes: ["with", "adjust", "scale"],
    range: {
      with: [0, 100, 1],
      adjust: [-100, 100, 1],
      scale: [0, 3, 0.05],
    },
  },
  Lightness: {
    modes: ["with", "adjust", "scale"],
    range: {
      with: [0, 100, 1],
      adjust: [-100, 100, 1],
      scale: [0, 3, 0.05],
    },
  },
  Brightness: {
    modes: ["with", "adjust", "scale"],
    range: {
      with: [0, 100, 1],
      adjust: [-100, 100, 1],
      scale: [0, 3, 0.05],
    },
  },
};

const modeLabels: Record<Mode, string> = {
  with: "Absolute (withX)",
  adjust: "Additive (adjustX)",
  scale: "Multiplicative (scaleX)",
};

const base = ref("#ff6600");
const channel = ref<Channel>("Lightness");
const mode = ref<Mode>("with");
const value = ref(70);

const availableModes = computed(() => channelConfig[channel.value].modes);

watch(channel, () => {
  if (!availableModes.value.includes(mode.value)) {
    mode.value = availableModes.value[0];
  }
  resetValue();
});

watch(mode, resetValue);

function resetValue() {
  const [min, max] = channelConfig[channel.value].range[mode.value];
  value.value = mode.value === "adjust" ? 0 : mode.value === "scale" ? 1 : Math.round((min + max) / 2);
}

const before = computed(() => kleur(base.value));
const after = computed(() => {
  const methodName = `${mode.value}${channel.value}`;
  const color = before.value as any;
  return color[methodName](value.value);
});

const sliderConfig = computed(() => {
  const [min, max, step] = channelConfig[channel.value].range[mode.value];
  return { min, max, step };
});

const methodName = computed(() => `${mode.value}${channel.value}`);
const code = computed(() => `kleur("${base.value}").${methodName.value}(${value.value})`);
</script>

<template>
  <DocsDemo
    title="Systematic channel operations"
    description="Explore the three operation modes — absolute, additive, and multiplicative — across every channel."
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
          <span>Channel</span>
          <select v-model="channel">
            <option value="Lightness">Lightness</option>
            <option value="Brightness">Brightness</option>
            <option value="SaturationHsl">HSL Saturation</option>
            <option value="SaturationHsb">HSB Saturation</option>
            <option value="Hue">Hue</option>
            <option value="Alpha">Alpha</option>
          </select>
        </label>
        <label class="kl-field">
          <span>Mode</span>
          <select v-model="mode">
            <option v-for="m in availableModes" :key="m" :value="m">{{ modeLabels[m] }}</option>
          </select>
        </label>
        <label class="kl-field">
          <span>Value: {{ value }}</span>
          <input
            v-model.number="value"
            type="range"
            :min="sliderConfig.min"
            :max="sliderConfig.max"
            :step="sliderConfig.step"
          />
        </label>
      </div>
    </template>

    <template #preview>
      <div class="kl-compare">
        <div class="kl-swatch" :style="{ background: before.toCss(), color: readableTextColor(before.toHex()) }">
          <span>Original</span>
          <strong>{{ before.toHex() }}</strong>
        </div>
        <div class="kl-swatch" :style="{ background: after.toCss(), color: readableTextColor(after.toHex()) }">
          <span>Result</span>
          <strong>{{ after.toHex() }}</strong>
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

.kl-compare {
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100%;
}

.kl-swatch {
  min-height: 120px;
  display: grid;
  align-content: end;
  gap: 4px;
  padding: 14px;
}

.kl-swatch strong {
  font-family: var(--vp-font-family-mono);
}
</style>
