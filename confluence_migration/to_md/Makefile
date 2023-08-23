all: doc_to_docx docx_to_md

%.docx: %.doc
	rm -f foo.doc
	cp "$<" foo.doc
	doc2docx foo.doc
	mv foo.docx "$@"

%.md: %.docx
	rm -f foo.docx
	cp "$<" foo.docx
	pandoc --from docx --to gfm foo.docx --output foo.md
	mv foo.md "$@"

doc_to_docx:
	rm -f foo.doc
	for file in *.doc; do \
	  $(MAKE) $${file/.doc/.docx} ; \
	done

docx_to_md:
	rm -f foo.docx
	for file in *.docx; do \
	  $(MAKE) $${file/.docx/.md} ; \
	done


clean:
	rm -f *~ foo.doc foo.docx foo.md

clobber:
	$(MAKE) clean
	rm -f *.docx *.md
