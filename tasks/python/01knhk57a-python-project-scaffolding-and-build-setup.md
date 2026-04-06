---
title: "Python: project scaffolding and build setup"
id: "01knhk57a"
status: pending
priority: critical
type: chore
effort: small
tags: ["python", "infrastructure"]
created: "2026-04-06"
context: ["docs/specs/python-library.md"]
---

# Python: project scaffolding and build setup

## Objective

Set up the Python package structure with pyproject.toml, pytest, directory layout, and CI-ready tooling. This is the foundation for all Python library work.

## Tasks

- [ ] Create `py/` directory as the Python implementation root
- [ ] Create `py/kleur/` package with `__init__.py` and `py.typed` marker (PEP 561)
- [ ] Set up `pyproject.toml` with package metadata, Python ≥3.10, zero dependencies
- [ ] Configure pytest as the test framework with a placeholder test
- [ ] Add ruff for linting and formatting (pyproject.toml config)
- [ ] Add mypy for type checking (strict mode)
- [ ] Verify `pytest`, `ruff check`, and `mypy` all pass on the empty package
- [ ] Add Python targets to the root Makefile (or create py/Makefile)

## Acceptance Criteria

- `py/kleur/` exists with `__init__.py` and `py.typed`
- `pytest` runs and passes with a placeholder test
- `ruff check` and `mypy --strict` pass
- Package is installable in editable mode (`pip install -e .`)
