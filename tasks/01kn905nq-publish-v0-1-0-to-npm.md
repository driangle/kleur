---
id: "01kn905nq"
title: "Publish v0.1.0 to npm"
status: blocked
priority: medium
effort: small
type: chore
phase: "polish"
dependencies: ["01kn8ytch", "01kn8ytcv"]
tags: [release, npm, phase:4-polish]
created: 2026-04-03
---

# Publish v0.1.0 to npm

## Objective

Publish the initial v0.1.0 release of kleur to npm. This is the first public release, so package metadata, license, and publishing config need to be finalized before running `npm publish`.

## Tasks

- [x] Verify package.json has correct: name, version (0.1.0), description, license (MIT), repository, keywords
- [x] Ensure `files` field in package.json includes only dist/, README, and LICENSE
- [x] Add LICENSE file (MIT)
- [x] Run full build and test suite — all must pass
- [x] Run `npm run lint` — no errors
- [x] Run `npm pack --dry-run` to verify package contents look correct
- [ ] Create a git tag `v0.1.0`
- [ ] Run `npm publish` (or `npm publish --access public` if scoped)
- [ ] Verify the package is installable: `npm install kleur` in a fresh project

## Acceptance Criteria

- Package is published to npm as version 0.1.0
- `npm install kleur` works and gives access to the full API
- Package size is reasonable (no test files, no source maps in the published package)
- LICENSE file is included
- Git tag v0.1.0 exists
