all: casper_modules_list derecho_modules_list

casper_modules_list: utils/update_module_list.sh
	@echo "Updating Casper module list..."
	@./$< casper > casper_modules_list.tmp
	@mv -f casper_modules_list.tmp docs/compute-systems/casper/casper-modules-list.md

derecho_modules_list: utils/update_module_list.sh
	@echo "Updating Derecho module list..."
	@./$< derecho > derecho_modules_list.tmp
	@mv -f derecho_modules_list.tmp docs/compute-systems/derecho/derecho-modules-list.md

# this rule invokes emacs on each source file to remove trailing whitespace.
delete-trailing-whitespace:
	for file in *.txt *.yaml $$(find ./docs -name "*.md" -type f); do \
	  echo $$file ; \
	  emacs -batch $$file --eval '(delete-trailing-whitespace)' -f save-buffer 2>/dev/null ; \
	done
