// Require and get path
const path = require('path');
const port = 9000;
const buildFolder = 'dist';

module.exports = function (grunt) {
    // Load npm tasks for grunt
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Config grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            folder: [buildFolder + '/'],
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
                    dest: buildFolder + '/assets/js',
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img',
                    src: ['**'],
                    dest: buildFolder + '/assets/img',
                }, {
                    expand: true,
                    cwd: 'src/assets/sounds',
                    src: ['**'],
                    dest: buildFolder + '/assets/sounds',
                }, {
                    expand: true,
                    cwd: 'src/assets/fonts',
                    src: ['**'],
                    dest: buildFolder + '/assets/fonts',
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
                    [buildFolder + '/index.html']: 'src/index.html'
                }
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    base: path.join(__dirname, buildFolder),
                    port: port,
                    open: true,
                    hostname: 'localhost'
                }
            }
        },
        watch: {
            compass: {
                files: ['src/assets/sass/*.scss', 'src/assets/sprites/**/*.png'],
                tasks: ['compass']
            },
            js: {
                files: ['src/assets/js/*.js'],
                tasks: ['babel']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['htmlmin']
            },
            options: {
                livereload: true
            },
        }
    });

    grunt.registerTask('default', ['clean', 'compass', 'babel', 'copy', 'htmlmin', 'connect', 'watch']);
};