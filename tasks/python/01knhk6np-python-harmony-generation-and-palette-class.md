---
title: "Python: harmony generation and Palette class"
id: "01knhk6np"
status: pending
priority: high
type: feature
effort: medium
tags: ["python", "harmony", "palette"]
depends-on: ["01knhk6fx", "01knhk6j5"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/harmony.ts", "ts/src/palette.ts", "ts/src/palette-utils.ts"]
---

# Python: harmony generation and Palette class

## Objective

Implement the Palette class (an immutable collection of Colors with bulk operations) and all color harmony generation functions. Palette is returned by harmony functions and supports iteration, functional methods, bulk color ops, and analysis/transformation.

## Tasks

- [ ] Create `py/kleur/palette.py` with `Palette` class:
  - [ ] Collection protocol: `__len__`, `__getitem__` (negative index), `__iter__`, `__contains__`, `__repr__`
  - [ ] Functional methods: `map()`, `filter()`, `flat_map()`, `for_each()`, `to_list()`
  - [ ] Bulk color operations: `lighten`, `darken`, `saturate`, `desaturate`, `rotate`, `invert`, `complement`, `grayscale`, `opaque`, `warm`, `cool`, `mix`, `blend`
  - [ ] Analysis/transformation: `sort_by(channel, direction)`, `balance_lightness(target)`, `spread(count)`, `interpolate(steps, ease)`, `harmonize(amount)`, `unique(threshold)`
- [ ] Create `py/kleur/harmony.py` with module-level functions:
  - [ ] `triadic(color)` — 3 colors at 120° intervals
  - [ ] `tetradic(color)` — 4 colors at 90° intervals
  - [ ] `analogous(color, angle=30)` — 3 adjacent colors
  - [ ] `split_complement(color, angle=30)` — base + 2 at 180±angle
  - [ ] `tints(color, count)` — progressively lighter
  - [ ] `shades(color, count)` — progressively darker
  - [ ] `tones(color, count)` — progressively desaturated
- [ ] Add corresponding instance methods on `Color` that delegate to harmony functions
- [ ] `InvalidCountError` for invalid count values
- [ ] Tests for all harmony functions and palette operations

## Acceptance Criteria

- `Palette` supports Python iteration protocol (`for color in palette`)
- Negative indexing works (`palette[-1]`)
- All bulk operations return new Palette instances
- `sort_by` sorts correctly for all channels in both directions
- `unique()` removes perceptually similar colors using distance threshold
- Harmony functions produce correct hue rotations
- `tints`/`shades`/`tones` raise `InvalidCountError` for invalid counts
