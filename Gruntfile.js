'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    clean: {
      build: {
        src: ['build/']
      }
    },
    
    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify : {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },
      options: {
        transform: ['reactify', 'debowerify']
      }
    },

    jshint: {
      dev: {
        options: {
          jshintrc:'.jshintrc'
        },
        src: ['Gruntfile.js', 'test/**/*.js', 'routes/**/*.js', 'server.js', 'models/**/*.js']
      }
    },

    simplemocha: {
      all: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      build: {
        files: ['app/**/*.js', 'app/index.html'],
        tasks: ['clean','browserify', 'copy']
      },

      test: {
        files: ['test/*.js'],
        tasks: ['simplemocha', 'jshint']
      }
    }
  });

  grunt.registerTask('test', ['simplemocha', 'jshint', 'watch:test']);
  grunt.registerTask('build', ['clean', 'browserify', 'copy', 'watch:build']);
};