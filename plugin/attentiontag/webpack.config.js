const path = require('path');

module.exports = {
    // Define entry points for React/npm integration and Moodle AMD module
    entry: {
        // 'attentiontag': './amd/src/attentiontag.js', // React-based npm integration
        'main': './amd/src/main.js',                // Moodle-specific AMD module
        // 'floating_icon': './amd/src/floating_icon.js', // Add floating_icon entry
    },
    // Define output settings
    output: {
        path: path.resolve(__dirname, 'amd/build'), // Output directory
        filename: '[name].js',                      // Output filenames: attentiontag.js, main.js
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
            // 'block_attentiontag/attentiontag': path.resolve(__dirname, 'amd/src/attentiontag'), // Map Moodle AMD module to React-based integration
            // TODO: Make the below work for all core/* - the below line didn't work
//            'core': '/Users/arvind/attentiontag/code/moodle/moodle/lib/amd/build',
            'core/log': path.resolve(__dirname, '../../lib/amd/build/log.min.js'),
            'core/loglevel': path.resolve(__dirname, '../../lib/amd/build/loglevel.min.js'),
            // "block_attentiontag/floating_icon": path.resolve(__dirname, "/amd/src/floating_icon.js"), // explicitly map floating_icon AMD module to be imported in main.js
        },
        extensions: ['.js', '.jsx'],              // Allow importing without extensions
    },
    // Set mode to production for optimized output
    mode: 'production',
    // Show detailed errors during build process
    stats: {
        errorDetails: true,
    },
};
