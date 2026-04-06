<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { createHighlighter, type Highlighter } from "shiki";

const props = defineProps<{
  code: string;
  lang?: string;
}>();

const html = ref("");
let highlighter: Highlighter | null = null;

async function highlight() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: [props.lang ?? "js"],
    });
  }
  const lang = props.lang ?? "js";
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    await highlighter.loadLanguage(lang as any);
  }
  html.value = highlighter.codeToHtml(props.code, {
    lang,
    theme: "github-dark",
  });
}

onMounted(highlight);
watch(() => props.code, highlight);
</script>

<template>
  <div class="kl-code-block" v-if="html" v-html="html" />
  <pre v-else class="kl-code-block kl-code-block--plain">{{ code }}</pre>
</template>

<style scoped>
.kl-code-block {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.6;
  overflow: auto;
  height: 100%;
}

.kl-code-block--plain {
  padding: 20px;
  white-space: pre;
}

.kl-code-block :deep(pre) {
  margin: 0;
  padding: 20px;
  background: transparent !important;
  height: 100%;
  overflow: auto;
}

.kl-code-block :deep(code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.6;
  background: none !important;
  padding: 0 !important;
}
</style>
