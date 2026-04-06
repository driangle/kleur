---
title: "Redesign standalone demo pages with per-example split and side-by-side layout"
id: "01knhbpw5"
status: pending
priority: medium
type: feature
tags: ["docs", "examples", "ui"]
created: "2026-04-06"
---

# Redesign standalone demo pages with per-example split and side-by-side layout

## Objective

Redesign the standalone demo pages in `apps/docs/examples/` so that each individual code example gets its own dedicated demo page with a side-by-side layout (code on the left, interactive demo on the right). Currently, each library (Vanilla JS, React, p5.js, Three.js) has a single standalone page — but the doc pages contain multiple distinct examples (e.g. Vanilla JS has "color interpolation bars", "scroll-driven color", and "data-driven styling") that should each be their own standalone demo.

Additionally, reduce the page chrome further: the current header is too large, and the VitePress nav bar still appears on `layout: page` pages. The standalone demos should feel like minimal, focused sandboxes.

## Tasks

- [ ] Create a shared demo page layout component with side-by-side code (left) + interactive preview (right)
- [ ] Hide the VitePress nav bar on standalone demo pages (via CSS or a custom layout)
- [ ] Reduce the header bar to a minimal single line (back link + compact inline controls)
- [ ] Split Vanilla JS into separate standalone demos: color interpolation bars, scroll-driven color, data-driven styling
- [ ] Split React into separate standalone demos: dynamic theming, contrast validation, palette-based variants
- [ ] Split p5.js into separate standalone demos: palette-driven grid, random variations, color output formats
- [ ] Split Three.js into separate standalone demos: material colors from harmonies, gradient skybox, shader uniforms
- [ ] Update the example doc pages to link to each individual standalone demo (not just one per library)
- [ ] Remove the current single-page standalone components (`VanillaDomPage`, `ReactThemePage`, `P5SketchPage`, `ThreeMaterialPage`) once replaced

## Acceptance Criteria

- Each code example across all 4 library pages has its own standalone demo page
- Standalone demo pages use a side-by-side layout: code on the left, interactive demo on the right
- No VitePress nav bar or sidebar is visible on standalone demo pages
- The header/chrome on standalone pages is minimal (single compact row)
- Each doc page links to its individual standalone demos (not one link per library)
- `make check` passes
