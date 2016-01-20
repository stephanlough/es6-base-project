# How to build

    npm install
    npm start



### JS

All application source js lives in [`www/js/app/`](www/js/app/).

Entry point is [`www/js/app/main.js`](www/js/app/main.js).

Code gets transpiled from es6 with [babel](https://babeljs.io/) and bundled into [`www/js/main.bundle.js`](www/js/main.bundle.js) with browserify whenever anything in `www/js/app/` changes.

Javascript libraries should be installed and loaded through npm if supported:

First:

	npm install --save jquery

Then in js:

    import $ from 'jquery';
    console.log($);

If a library is not on npm just put it in [`www/js/vendor/`](www/js/vendor/) and include it in [`www/index.html`](www/index.html)


### CSS

CSS is [Stylus](https://learnboost.github.io/stylus/).
Edit [`main.styl`](www/media/main.styl) which gets compiled to [`main.css`](www/media/main.css)
