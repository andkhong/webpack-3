const path = require('path');

let entryPath = path.resolve(__dirname, '..', 'src', 'index.js');
let outputPath = path.resolve(__dirname, '..', 'dist');
let sourcePath = path.resolve(__dirname, '..', 'src');
let nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
    entry: {
        index: entryPath,
    },
    output: {
        path: outputPath
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss'],
        modules: [sourcePath, nodeModulesPath],
        symlinks: false
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/,
                include: /src/,
                exclude: /node_modules/,
                // loader: 'babel-loader',
                loader: ['cache-loader', 'babel-loader'],
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg|woff|woff2|otf|ttf|eot)$/,
                    use: {
                    loader: 'file-loader',
                     options: { name: '[name].[hash].[ext]' },
                }
            }
        ]
    }
};