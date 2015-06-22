module.exports = function(grunt) {

  var banner = '/**\n' +
               ' * <%= pkg.name %>\n' +
               ' * \n' +
               ' * v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
               ' * Author : <%= pkg.author %>\n' +
               ' * License: <%= pkg.license %>\n' +
               ' */\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: banner,
        sourceMap: true
      },
      build: {
        src: [
          'src/cookies.js',
          'src/banner.js',
          'src/main.js',
        ],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      options: {
        banner: banner,
        sourceMap: true
      },
      build: {
        src: [
          'src/cookies.js',
          'src/banner.js',
          'src/main.js',
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};