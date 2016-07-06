var path = require('path');
var webpack = require('webpack');
var WebpackNotifier = require('webpack-notifier');

var src = path.resolve('./src');
var build = path.resolve('./build');

module.exports = {
    paths: {
        src: src,
        build: build,
    },
    config: {
        entry: {
            main: [path.join(src, 'js/app/main.js')],
        },
        output: {
            path: build,
            filename: '[name].bundle.js'
        },
        resolve: {
            root: [
                src,
                path.join(src, 'js'),
            ]
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {test: /\.jsx?$/i, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.css$/i, loader: 'style-loader!css-loader'},
                {test: /\.styl$/i, loader: 'style-loader!css-loader!stylus-loader'},

                // load everything else as a file asset
                // this seems fine but breaks some webpack internals
                // https://github.com/webpack/webpack-dev-server/issues/500
                //{test: /^(?!.*\.(jsx?|css|styl|html)$)/i, loader: 'asset'},
            ]
        },
        resolveLoader: {
            alias: {
                'asset': 'file-loader?name=assets/[name]-[hash].[ext]',
            }
        },
        plugins: [
            new WebpackNotifier(),
        ],
        stylus: {
            use: [require('nib')()],
            import: ['~nib/lib/nib/index.styl']
        },
    }
}
