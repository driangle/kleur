---
id: "01kn8ytcv"
title: "Cross-language test vectors"
status: completed
priority: medium
effort: medium
type: chore
phase: "polish"
dependencies: ["01kn8ytch"]
tags: [testing, cross-language, phase:4-polish]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Cross-language test vectors

## Objective

Create a language-agnostic test vector file (JSON) that defines expected input/output pairs for every operation in the spec. Future language implementations (Python, Rust, etc.) will run these same vectors to ensure cross-language consistency. Covers spec section 12.

## Tasks

- [x] Create `tests/vectors/` directory for shared test data
- [x] Write vectors for input parsing: hex, HSL, CSS strings, integer, named colors
- [x] Write vectors for output formats: toHex, toCss, toRgb, toHsl, toArray, toNormalized
- [x] Write vectors for adjustments: lighten, darken, saturate, etc. with specific amounts and expected outputs
- [x] Write vectors for harmony: triadic, tetradic, analogous with expected hue values
- [x] Write vectors for blending: each mode with known base/overlay/result
- [x] Write vectors for analysis: luminance, contrast, distance with known values
- [x] Run the TypeScript implementation against all vectors and ensure they pass
- [x] Document the vector file format in a README inside tests/vectors/

## Acceptance Criteria

- Vector file is valid JSON, language-agnostic, and well-documented
- Covers at least 3 test cases per operation category
- TypeScript implementation passes all vectors
- Vector file includes edge cases: black, white, transparent, fully saturated, hue boundaries
- Format is simple enough that any language can load and iterate over it
