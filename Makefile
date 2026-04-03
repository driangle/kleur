.PHONY: check check-lite

check-lite:
	cd ts && npm run typeCheck && npm run lint

check: check-lite ## Full validation: check-lite + tests, docs build
	cd ts && npm run test && npm run build
	cd apps/docs && npm run build
