---
id: "01kn9055g"
title: "Set up ESLint with max file length rule"
status: pending
priority: high
effort: small
type: chore
phase: "foundation"
dependencies: ["01kn8ysmd"]
tags: [infrastructure, linting, phase:1-foundation]
created: 2026-04-03
---

# Set up ESLint with max file length rule

## Objective

Add ESLint to the TypeScript project with a strict max file length rule of 200 lines. This enforces the project's file organization principles (one clear responsibility per file, scannable in a minute) from the start.

## Tasks

- [ ] Install eslint and typescript-eslint as dev dependencies
- [ ] Create eslint.config.ts (flat config format)
- [ ] Enable the `max-lines` rule with a limit of 200 lines
- [ ] Add recommended TypeScript-ESLint rules
- [ ] Add `lint` script to package.json (`eslint src/`)
- [ ] Verify `npm run lint` runs and passes on an empty/minimal project

## Acceptance Criteria

- ESLint is configured and runs via `npm run lint`
- Any file exceeding 200 lines triggers a lint error
- TypeScript files are linted with type-aware rules
- Flat config format is used (not legacy `.eslintrc`)
