install: install-deps

install-deps:
	npm ci

router:
	node src/router.js

test:
	npm run test

test-coverage:
	npm run test-coverage

lint:
	npm run lint