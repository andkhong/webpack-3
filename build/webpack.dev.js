const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sourcePath = path.resolve(__dirname, '..', 'src');
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');
const stylePath = path.join(__dirname, '../src/styles');
const basePath = path.join(__dirname, '..', 'dist');
const regex = new RegExp(`${sourcePath}`);

module.exports = merge(common, {
    // devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/,
                include: sourcePath,
                exclude: nodeModulesPath,
                loader: ['cache-loader', 'babel-loader?cacheDirectory=true']
            },
            {
                test: /\.(css|scss)$/,
                include: stylePath,
                exclude: nodeModulesPath,
                use: [
                    'style-loader', // Plugin for development, injects css tag to html
                    { loader: 'css-loader', options: { modules: true }},
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: basePath, // Assets will be served
        open: true, // Open browser to localhost:port
        inline: false, // Inline reduces bundle size by fair amount, improving compilation while enabling resolve modules to work on webpack.common.js,
        historyApiFallback: true, // Falls back to index.html; we won't have to set an entry point and add an additional html loader        
        port: 9000,
        proxy: {
            
        }
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': JSON.stringify('development')} }),
        new webpack.optimize.CommonsChunkPlugin({ // Manifest + Dynamic Imports => Lazy Loading + Incremental Builds (Incredibly fast builds + compile)
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.NamedChunksPlugin(function(chunk) {
            if (chunk.name) return chunk.name;      
            for (var m of chunk._modules) {
                if (regex.test(m.context)) {
                    return path.basename(m.rawRequest);
                }
            }
        })  
        // new BundleAnalyzerPlugin(), // Comment to analyze Bundle size
    ]
});