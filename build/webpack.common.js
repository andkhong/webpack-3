const path = require('path');

const sourcePath = path.resolve(__dirname, '..', 'src');
const entryPath = path.resolve(__dirname, '..', 'src', 'index.js');
const outputPath = path.resolve(__dirname, '..', 'dist', 'bundle');
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
    entry: {
        index: entryPath,
    },
    output: {
        path: outputPath
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss'], // Eliminates need to include extensions when importing
        modules: [sourcePath, nodeModulesPath], // src folder will take precedences when searching for file 
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: { 
                        name (file) {
                            return process.env.NODE_ENV === 'production' 
                                ? '[name][hash:5].[ext]'
                                : '[name].[ext]';
                        }
                    }
                }
            }
        ]
    }
};