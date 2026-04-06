<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <section class="kl-demo">
    <header class="kl-demo__header">
      <p class="kl-demo__eyebrow">Interactive Demo</p>
      <h3 class="kl-demo__title">{{ title }}</h3>
      <p class="kl-demo__description">{{ description }}</p>
    </header>

    <div class="kl-demo__body">
      <div class="kl-demo__panel">
        <slot name="code" />
        <slot name="controls" />
      </div>

      <div class="kl-demo__preview">
        <slot name="preview" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.kl-demo {
  margin: 24px 0 40px;
  border: 1px solid var(--kl-outline-variant);
  background: var(--kl-surface);
}

.kl-demo__header {
  padding: 20px 22px 0;
}

.kl-demo__eyebrow {
  margin: 0 0 8px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--kl-outline);
}

.kl-demo__title {
  margin: 0;
  font-size: 1.05rem;
}

.kl-demo__description {
  margin: 10px 0 0;
  color: var(--kl-on-surface-variant);
}

.kl-demo__body {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.9fr);
  border-top: 1px solid var(--kl-outline-variant);
  margin-top: 18px;
}

.kl-demo__panel {
  padding: 20px 22px;
}

.kl-demo__preview {
  display: grid;
}

.kl-demo__panel {
  border-right: 1px solid var(--kl-outline-variant);
}

@media (max-width: 860px) {
  .kl-demo__body {
    grid-template-columns: 1fr;
  }

  .kl-demo__panel {
    border-right: 0;
    border-bottom: 1px solid var(--kl-outline-variant);
  }
}
</style>
