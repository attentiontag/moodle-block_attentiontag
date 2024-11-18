const path = require('path');

module.exports = {
    entry: './amd/src/index.js', // Your React entry file
    output: {
        path: path.resolve(__dirname, 'amd/build'),
        filename: 'attentiontag.min.js', // Output AMD-compliant file
        libraryTarget: 'amd',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};