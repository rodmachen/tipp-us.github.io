module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      script: {
        src: [
          'bower_components/foundation/js/foundation/foundation.js',
          'bower_components/foundation/js/foundation/foundation.tab.js',
          'bower_components/foundation/js/foundation/foundation.slider.js',
          'bower_components/foundation/js/foundation/foundation.topbar.js',
          // ...more foundation JS you might want to add
          'js/app.js'
        ],
        dest: 'dist/js/script.js'
      },
      modernizr: {
        src: [
          'bower_components/modernizr/modernizr.js',
          // 'develop/js/custom.modernizr.js'
        ],
        dest: 'dist/js/modernizr.js'
      }
    },

    // --------------------------------------
    // Uglify Configuration
    // --------------------------------------

    uglify: {
      dist: {
        files: {
          'dist/js/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
          'dist/js/modernizr.min.js': ['dist/js/modernizr.js'],
          'dist/js/script.min.js': ['dist/js/script.js']
        }
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      
      script: {
        files: 'dist/js/**/*.js',
        tasks: ['script']
      }
    }

  });

  // --------------------------------------
  // Concatenate Configuration
  // --------------------------------------


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('script',  ['concat', 'uglify']);
  grunt.registerTask('build', ['sass', 'script']);
  grunt.registerTask('default', ['build','watch']);
};
