all:	update-compiler

SRCS=src/basic.scm src/backquote.scm src/lisp2js.scm
TMPFN=,lisp2js.js

clean:
	rm -rf lisp2js-old.js $(TMPFN)

update-compiler:	lisp2js.js
lisp2js.js:	$(SRCS)
	make $(TMPFN)
	mv $(TMPFN) $@

$(TMPFN):	$(SRCS)
	echo '// DO NOT EDIT, this file is generated from src/*.scm' > $@
	./jslisp -c $(SRCS) >> $@

test:	read-test inside-test shell-test

read-test:
	cd test && node read-test.js

inside-test:
	cd test && ../jslisp test.scm

shell-test:
	cd test && ./test.sh

runtime/lisp.min.js:	runtime/lisp.js
	uglifyjs -c -o $@ --source-map $<.map $<

update-gh-pages:
	git checkout gh-pages && \
	git checkout master -- lisp2js.js && mv lisp2js.js js/ && \
	git checkout master -- runtime/lisp.js && mv runtime/lisp.js js/ && \
	git commit -am 'Update runtime' && \
	git checkout master
