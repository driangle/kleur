---
title: "Add visual library integration examples (p5.js, Three.js)"
id: "01knhacz7"
status: pending
priority: medium
type: feature
tags: ["docs", "examples", "integration"]
created: "2026-04-06"
---

# Add visual library integration examples (p5.js, Three.js)

## Objective

Add interactive documentation examples in `apps/docs` demonstrating how to use kleur alongside popular creative/visual libraries — specifically p5.js and Three.js. These examples should show real-world use cases like applying kleur-generated palettes, harmonies, or gradients to canvas sketches and 3D scenes.

## Tasks

- [ ] Research how p5.js and Three.js accept and use color values (hex strings, RGB arrays, etc.)
- [ ] Create a p5.js example page/demo showing kleur colors used to style a canvas sketch (e.g. palette-driven generative art)
- [ ] Create a Three.js example page/demo showing kleur colors applied to 3D materials (e.g. harmony-based material colors)
- [ ] Add the new example pages to the docs navigation
- [ ] Write clear explanatory prose for each example describing what kleur APIs are being used and why
- [ ] Ensure examples are interactive where feasible (e.g. allow users to change a base hue or pick a harmony mode)

## Acceptance Criteria

- A p5.js integration example exists in `apps/docs` and is accessible from the docs navigation
- A Three.js integration example exists in `apps/docs` and is accessible from the docs navigation
- Each example includes a code snippet and an interactive demo (or static rendered output if interactivity is not feasible)
- Examples demonstrate meaningful use of kleur APIs (e.g. `createColor`, `palette`, `harmony`, `gradient`)
- The docs build (`make check`) passes after the additions
