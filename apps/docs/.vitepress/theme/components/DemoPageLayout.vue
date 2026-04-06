<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

defineProps<{
  backHref: string;
  backLabel: string;
  title: string;
}>();

onMounted(() => document.body.classList.add("demo-fullscreen"));
onUnmounted(() => document.body.classList.remove("demo-fullscreen"));
</script>

<template>
  <div class="kl-demo-page">
    <header class="kl-demo-page__header">
      <a :href="backHref" class="kl-demo-page__back">&larr; {{ backLabel }}</a>
      <span class="kl-demo-page__title">{{ title }}</span>
      <div class="kl-demo-page__controls">
        <slot name="controls" />
      </div>
    </header>

    <div class="kl-demo-page__body">
      <div class="kl-demo-page__code">
        <slot name="code" />
      </div>
      <div class="kl-demo-page__preview">
        <slot name="preview" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.kl-demo-page {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--kl-surface-lowest);
  color: var(--kl-on-surface);
}

.kl-demo-page__header {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-bottom: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface-dim);
  gap: 16px;
  flex-wrap: wrap;
}

.kl-demo-page__back {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  color: var(--kl-on-surface-variant);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.kl-demo-page__back:hover {
  color: var(--kl-on-surface);
}

.kl-demo-page__title {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  color: var(--kl-on-surface-variant);
  opacity: 0.6;
  white-space: nowrap;
}

.kl-demo-page__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-left: auto;
}

.kl-demo-page__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: 0;
}

.kl-demo-page__code {
  overflow: auto;
  border-right: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface-lowest);
}

.kl-demo-page__preview {
  overflow: auto;
}

@media (max-width: 860px) {
  .kl-demo-page__body {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .kl-demo-page__code {
    border-right: 0;
    border-bottom: 1px solid var(--kl-outline-variant);
    max-height: 40vh;
  }
}
</style>
