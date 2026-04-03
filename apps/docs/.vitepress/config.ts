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
      { text: "API Reference", link: "/api/kleur-struct" },
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
            { text: "KleurStruct", link: "/api/kleur-struct" },
            { text: "Kleur Namespace", link: "/api/kleur-namespace" },
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
          items: [{ text: "Color Harmonies", link: "/api/harmony" }],
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
