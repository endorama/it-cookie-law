module.exports = function(grunt) {

  var banner = '/**\n' +
               ' * <%= pkg.name %>\n' +
               ' * \n' +
               ' * v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
               ' * Author : <%= pkg.author %>\n' +
               ' * License: <%= pkg.license %>\n' +
               ' * \n' +
               ' * docCookies is released under GPL 3.0\n' +
               ' * https://developer.mozilla.org/en-US/docs/Web/API/document.cookie\n' +
               ' * http://www.gnu.org/licenses/gpl-3.0-standalone.html\n' +
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
    },
    'release-it': {
      options: {
        // 'dry-run': true,
        pkgFiles: ['package.json', 'bower.json'],
        commitMessage: 'Release v%s',
        tagName: 'v%s',
        tagAnnotation: 'Release v%s',
        buildCommand: 'grunt build'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-release-it');

  // Default task(s).
  grunt.registerTask('default', ['release-it']);
  grunt.registerTask('build', ['uglify', 'concat']);

};