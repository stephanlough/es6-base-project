var _ = require('underscore');

var path = require('path');
var webpack = require('webpack');
var WebpackNotifier = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var common = require('./webpack.common.js');

module.exports = [
    _.extend({}, common.config, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new WebpackNotifier(),
            new HtmlWebpackPlugin({template: path.join(common.paths.src, 'index.html')}),
        ],
    }),
];
