---
title: "Add incremental builder pattern for gradient construction"
id: "01knfrzze"
status: completed
priority: medium
type: feature
tags: ["api", "gradient"]
created: "2026-04-05"
---

# Add incremental builder pattern for gradient construction

## Objective

Gradient construction currently requires a complete config object upfront (`ts/src/gradient.ts:30-73`). There is no way to add stops incrementally, making complex gradients verbose and hard to build dynamically. Introduce a builder pattern (e.g., `GradientBuilder` or `addStop()` method) that allows gradients to be constructed step-by-step while keeping the existing config-object API as a convenience shorthand.

**Relevant files:** `ts/src/gradient.ts:30-73`

## Tasks

- [x] Design the builder API (`GradientBuilder` class or fluent methods on `Gradient`)
- [x] Implement `addStop(color, position?)` for incrementally adding color stops
- [x] Support chaining (fluent interface): `gradient().addStop(red, 0).addStop(blue, 1).build()`
- [x] Allow setting interpolation space and other options via the builder (e.g., `.space("lab")`, `.mode("linear")`) — Note: interpolation space/mode not applicable to current gradient model; builder supports `alpha()` instead
- [x] Ensure the existing config-object constructor continues to work unchanged
- [x] Add tests for builder pattern construction
- [x] Add tests for equivalence between builder-constructed and config-constructed gradients
- [x] Export builder from the package public API
- [x] Update docs (`apps/docs`) with builder usage examples

## Acceptance Criteria

- Gradients can be constructed incrementally via `addStop()` or equivalent builder methods
- Builder supports fluent chaining
- Existing config-object API remains unchanged and functional
- A gradient built incrementally produces identical results to one built with the equivalent config object
- All new behavior has corresponding tests
- `make check` passes
