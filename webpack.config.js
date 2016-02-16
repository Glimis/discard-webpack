var webpack = require('webpack');
var path = __dirname;
module.exports = {
    entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './assets/index.js'
        ],
    output: {
        path: path + '/lib/',
        publicPath: "/lib/",
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['react-hot', 'jsx?harmony'],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
