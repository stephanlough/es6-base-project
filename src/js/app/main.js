var nativePromise = window.Promise;
require('babel-polyfill');
if (nativePromise) window.Promise = nativePromise; // Use browser's native Promise for nicer errors

require('media/main.styl');

import {render} from './ReactExample.js';
render(document.getElementById('app'));
