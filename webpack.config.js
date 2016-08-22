/**
 * Created by David on 22/08/2016.
 */
var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var strip = require('strip-loader')
var CleanPlugin = require('clean-webpack-plugin')
var relativeAssetsPath = './build'
var assetsPath = path.join(__dirname, relativeAssetsPath)

module.exports = {
    devtool: 'source-map',
    entry: ['./src/app.js'],
    output: {
        path: assetsPath,
        filename: 'bundle.js',
        publicPath: 'build/'
    },
    resolveLoader: {
        fallback: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [strip.loader('debug'), 'babel'],
                exclude: /node_modules/
            }
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'js',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', 'jsx']
    },
    plugins: [
        new CleanPlugin([relativeAssetsPath]),
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
}