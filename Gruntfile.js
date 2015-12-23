module.exports = function (grunt) {
    grunt.initConfig({
        concat_sourcemap: {
            options: {
                sourcesContent: false
            },
            all: {
                files: {
                    'backend/web/scripts/all.js': grunt.file.readJSON('backend/assets/js.json'),
                    'backend/web/styles/all.css': grunt.file.readJSON('backend/assets/css.json'),
                    
                    'frontend/web/scripts/all.js': grunt.file.readJSON('frontend/assets/js.json'),
                    'frontend/web/styles/all.css': grunt.file.readJSON('frontend/assets/css.json')
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: 'vendor/bower/bootstrap-sass-official/assets/fonts/bootstrap/*',
                        dest: 'backend/web'
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: 'vendor/bower/font-awesome/fonts/*',
                        dest: 'backend/web'
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: 'vendor/bower/bootstrap-sass-official/assets/fonts/bootstrap/*',
                        dest: 'frontend/web'
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: 'vendor/bower/font-awesome/fonts/*',
                        dest: 'frontend/web'
                    }
                ]
            }
        },
        uglify: {
            all: {
                options: {
                    sourceMap: false,
                    sourceMapIncludeSources: false,
                    drop_console: true
                },
                files: {
                    'backend/web/scripts/all.js': 'backend/web/scripts/all.js',
                    'frontend/web/scripts/all.js': 'frontend/web/scripts/all.js'
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: 0,
                    sourceMap: false
                },
                files: {
                    'backend/web/styles/all.css': [
                        '.tmp/styles/{,*/}*.css',
                        'backend/web/styles/all.css'
                    ],
                    'frontend/web/styles/all.css': [
                        '.tmp/styles/{,*/}*.css',
                        'frontend/web/styles/all.css'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                        expand: true,
                        cwd: 'backend/web/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: 'backend/web/images'
                    },
                    {
                        expand: true,
                        cwd: 'frontend/web/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: 'frontend/web/images'
                    }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                        expand: true,
                        cwd: 'backend/web/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: 'backend/web/images'
                    },
                    {
                        expand: true,
                        cwd: 'frontend/web/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: 'frontend/web/images'
                    }]
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                
                cssDir: '.tmp/styles',
                
                importPath: './vendor/bower',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            backend: {
                options: {
                    sassDir: 'backend/assets/styles',
                    generatedImagesDir: '.tmp/images/generated',
                    imagesDir: 'backend/web/images',
                    javascriptsDir: 'backend/web/scripts',
                    fontsDir: 'backend/web/styles/fonts',
                    generatedImagesDir: 'backend/web/images/generated'
                }
            },
            frontend: {
                options: {
                    sassDir: 'frontend/assets/styles',
                    generatedImagesDir: '.tmp/images/generated',
                    imagesDir: 'frontend/web/images',
                    javascriptsDir: 'frontend/web/scripts',
                    fontsDir: 'frontend/web/styles/fonts',
                    generatedImagesDir: 'frontend/web/images/generated'
                }
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'backend/web/styles',
                            'backend/web/scripts'
                        ]
                    },
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'frontend/web/styles',
                            'frontend/web/scripts'
                        ]
                    }
                ]
            },
            final: {
                files: [
                    {
                        dot: true,
                        src: [
                            'backend/web/scripts/{,*/}*.map',
                            'backend/web/styles/{,*/}*.map'
                        ]
                    },
                    {
                        dot: true,
                        src: [
                            'frontend/web/scripts/{,*/}*.map',
                            'frontend/web/styles/{,*/}*.map'
                        ]
                    }
                ]
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            dist: [
                'compass:frontend',
                'compass:backend',
                'imagemin',
                'svgmin'
            ]
        },
        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 1 version']})
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'backend/web/styles/',
                        src: '{,*/}*.css',
                        dest: 'backend/web/styles/'
                    },
                    {
                        expand: true,
                        cwd: 'frontend/web/styles/',
                        src: '{,*/}*.css',
                        dest: 'frontend/web/styles/'
                    }
                    //'backend/web/styles/all.css'
                ]
            }
        }

    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concurrent');
    //grunt.loadNpmTasks('autoprefixer');
    grunt.loadNpmTasks('grunt-postcss');

    // Task definition
    grunt.registerTask('build', ['clean:dist', 'concurrent:dist', 'copy', 'concat_sourcemap', 'cssmin', 'postcss', 'uglify', 'clean:final']);
};