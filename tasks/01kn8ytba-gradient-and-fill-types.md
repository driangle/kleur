---
id: "01kn8ytba"
title: "Gradient and fill types"
status: pending
priority: medium
effort: medium
type: feature
phase: "extras"
dependencies: ["01kn8yt6f"]
tags: [gradient, phase:3-extras]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Gradient and fill types

## Objective

Implement gradient data structures (linear and radial) and the fill type union (solid | linear gradient | radial gradient). Covers spec section 10.

## Tasks

- [ ] Define LinearGradient type: start/end points, color stops array, optional globalAlpha
- [ ] Define RadialGradient type: inner/outer circles, color stops array, optional globalAlpha
- [ ] Define ColorStop type: { offset: 0-1, color: KleurValue }
- [ ] Define Fill type union: SolidKleur | LinearGradient | RadialGradient
- [ ] Implement type guards: isSolid(), isGradient(), isLinearGradient(), isRadialGradient()
- [ ] Ensure color stop offsets are clamped to 0-1
- [ ] Write tests for type construction and type guards

## Acceptance Criteria

- Linear and radial gradient types match the spec structure
- Fill type union covers solid, linear gradient, and radial gradient
- Type guards correctly discriminate between fill types
- Color stop offsets outside 0-1 are clamped
