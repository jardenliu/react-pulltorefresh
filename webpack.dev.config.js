const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        'example': resolve(__dirname, 'example', 'index.js')
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: resolve(__dirname, 'www'),
        publicPath: '/'
    },

    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.styl$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'stylus-loader']
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}