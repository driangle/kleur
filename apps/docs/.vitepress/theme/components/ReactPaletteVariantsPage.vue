<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import DemoPageLayout from "./DemoPageLayout.vue";
import { readableTextColor } from "../lib/demo";
import kleur from "@driangle/kleur";

const baseHex = ref("#3a6bd5");
const count = ref(5);

const scale = computed(() => {
  const base = kleur(baseHex.value);
  const tints = base.tints(count.value);
  const shades = base.shades(count.value);

  return {
    tints: [...tints].map((c) => ({
      hex: c.toHex(),
      textColor: readableTextColor(c.toHex()),
    })),
    base: {
      hex: base.toHex(),
      textColor: readableTextColor(base.toHex()),
    },
    shades: [...shades].map((c) => ({
      hex: c.toHex(),
      textColor: readableTextColor(c.toHex()),
    })),
  };
});

const code = computed(() => {
  return [
    `import kleur from "@driangle/kleur";`,
    `import { useMemo } from "react";`,
    ``,
    `function useVariants(hex, steps) {`,
    `  return useMemo(() => {`,
    `    const base = kleur(hex);`,
    `    const tints = [...base.tints(steps)];`,
    `    const shades = [...base.shades(steps)];`,
    ``,
    `    return { tints, base, shades };`,
    `  }, [hex, steps]);`,
    `}`,
    ``,
    `function Button({ variant, children }) {`,
    `  const { tints, base, shades } =`,
    `    useVariants("${baseHex.value}", ${count.value});`,
    ``,
    `  const bg = variant === "light"`,
    `    ? tints[2].toHex()`,
    `    : variant === "dark"`,
    `      ? shades[2].toHex()`,
    `      : base.toHex();`,
    ``,
    `  const color = kleur.isLight(bg)`,
    `    ? kleur(bg).darken(0.8).toHex()`,
    `    : kleur(bg).lighten(0.9).toHex();`,
    ``,
    `  return (`,
    `    <button style={{ background: bg, color }}>`,
    `      {children}`,
    `    </button>`,
    `  );`,
    `}`,
  ].join("\n");
});
</script>

<template>
  <DemoPageLayout
    back-href="./reactjs"
    back-label="React"
    title="Palette Variants"
  >
    <template #controls>
      <label class="kl-ctrl">
        <span>Base</span>
        <input v-model="baseHex" type="color" />
      </label>
      <label class="kl-ctrl">
        <span>Steps {{ count }}</span>
        <input v-model.number="count" type="range" min="2" max="8" step="1" />
      </label>
    </template>

    <template #code>
      <CodeBlock :code="code" lang="jsx" />
    </template>

    <template #preview>
      <div class="kl-preview">
        <div class="kl-section">
          <span class="kl-section__label">Tints (lighter)</span>
          <div class="kl-scale">
            <div
              v-for="(t, i) in scale.tints"
              :key="'t' + i"
              class="kl-chip"
              :style="{ backgroundColor: t.hex, color: t.textColor }"
            >
              <span class="kl-chip__hex">{{ t.hex }}</span>
            </div>
          </div>
        </div>

        <div class="kl-section">
          <span class="kl-section__label">Base</span>
          <div class="kl-scale">
            <div
              class="kl-chip kl-chip--base"
              :style="{ backgroundColor: scale.base.hex, color: scale.base.textColor }"
            >
              <span class="kl-chip__hex">{{ scale.base.hex }}</span>
            </div>
          </div>
        </div>

        <div class="kl-section">
          <span class="kl-section__label">Shades (darker)</span>
          <div class="kl-scale">
            <div
              v-for="(s, i) in scale.shades"
              :key="'s' + i"
              class="kl-chip"
              :style="{ backgroundColor: s.hex, color: s.textColor }"
            >
              <span class="kl-chip__hex">{{ s.hex }}</span>
            </div>
          </div>
        </div>

        <div class="kl-section">
          <span class="kl-section__label">Button Variants</span>
          <div class="kl-buttons">
            <div
              v-if="scale.tints.length > 2"
              class="kl-btn-demo"
              :style="{ backgroundColor: scale.tints[2].hex, color: scale.tints[2].textColor }"
            >Light</div>
            <div
              class="kl-btn-demo"
              :style="{ backgroundColor: scale.base.hex, color: scale.base.textColor }"
            >Default</div>
            <div
              v-if="scale.shades.length > 2"
              class="kl-btn-demo"
              :style="{ backgroundColor: scale.shades[2].hex, color: scale.shades[2].textColor }"
            >Dark</div>
          </div>
        </div>
      </div>
    </template>
  </DemoPageLayout>
</template>

<style scoped>
.kl-preview {
  display: grid;
  gap: 24px;
  padding: 24px;
  align-content: center;
  height: 100%;
}

.kl-section__label {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.5;
  margin-bottom: 6px;
}

.kl-scale {
  display: flex;
  gap: 2px;
}

.kl-chip {
  flex: 1;
  padding: 14px 8px;
  display: grid;
  place-items: center;
  transition: background-color 0.2s;
}

.kl-chip--base {
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.kl-chip__hex {
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
}

.kl-buttons {
  display: flex;
  gap: 10px;
}

.kl-btn-demo {
  padding: 10px 20px;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-family: var(--vp-font-family-mono);
  transition: background-color 0.2s;
}
</style>
