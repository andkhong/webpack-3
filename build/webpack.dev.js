const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let stylePath = path.join(__dirname, '../src/styles');
let basePath = path.join(__dirname, '..', 'dist');

module.exports = merge(common, {
    // Optimal speed for source mapping
    devtool: 'eval',
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                include: stylePath,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { minimize: true } },
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: basePath, // Assets will be served
        open: true, // Open browser to localhost:port
        // Must be enabled for resolve modules to work on webpack.common.js
        // Inline also improve developer compilation by reducing the bundle by a good amount
        inline: false,
        // Falls back to index.html; we won't have to set an entry point and add an additional loader
        historyApiFallback: true,
        port: 9000
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.DllPlugin({
        //     context: __dirname,
        //     path: path.join(__dirname, 'manifest.json'),
        // }),
        new webpack.optimize.CommonsChunkPlugin({ // Not sure if this actually helps?
            name: 'manifest',
            minChunks: Infinity
        }),
        // new BundleAnalyzerPlugin(), // Comment to analyze Bundle size
    ]
});