import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Kleur",
  description: "A cross-language color manipulation library",
  base: "/kleur/",
  appearance: "dark",

  head: [
    ["meta", { name: "theme-color", content: "#131313" }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    ],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API Reference", link: "/api/kleur-namespace" },
      { text: "Examples", link: "/examples/vanillajs" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Installation", link: "/guide/installation" },
            { text: "Getting Started", link: "/guide/getting-started" },
          ],
        },
      ],
      "/api/": [
        {
          text: "Core",
          items: [
            { text: "Kleur Namespace", link: "/api/kleur-namespace" },
            { text: "Color", link: "/api/color" },
          ],
        },
        {
          text: "Create",
          items: [
            { text: "Parsing & Creation", link: "/api/create" },
            { text: "Named Colors", link: "/api/named-colors" },
          ],
        },
        {
          text: "Analyze",
          items: [
            { text: "Analysis", link: "/api/analysis" },
            { text: "Distance", link: "/api/distance" },
          ],
        },
        {
          text: "Combine",
          items: [{ text: "Blending & Mixing", link: "/api/blend" }],
        },
        {
          text: "Harmony",
          items: [
            { text: "Color Harmonies", link: "/api/harmony" },
            { text: "Palette", link: "/api/palette" },
          ],
        },
        {
          text: "Gradient",
          items: [{ text: "Gradients", link: "/api/gradient" }],
        },
        {
          text: "Types",
          items: [{ text: "Type Definitions", link: "/api/types" }],
        },
      ],
      "/examples/": [
        {
          text: "Vanilla JS",
          items: [
            { text: "Overview", link: "/examples/vanillajs" },
            { text: "Color Interpolation", link: "/examples/vanilla-interpolation" },
            { text: "Scroll-Driven Color", link: "/examples/vanilla-scroll-color" },
            { text: "Data-Driven Styling", link: "/examples/vanilla-data-styling" },
          ],
        },
        {
          text: "React",
          items: [
            { text: "Overview", link: "/examples/reactjs" },
            { text: "Dynamic Theming", link: "/examples/react-theming" },
            { text: "Contrast Validation", link: "/examples/react-contrast" },
            { text: "Palette Variants", link: "/examples/react-palette-variants" },
          ],
        },
        {
          text: "p5.js",
          items: [
            { text: "Overview", link: "/examples/p5js" },
            { text: "Palette-Driven Grid", link: "/examples/p5-grid" },
            { text: "Random Variations", link: "/examples/p5-random" },
            { text: "Color Output Formats", link: "/examples/p5-formats" },
          ],
        },
        {
          text: "Three.js",
          items: [
            { text: "Overview", link: "/examples/threejs" },
            { text: "Material Colors", link: "/examples/three-materials" },
            { text: "Gradient Skybox", link: "/examples/three-skybox" },
            { text: "Shader Uniforms", link: "/examples/three-shader-uniforms" },
          ],
        },
      ],
    },

    search: {
      provider: "local",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/driangle/kleur" },
    ],

    footer: {
      copyright: "Built for precision color manipulation.",
    },
  },
});
