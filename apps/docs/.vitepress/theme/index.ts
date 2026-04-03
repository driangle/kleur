import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./style.css";
import HomeHero from "./components/HomeHero.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomeHero", HomeHero);
  },
} satisfies Theme;
