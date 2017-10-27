const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const OfflinePlugin = require('offline-plugin');
const autoprefixer = require('autoprefixer');

let templatePath = path.resolve(__dirname, '..', 'dist', 'template.html');
let stylePath = path.join(__dirname, '../src/styles');
let staticSourcePath = path.resolve(__dirname, '..', 'dist'); // Deal with later

module.exports = merge(common, {
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include: stylePath,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { modules: true, minimize: true }},   
            'postcss-loader',
            'sass-loader'  
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist/bundle', { root: process.cwd(), verbose: true }),
    new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': JSON.stringify('production')} }),    
    new webpack.optimize.ModuleConcatenationPlugin(), // Enables Scope hosting, reducing build size  
    new webpack.optimize.UglifyJsPlugin({ parallel: true}), // Standard minification tool with additional configs
    new webpack.HashedModuleIdsPlugin(), // Adds Deterministic Hashes for Caching, currently unnecssary but leave it here for now
    new HtmlWebpackPlugin({
      template: templatePath,
      filename: 'index_bundle.html',
      inject: 'body',
      cache: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: staticSourcePath,
        postcss: [
            autoprefixer({
                browsers: [
                    'last 3 version',
                    'ie >= 10'
                ]
            })
        ]
      }
    }),
    new ExtractTextPlugin({
        filename: 'style.[chunkhash].css',
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({ // Bundles minified core libraries
      name: 'vendor',
      filename: 'vendor.[chunkhash].bundle.js',
      minChunks: Infinity,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.scss$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    }),
    new OfflinePlugin({
      AppCache: false,
      ServiceWorker: { events: true },
    }),
  ]
});
