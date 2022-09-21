.PHONY: identifier-generator-front-check
identifier-generator-front-check:
	$(YARN_RUN) workspace @akeneo-pim-community/identifier-generator lint:check
	$(YARN_RUN) workspace @akeneo-pim-community/identifier-generator test:unit:run

.PHONY: identifier-generator-front-fix
identifier-generator-front-fix:
	$(YARN_RUN) workspace @akeneo-pim-community/identifier-generator lint:fix

.PHONY: identifier-generator-unit-back
identifier-generator-unit-back:
	$(PHP_RUN) vendor/bin/phpspec run components/identifier-generator/back/tests/Specification

.PHONY: identifier-generator-fix-lint-back
identifier-generator-fix-lint-back:
	$(PHP_RUN) vendor/bin/php-cs-fixer fix --config=components/identifier-generator/back/tests/.php_cs.php

.PHONY: identifier-generator-lint-back
identifier-generator-lint-back:
	$(PHP_RUN) vendor/bin/php-cs-fixer fix --config=components/identifier-generator/back/tests/.php_cs.php --dry-run

.PHONY: identifier-generator-acceptance-back
identifier-generator-acceptance-back:
	$(PHP_RUN) vendor/bin/behat --config components/identifier-generator/back/tests/behat.yml --suite=acceptance --format pim --out var/tests/behat/identifier-generator --format progress --out std --colors $(O)
