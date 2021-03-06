module.exports = function(grunt) {
    return {
        options: {
            dirs: ['src/**', '.tmp/*'],
            livereload: {
                enabled: true,
                port: 35729,
                extensions: ['js', 'html', 'css', 'jade']
            }
        },
        jade: function(path) {
            var files = grunt.config.get('jade.compile.files').slice();
            if(!/_\w+\.jade$/.test(path)) {
                files[0].src = path.split('src/jade/')[1];
            } else {
                files[0].src = '**/!(_)*.jade';
            }
            grunt.config.set(['jade', 'compile', 'files'], files);
            return ['jade:compile'];
        },
        md: function() {
            var files = grunt.config.get('jade.compile.files').slice();
            files[0].src = '**/!(_)*.jade';
            grunt.config.set(['jade', 'compile', 'files'], files);
            return ['jade:compile'];
        },
        js: function(path) {
            var files = grunt.config.get('copy.js.files').slice();
            files[0].src = path.split('src/js/')[1];

            grunt.config.set(['copy', 'js', 'files'], files);
            grunt.config.set(['jshint', 'each', 'files'], files);
            return ['jshint:each', 'copy:js'];
        },
        scss: function() {
            return ['compass:dev'];
        },
        png: '<%= esteWatch.img %>',
        jpg: '<%= esteWatch.img %>',
        gif: '<%= esteWatch.img %>',
        img: function(path) {
            var files = grunt.config.get('copy.img.files').slice();
            files[0].src = path.split('src/img/')[1];

            grunt.config.set(['copy', 'img', 'files'], files);

            return ['copy:img'];
        }
    }
};
