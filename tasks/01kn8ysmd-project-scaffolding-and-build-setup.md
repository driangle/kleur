---
id: "01kn8ysmd"
title: "Project scaffolding and build setup"
status: completed
priority: critical
effort: small
type: chore
phase: "foundation"
dependencies: []
tags: [infrastructure, phase:1-foundation]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Project scaffolding and build setup

## Objective

Set up the TypeScript project structure with package.json, tsconfig, build tooling, and test framework. This is the foundation everything else builds on — the goal is a working `npm run build` and `npm test` before any library code exists.

## Tasks

- [x] Initialize `ts/` directory as the TypeScript implementation root
- [x] Create package.json with name `kleur`, appropriate fields, and scripts (build, test, lint)
- [x] Configure tsconfig.json targeting ES2020+ with strict mode, ESM output
- [x] Set up a test framework (vitest recommended) with a placeholder test
- [x] Configure build to produce both ESM and CJS outputs
- [x] Add a minimal src/index.ts that exports nothing yet
- [x] Verify `npm run build` and `npm test` both pass

## Acceptance Criteria

- `npm run build` produces output in a dist/ directory
- `npm test` runs and passes (even if only a placeholder)
- tsconfig has `strict: true`
- Package supports both ESM and CJS consumers
