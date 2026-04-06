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
import PaletteAdjustDemo from "./components/PaletteAdjustDemo.vue";
import PaletteDemo from "./components/PaletteDemo.vue";
import VanillaInterpolationPage from "./components/VanillaInterpolationPage.vue";
import VanillaScrollColorPage from "./components/VanillaScrollColorPage.vue";
import VanillaDataStylingPage from "./components/VanillaDataStylingPage.vue";
import ReactThemingPage from "./components/ReactThemingPage.vue";
import ReactContrastPage from "./components/ReactContrastPage.vue";
import ReactPaletteVariantsPage from "./components/ReactPaletteVariantsPage.vue";
import P5GridPage from "./components/P5GridPage.vue";
import P5RandomPage from "./components/P5RandomPage.vue";
import P5FormatsPage from "./components/P5FormatsPage.vue";
import ThreeMaterialsPage from "./components/ThreeMaterialsPage.vue";
import ThreeSkyboxPage from "./components/ThreeSkyboxPage.vue";
import ThreeShaderPage from "./components/ThreeShaderPage.vue";

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
    app.component("PaletteAdjustDemo", PaletteAdjustDemo);
    app.component("PaletteDemo", PaletteDemo);
    app.component("VanillaInterpolationPage", VanillaInterpolationPage);
    app.component("VanillaScrollColorPage", VanillaScrollColorPage);
    app.component("VanillaDataStylingPage", VanillaDataStylingPage);
    app.component("ReactThemingPage", ReactThemingPage);
    app.component("ReactContrastPage", ReactContrastPage);
    app.component("ReactPaletteVariantsPage", ReactPaletteVariantsPage);
    app.component("P5GridPage", P5GridPage);
    app.component("P5RandomPage", P5RandomPage);
    app.component("P5FormatsPage", P5FormatsPage);
    app.component("ThreeMaterialsPage", ThreeMaterialsPage);
    app.component("ThreeSkyboxPage", ThreeSkyboxPage);
    app.component("ThreeShaderPage", ThreeShaderPage);
  },
} satisfies Theme;
