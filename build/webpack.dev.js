const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let stylePath = path.join(__dirname, '../src/styles');
let basePath = path.join(__dirname, '..', 'dist');
let nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');


module.exports = merge(common, {
    devtool: 'eval',
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                include: stylePath,
                exclude: nodeModulesPath,
                use: [
                    'style-loader', // Plugin for development, injects css tag to html
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: basePath, // Assets will be served
        // open: true, // Open browser to localhost:port
        // Must be enabled for resolve modules to work on webpack.common.js
        // Inline also improve developer compilation by reducing the bundle by a fair amount
        inline: false,
        historyApiFallback: true, // Falls back to index.html; we won't have to set an entry point and add an additional loader        
        port: 9000,
        proxy: {
            
        }
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ // Not sure if this actually helps?
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({ // Standard Development settings for optimization
            'process.env': {
              'NODE_ENV': JSON.stringify('development')
            }
        }),
        // new BundleAnalyzerPlugin(), // Comment to analyze Bundle size
    ]
});