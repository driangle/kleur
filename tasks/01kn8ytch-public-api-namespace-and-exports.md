---
id: "01kn8ytch"
title: "Public API namespace and exports"
status: completed
priority: high
effort: small
type: feature
phase: "polish"
dependencies: ["01kn8yt7b", "01kn8yt7s", "01kn8yt92", "01kn8yt9k", "01kn8ytac", "01kn8ytav", "01kn8yt8m", "01kn8ytba", "01kn8ytc3"]
tags: [api, phase:4-polish]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Public API namespace and exports

## Objective

Wire everything together into a clean public API. Create the Kleur namespace that re-exports all factory functions, static methods, and constants. This is the entry point consumers import from. Ensures the API surface matches the spec exactly.

## Tasks

- [x] Create Kleur namespace/object with all factory functions (rgb, fromHex, fromHsl, fromHsla, gray/grey, struct, random)
- [x] Attach static methods: mix, lerp, contrast, distance, blend, toCSSColor, toWebGLColor, toHSL
- [x] Attach named color lookup: namedColors map, getNamedColor()
- [x] Export color constants: white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent
- [x] Configure package.json exports field and index.ts barrel exports
- [x] Write integration test: import from package entry point, verify all API surface is accessible
- [x] Verify tree-shaking works (unused code is not bundled)

## Acceptance Criteria

- `import { Kleur, KleurStruct } from "kleur"` gives access to the full API
- All factory functions, static methods, and constants are accessible on the Kleur namespace
- Named exports work for direct constant imports (e.g., `import { red, blue } from "kleur"`)
- Package entry point resolves correctly for both ESM and CJS
