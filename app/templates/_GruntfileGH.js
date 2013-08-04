module.exports = function(grunt) {
  grunt.initConfig({
    
    clean: ['dist/'],

    ejs: {
      all: {
        options: {
          bodyid: function(filename) {
            return require('path').basename(filename, '.ejs');
          },
        },
        src: ['**/*.ejs', '!partials/**/*'],
        dest: 'dist/',
        cwd: 'app/',
        expand: true,
        ext: '.html',
      },
    },

    copy: {
      all: {
        src: ['index.html', 'assets/**/*'],
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
        files: ['index.html', 'assets/**/*'],
        tasks: ['copy'],
      }
    },

    'gh-pages': {
      options: {
        base: 'dist/'
      },
      src: ['**/*']
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.registerTask('default', ['clean', 'ejs', 'browserify', 'copy']);
  
  grunt.registerTask('dev', ['default', 'connect', 'watch']);

  grunt.registerTask('deploy', ['default', 'gh-pages']);
};