const { resolve } = require('path')
const webpack = require('webpack')


const reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};
const reactDOMExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
};

const ptrExternal = {
    root: 'Pulltorefreshjs',
    commonjs2: 'pulltorefreshjs',
    commonjs: 'pulltorefreshjs',
    amd: 'pulltorefreshjs'
};

module.exports = {
    entry: {
        'rect-pulltorefresh': resolve(__dirname, 'src', 'index.js')
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
        libraryTarget: 'umd',
        library: 'ReactPullToRefresh'
    },

    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },

    externals: {
        'react': reactExternal,
        'react-dom': reactDOMExternal,
        'pulltorefreshjs': ptrExternal
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}