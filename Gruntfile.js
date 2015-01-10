module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    },

    jekyll: {
      options: {
      },
      dist: {
        // Use all defaults
      },
      serve: {
        config: '_config.yml',
        serve: true,
        port: 4000,
        dest: '.jekyll'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('build', ['sass', 'jekyll:dist']);
  grunt.registerTask('serve', ['sass', 'jekyll:serve']);
  grunt.registerTask('default', ['build','watch']);
}
