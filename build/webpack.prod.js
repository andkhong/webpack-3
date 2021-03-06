const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
// const CompressionPlugin = require('compression-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');
// // Bundle optimization plugins
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sourcePath = path.resolve(__dirname, '..', 'src');
const templatePath = path.resolve(__dirname, '..', 'dist', 'template.html');
const stylePath = path.join(__dirname, '../src/styles');
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');
const staticSourcePath = path.resolve(__dirname, '..', 'dist'); // Deal with later
const regex = new RegExp(`${sourcePath}`);

module.exports = merge(common, {
  entry: {
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        include: sourcePath,
        exclude: nodeModulesPath,
        loader: ['happypack/loader?id=js']
      },
      {
        test: /\.(css|scss)$/,
        include: stylePath,
        exclude: nodeModulesPath,
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
    new webpack.optimize.ModuleConcatenationPlugin(),// Enables Scope hosting, reducing build size  
    new webpack.HashedModuleIdsPlugin(),// Adds Deterministic Hashes for Caching, currently unnecssary but leave it here for now
    new HappyPack({ id: 'js', loaders: ['cache-loader', 'babel-loader'], threads: 4 }),
    new webpack.NamedChunksPlugin(function(chunk) {
      if (chunk.name) return chunk.name;
      for (let m of chunk._modules) {
        if (regex.test(m.context)) {
          if (m.issuer && m.issuer.id) {
            return path.basename(m.issuer.rawRequest);
          } else {
            return path.basename(m.rawRequest);
          }
        }
      }
    }),
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
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: true
    // }),
    // new OfflinePlugin({
    //   AppCache: false,
    //   ServiceWorker: { events: true },
    // }),
    // new BundleAnalyzerPlugin(), // Comment to analyze Bundle size
  ]
});
