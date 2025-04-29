// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Webpack Configuration 
 *
 * @package    block_attentiontag
 * @copyright  2025 AttentionTag Vision Technologies Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const path = require('path');
module.exports = {
    // Define entry points for React/npm integration and Moodle AMD module
    entry: {
        'main': './amd/src/main.js',                // Moodle-specific AMD module
    },
    // Define output settings
    output: {
        path: path.resolve(__dirname, 'amd/build'), // Output directory
        filename: '[name].min.js',                      // Output filenames: main.min.js
        libraryTarget: 'amd',                       // AMD compatibility for Moodle
    },
    // Exclude Moodle-provided libraries (like jQuery)
    externals: {
        jquery: 'jquery',                           // Prevent Webpack from bundling jQuery
    },
    // Configure module rules for transpiling modern JavaScript and React
    module: {
        rules: [
            {
                test: /\.jsx?$/,                   // Match .js and .jsx files
                exclude: /node_modules/,           // Exclude node_modules from transpilation
                use: {
                    loader: 'babel-loader',        // Use Babel loader for transpilation
                    options: {
                        presets: [
                            '@babel/preset-env',   // Transpile ES6+ syntax
                            '@babel/preset-react', // Transpile JSX
                        ],
                    },
                },
            },      
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'css-loader'
                ],
            },
        ],
    },
    // Resolve module paths and aliases
    resolve: {
        alias: {
            'core/log': path.resolve(__dirname, '../../lib/amd/build/log.min.js'),
            'core/loglevel': path.resolve(__dirname, '../../lib/amd/build/loglevel.min.js'),
        },
        extensions: ['.js', '.jsx'],              // Allow importing without extensions
    },
    devtool: 'source-map',                  // generates the source map file
    // Set mode to production for optimized output
    mode: 'production',
    // Show detailed errors during build process
    stats: {
        errorDetails: true,
    },
};
