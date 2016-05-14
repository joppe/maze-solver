SHELL := /bin/bash

PWD := $(shell pwd)

npm:
	@echo "Install node packages"
	npm install

bower:
	@echo "Install bower packages"
	$(PWD)/node_modules/bower/bin/bower install

babel:
	@echo "Transpile javascript"
	$(PWD)/node_modules/babel/bin/babel.js src --stage 1 --out-dir dist --modules system

babel-watch:
	@echo "Transpile javascript & watch for changes"
	$(PWD)/node_modules/babel/bin/babel.js src --stage 1 --out-dir dist --modules system  --watch

setup: npm bower babel

clean:
	@echo "Cleanup installed files"
	@rm -rf node_modules
	@cd dist && ls | grep -v .gitkeep | grep -v system.conf.js | grep -v worker.js | xargs rm -rf
