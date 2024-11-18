module.exports = function(grunt) {
    grunt.initConfig({
        // Read package.json
        pkg: grunt.file.readJSON('package.json'),

        // Clean build directory
        clean: {
            build: ['amd/build'],
        },

        // Minify JavaScript
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'amd/src',
                    src: '**/*.js',
                    dest: 'amd/build',
                    ext: '.min.js'
                }]
            }
        },

        // Lint JavaScript
        eslint: {
            options: {
                configFile: '.eslintrc.json'
            },
            target: ['amd/src/**/*.js']
        }
    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');

    // Register default tasks
    grunt.registerTask('default', ['clean', 'uglify', 'eslint']);
    grunt.registerTask('amd', ['clean', 'uglify']);
};
