.PHONY: test

clean:
	rn -rf node_modules/

install:
	npm install

unit-test:
	mocha

test:
	# empty target

build:
	./node_modules/.bin/browserify src/js/main.js -o dist/main.js -t babelify --debug
	./node_modules/.bin/node-sass src/scss/main.scss --output dist/
	cp src/index.html dist/index.html

run:
	./node_modules/.bin/static-server -p 1981

deploy:
	# empty target
