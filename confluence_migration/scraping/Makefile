all:
	$(MAKE) scrape_docs.py

hpc_docs_pages.xlsx: scrape_docs.py
	rm -f scrape_docs.py
	$(MAKE) scrape_docs.py
	./scrape_docs.py

%.py : %.ipynb Makefile
	jupyter nbconvert --to=notebook --clear-output $< >/dev/null
	jupyter nbconvert --to=python $< >/dev/null
	chmod +x $@

clean:
	rm -f *~

clobber:
	$(MAKE) clean
	rm -f *.py *~
