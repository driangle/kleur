---
title: "Python: distance functions and delta-E"
id: "01knhk6me"
status: pending
priority: high
type: feature
effort: medium
tags: ["python", "distance"]
depends-on: ["01knhk6fx", "01knhk6f2"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/distance.ts", "ts/src/delta-e.ts"]
---

# Python: distance functions and delta-E

## Objective

Implement perceptual color distance computation with multiple metrics: euclidean, deltaE76, deltaE94, deltaE2000, and deltaEOK. Support both preset-based and explicit space+method configuration.

## Tasks

- [ ] Create `py/kleur/distance.py` with delta-E implementations:
  - [ ] `euclidean` — works with any color space
  - [ ] `delta_e76` — simple LAB distance
  - [ ] `delta_e94` — CIE94 with weighting factors
  - [ ] `delta_e2000` — CIEDE2000 with achromatic guards and hue-angle wrapping
  - [ ] `delta_e_ok` — OKLab euclidean distance
- [ ] Implement `distance(a, b, *, preset=...)` with 4 presets: fast, perceptual, accurate, modern
- [ ] Implement `distance(a, b, *, space=..., method=...)` for explicit configuration
- [ ] Validate space+method combinations; raise `InvalidDistanceCombinationError` for invalid pairs
- [ ] Raise `UnknownOptionError` for unknown presets, spaces, or methods
- [ ] Tests with Sharma 2005 CIEDE2000 reference pairs
- [ ] Tests for preset resolution and invalid combination errors

## Acceptance Criteria

- CIEDE2000 passes Sharma 2005 reference test pairs within tolerance
- All presets resolve to correct space+method combinations
- Invalid combinations raise `InvalidDistanceCombinationError`
- Distance is symmetric: `distance(a, b) == distance(b, a)`
- Results match TS implementation
