module.exports = function(grunt) {
  grunt.initConfig({
    
    clean: ['dist/'],

    ejs: {
      all: {
        options: {
          // site-wide vars here
        },
        src: ['**/*.ejs', '!partials/**/*'],
        dest: 'dist/',
        expand: true,
        ext: '.html',
      },
    },

    copy: {
      all: {
        src: ['assets/**/*'],
        dest: 'dist/',
      },
    },

    browserify: {
      all: {
        src: 'app.js',
        dest: 'dist/app.js'
      },
    },

    connect: {
      options: {
        port: process.env.PORT || 3131,
        base: 'dist/',
      },

      all: {},
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: '<%= ejs.all.src %>',
        tasks: ['ejs'],
      },

      js: {
        files: '<%= browserify.all.src %>',
        tasks: ['browserify'],
      },

      assets: {
        files: ['index.ejs', 'assets/**/*'],
        tasks: ['copy'],
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.registerTask('default', ['clean', 'ejs', 'browserify', 'copy']);
  
  grunt.registerTask('dev', ['default', 'connect', 'watch']);
};