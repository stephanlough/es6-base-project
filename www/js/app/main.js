// tons of new stuff in ES6:
// http://babeljs.io/docs/learn-es2015/
let burger = 'VARIABLES';
let message = `ES6 is awesome!
Look at this multiline string
with ${burger} in it!`
console.log(message);


// can import npm modules directly
// (install with npm first: `npm install --save jquery`)
//import $ from 'jquery';
//console.log($);
//$('body').prepend(message);

// (`npm install --save swiper`)
//import Swiper from 'swiper';
//console.log(Swiper);

// can include modules that set up globals
// (`npm install --save gsap`)
//import 'gsap'
//console.log(TweenMax);


// babel automatically parses React jsx too
//import * as ReactExample from './ReactExample.js';
//ReactExample.render(document.getElementById('app'));
