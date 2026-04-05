---
title: "Add test coverage reporting to TypeScript project"
id: "01knfscz2"
status: pending
priority: low
type: chore
tags: ["testing", "ci"]
created: "2026-04-05"
---

# Add test coverage reporting to TypeScript project

## Objective

Set up test coverage reporting for the TypeScript project so developers can identify untested code paths and track coverage over time.

## Tasks

- [ ] Install `@vitest/coverage-v8` as a dev dependency
- [ ] Add a `test:coverage` script to `ts/package.json`
- [ ] Configure coverage thresholds and reporter options in vitest config (if needed)
- [ ] Verify coverage report generates successfully

## Acceptance Criteria

- Running `npm run test:coverage` in `ts/` produces a coverage report
- Coverage output includes line, branch, and function metrics
- `@vitest/coverage-v8` is listed in devDependencies
