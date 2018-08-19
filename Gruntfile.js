// Require and get path
let path = require('path');

module.exports = function (grunt) {
    // Load npm tasks for grunt
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Config grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            folder: ['dist/'],
        },
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                minified: true,
                presets: ['env']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/js',
                    src: ['*.js'],
                    dest: 'dist/assets/js',
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img',
                    src: ['**'],
                    dest: 'dist/assets/img',
                }, {
                    expand: true,
                    cwd: 'src/assets/sounds',
                    src: ['**'],
                    dest: 'dist/assets/sounds',
                }, {
                    expand: true,
                    cwd: 'src/assets/fonts',
                    src: ['**'],
                    dest: 'dist/assets/fonts',
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['default']
            },
            compass: {
                files: ['src/assets/sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            },
            js: {
                files: ['src/assets/js/*.js'],
                tasks: ['babel'],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: ['src/index.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false,
                }
            }
        }
    });

    grunt.registerTask('default', ['clean', 'compass', 'babel', 'copy', 'htmlmin', 'watch']);
};