// Generated on 2014-05-07 using generator-html5-app 0.0.3
"use strict";

// # Globbing
// for performance reasons we"re only matching one level down:
// "test/spec/{,*/}*.js"
// use this if you want to recursively match all subfolders:
// "test/spec/**/*.js"

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require("load-grunt-tasks")(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require("time-grunt")(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// Configurable paths
			app: "app",
			dist: "dist"
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ["<%= yeoman.app %>/scripts/{,*/}*.js"],
				tasks: ["jshint"],
				options: {
					livereload: true
				}
			},
			jstest: {
				files: ["test/spec/{,*/}*.js"],
				tasks: ["test:watch"]
			},
			gruntfile: {
				files: ["Gruntfile.js"]
			},
			compass: {
				files: ["<%= yeoman.app %>/styles/{,*/}*.{scss,sass}"],
				tasks: ["compass:server", "autoprefixer"]
			},
			styles: {
				files: ["<%= yeoman.app %>/styles/{,*/}*.css"],
				tasks: ["newer:copy:styles", "autoprefixer"]
			},
			livereload: {
				options: {
					livereload: "<%= connect.options.livereload %>"
				},
				files: [
					"<%= yeoman.app %>/{,*/}*.html",
					".tmp/styles/{,*/}*.css",
					"<%= yeoman.app %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}"
				]
			}
		},

		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: ['**']
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// Change this to "0.0.0.0" to access the server from outside
				hostname: "localhost"
			},
			livereload: {
				options: {
					open: true,
					base: [
						".tmp",
						"<%= yeoman.app %>"
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						".tmp",
						"test",
						"<%= yeoman.app %>"
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: "<%= yeoman.dist %>",
					livereload: false
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						".tmp",
						"<%= yeoman.dist %>/*",
						"!<%= yeoman.dist %>/.git*"
					]
				}]
			},
			server: ".tmp"
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: ".jshintrc",
				reporter: require("jshint-stylish")
			},
			all: [
				"Gruntfile.js",
				"<%= yeoman.app %>/scripts/{,*/}*.js",
				"!<%= yeoman.app %>/scripts/vendor/*",
				"test/spec/{,*/}*.js"
			]
		},






		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/img/generated',
				imagesDir: '<%= yeoman.app %>/img',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: '<%= yeoman.app %>/components',
				httpImagesPath: '/img',
				httpGeneratedImagesPath: '/img/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		// Add vendor-prefixed styles
		autoprefixer: {
			options: {
				browsers: ["last 1 version"]
			},
			dist: {
				files: [{
					expand: true,
					cwd: ".tmp/styles/",
					src: "{,*/}*.css",
					dest: ".tmp/styles/"
				}]
			}
		},
		// Automatically inject Bower components into the HTML file
		"bower-install": {
			app: {
				html: "<%= yeoman.app %>/index.html",
				ignorePath: "<%= yeoman.app %>/"
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						"<%= yeoman.dist %>/scripts/{,*/}*.js",
						"<%= yeoman.dist %>/styles/{,*/}*.css",
						"<%= yeoman.dist %>/img/{,*/}*.{gif,jpeg,jpg,png,webp}",
						"<%= yeoman.dist %>/styles/fonts/{,*/}*.*"
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: "<%= yeoman.dist %>"
			},
			html: "<%= yeoman.app %>/index.html"
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ["<%= yeoman.dist %>"]
			},
			html: ["<%= yeoman.dist %>/{,*/}*.html"],
			css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: "<%= yeoman.app %>/img",
					src: "{,*/}*.{gif,jpeg,jpg,png}",
					dest: "<%= yeoman.dist %>/img"
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: "<%= yeoman.app %>/img",
					src: "{,*/}*.svg",
					dest: "<%= yeoman.dist %>/img"
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: "<%= yeoman.dist %>",
					src: "{,*/}*.html",
					dest: "<%= yeoman.dist %>"
				}]
			}
		},

		// By default, your `index.html`"s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//	 dist: {
		//		 files: {
		//			 "<%= yeoman.dist %>/styles/main.css": [
		//				 ".tmp/styles/{,*/}*.css",
		//				 "<%= yeoman.app %>/styles/{,*/}*.css"
		//			 ]
		//		 }
		//	 }
		// },
		concat: {
			 dist: {
			 	files: {
				 	"<%= yeoman.dist %>/scripts/scripts.js": [
				 			 "<%= yeoman.app %>/app.js",
							 "<%= yeoman.app %>/js/*.js"
						  ]
			 	 }
			}
		},
		uglify: {
			 dist: {
				 files: {
					 "<%= yeoman.dist %>/scripts/scripts.js": [
						 "<%= yeoman.dist %>/scripts/scripts.js"
					 ]
				 }
			 }
		},
		ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>/scripts',
            src: 'scripts.js',
            dest: '<%= yeoman.dist %>/scripts'
          }
        ]
      }
    },

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: "<%= yeoman.app %>",
					dest: "<%= yeoman.dist %>",
					src: [
						"*.{ico,png,txt}",
						".htaccess",
						"img/{,*/}*.webp",
						"{,*/}*.html",
						"styles/fonts/{,*/}*.*",
						"bower_components/" + (this.includeCompass ? "sass-" : "") + (this.includeCompass ? "fonts/" : "dist/fonts/") +"*.*",
						"components/angucomplete/angucomplete.js"
					]
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: "<%= yeoman.app %>/styles",
				dest: ".tmp/styles/",
				src: "{,*/}*.css"
			}
		},



		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				"compass:server",
				"copy:styles"
			],
			test: [
				"copy:styles"
			],
			dist: [
				"compass",
				"copy:styles",
				"imagemin",
				"svgmin"
			]
		}
	});


	grunt.registerTask("serve", function (target) {
		if (target === "dist") {
			return grunt.task.run(["build", "connect:dist:keepalive"]);
		}

		grunt.task.run([
			"clean:server",
			"concurrent:server",
			"autoprefixer",
			"connect:livereload",
			"watch"
		]);
	});

	grunt.registerTask("server", function () {
		grunt.log.warn("The `server` task has been deprecated. Use `grunt serve` to start a server.");
		grunt.task.run(["serve"]);
	});

	grunt.registerTask("test", function(target) {
		if (target !== "watch") {
			grunt.task.run([
				"clean:server",
				"concurrent:test",
				"autoprefixer",
			]);
		}

		grunt.task.run([
			"connect:test",
		]);
	});

	grunt.registerTask("build", [
		"clean:dist",
		"useminPrepare",
		"concurrent:dist",
		"autoprefixer",
		"concat",
		"copy",
		"cssmin",
		"ngmin",
		"uglify",
		"copy:dist",
		"rev",
		"usemin",
		"htmlmin"
	]);

	grunt.registerTask("default", [
		"newer:jshint",
		"test",
		"build",
		// "gh-pages"
	]);

	grunt.registerTask("gh-pages-build", [
		"build",
		"gh-pages"
	]);
};