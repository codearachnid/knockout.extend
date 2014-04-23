/*global module:false*/
module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta : {
      banner : '/*!\n' +
      ' * <%= pkg.main %>.js v<%= pkg.version %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
      ' * Released under the <%= pkg.license %> License.\n' +
      ' */\n\n'
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [
          'lib/bindingHandlers.attrIf.js',
          'lib/observableArray.distinct.js',
          'lib/observableArray.pushAll.js',
          'lib/observableArray.pushAt.js',
          'lib/observableArray.totalVisible.js',
          'lib/bindingHandlers.select2.js'
        ],
        dest: 'src/<%= pkg.main %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'src/<%= pkg.main %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    watch : {
      files : '<%= concat.dist.src %>',
      tasks : 'default'
    },

    jshint : {
      all : ['Gruntfile.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['test', 'concat', 'uglify']);
};
