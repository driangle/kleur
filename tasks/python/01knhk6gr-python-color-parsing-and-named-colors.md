---
title: "Python: color parsing and named colors"
id: "01knhk6gr"
status: pending
priority: critical
type: feature
effort: medium
tags: ["python", "parsing"]
depends-on: ["01knhk6fx"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/parse.ts", "ts/src/css-color-data.ts", "ts/src/css-function.ts"]
---

# Python: color parsing and named colors

## Objective

Implement all color parsing functions — the primary way users create Color instances. This includes explicit constructors (`rgb`, `hex`, `hsl`, `int_`, `css`, `grayscale`) and the universal `resolve()` function, plus the 147 CSS named color mappings.

## Tasks

- [ ] Create `py/kleur/css_color_data.py` with the 147 CSS color name → hex dict (port from TS)
- [ ] Create `py/kleur/parse.py` with factory functions:
  - [ ] `rgb(r, g, b, a=1.0)` — direct RGBA construction
  - [ ] `hex(value)` — parse #rgb, #rgba, #rrggbb, #rrggbbaa (case-insensitive)
  - [ ] `hsl(h, s, l, a=1.0)` — create from HSL
  - [ ] `int_(n)` — parse 0xRRGGBB packed integer
  - [ ] `css(value)` — parse CSS functions: rgb(), rgba(), hsl(), hsla() with both comma and space syntax
  - [ ] `grayscale(value, alpha=1.0)` — r=g=b=value
  - [ ] `resolve(value)` — universal resolver: string → hex/css/named, int → packed, Color → passthrough
  - [ ] `color(*args)` — convenience: resolve(value) or rgb(r, g, b, a)
- [ ] Create `py/kleur/named_colors.py` with pre-computed Color constants: `WHITE`, `BLACK`, `RED`, etc.
- [ ] All parse errors raise `ParseError` with correct `kind` and `reason`
- [ ] Tests for every format: valid inputs, edge cases, error cases

## Acceptance Criteria

- All factory functions create correct `Color` instances
- Hex parsing handles 3, 4, 6, and 8 digit formats
- CSS function parsing handles both comma and space/slash syntax
- `resolve()` handles strings (hex, CSS, named), ints, and Color passthrough
- Named colors match CSS spec values exactly
- Invalid inputs raise `ParseError` with structured attributes
- Tests cover all formats and error paths
