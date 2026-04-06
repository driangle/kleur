---
title: "Standardize config vs options parameter naming"
id: "01kngmq83"
status: pending
priority: medium
type: chore
tags: ["api-consistency"]
created: "2026-04-06"
---

# Standardize config vs options parameter naming

## Description

Configuration object parameters are inconsistently named across the API:

- `gradient.ts:40,63` — `linearGradient(config)` and `radialGradient(config)` use `config`
- `distance.ts:114` — `distance(a, b, options?)` uses `options`
- `random.ts:46` — `random(options?)` uses `options`

Standardize on `options` for all configuration parameters since it's the more common convention in the codebase and aligns with typical JS/TS library conventions.

## Tasks

- [ ] Rename `config` to `options` in `linearGradient()` (`ts/src/gradient.ts:40`)
- [ ] Rename `config` to `options` in `radialGradient()` (`ts/src/gradient.ts:63`)
- [ ] Update all internal references to `config.*` within both functions
- [ ] Update docs if the parameter name is referenced (`apps/docs`)
- [ ] Run `make check` to verify lint, tests, and build pass
