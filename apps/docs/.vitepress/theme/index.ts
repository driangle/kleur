import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./style.css";
import AdjustColorDemo from "./components/AdjustColorDemo.vue";
import ChannelGettersDemo from "./components/ChannelGettersDemo.vue";
import ChannelOpsDemo from "./components/ChannelOpsDemo.vue";
import BlendDemo from "./components/BlendDemo.vue";
import ContrastDemo from "./components/ContrastDemo.vue";
import CreateColorDemo from "./components/CreateColorDemo.vue";
import DistanceDemo from "./components/DistanceDemo.vue";
import GradientDemo from "./components/GradientDemo.vue";
import HarmonyDemo from "./components/HarmonyDemo.vue";
import HomeHero from "./components/HomeHero.vue";
import P5SketchDemo from "./components/P5SketchDemo.vue";
import P5SketchPage from "./components/P5SketchPage.vue";
import PaletteAdjustDemo from "./components/PaletteAdjustDemo.vue";
import PaletteDemo from "./components/PaletteDemo.vue";
import ReactThemeDemo from "./components/ReactThemeDemo.vue";
import ReactThemePage from "./components/ReactThemePage.vue";
import ThreeMaterialDemo from "./components/ThreeMaterialDemo.vue";
import ThreeMaterialPage from "./components/ThreeMaterialPage.vue";
import VanillaDomDemo from "./components/VanillaDomDemo.vue";
import VanillaDomPage from "./components/VanillaDomPage.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("AdjustColorDemo", AdjustColorDemo);
    app.component("ChannelGettersDemo", ChannelGettersDemo);
    app.component("ChannelOpsDemo", ChannelOpsDemo);
    app.component("BlendDemo", BlendDemo);
    app.component("ContrastDemo", ContrastDemo);
    app.component("CreateColorDemo", CreateColorDemo);
    app.component("DistanceDemo", DistanceDemo);
    app.component("GradientDemo", GradientDemo);
    app.component("HarmonyDemo", HarmonyDemo);
    app.component("HomeHero", HomeHero);
    app.component("P5SketchDemo", P5SketchDemo);
    app.component("P5SketchPage", P5SketchPage);
    app.component("PaletteAdjustDemo", PaletteAdjustDemo);
    app.component("PaletteDemo", PaletteDemo);
    app.component("ReactThemeDemo", ReactThemeDemo);
    app.component("ReactThemePage", ReactThemePage);
    app.component("ThreeMaterialDemo", ThreeMaterialDemo);
    app.component("ThreeMaterialPage", ThreeMaterialPage);
    app.component("VanillaDomDemo", VanillaDomDemo);
    app.component("VanillaDomPage", VanillaDomPage);
  },
} satisfies Theme;
