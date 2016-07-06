var _ = require('underscore');
var path = require('path');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var portfinder = require('portfinder');

var WebpackNotifier = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var common = require('./webpack.common.js');

var config = _.extend({}, common.config, {
    plugins: [
        new WebpackNotifier(),
        new HtmlWebpackPlugin({template: path.join(common.paths.src, 'index.html')}),
    ],
});

portfinder.basePort = 7000;
portfinder.getPort(function(err, port){

    config.entry.devserver = 'webpack-dev-server/client?http://0.0.0.0:'+port;

    var compiler = webpack(config);

    var server = new webpackDevServer(compiler, {
        stats: { colors: true },
    });

    server.listen(port, function(){
        console.log('http://localhost:'+port);
    });
})
