# this rule invokes emacs on each source file to remove trailing whitespace.
delete-trailing-whitespace:
	for file in *.yaml $$(find ./docs -name "*.md" -type f); do \
	  echo $$file ; \
	  emacs -batch $$file --eval '(delete-trailing-whitespace)' -f save-buffer 2>/dev/null ; \
	done
