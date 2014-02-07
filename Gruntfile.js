'use strict';
//-----------------------
// Require
//-----------------------
var pat = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
    return connect.static(pat.resolve(dir));
};

//-----------------------
// Task Settings
//-----------------------

module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json'),
        libs = grunt.file.readJSON('config/lib.json'),
        scripts = grunt.file.readJSON('config/script.json'),
        dummy = grunt.file.readJSON('config/dummy.json'),
        testFiles = [];

    testFiles = testFiles.concat(genPath(libs, 'src'));
    testFiles = testFiles.concat(genPath(scripts, 'src'));
    testFiles.push('test/**/*.js');

    grunt.initConfig({
        path: {
            src: 'src',
            tmp: '.tmp',
            prod: 'dist'
        },
        concat: {
            js: {
                src: genPath(scripts, '<%= path.src %>'),
                dest: '<%= path.prod %>/js/app.js'
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['$', '_', 'namespace']
                }
            },
            apps: {
                files: {
                    '<%= path.prod %>/js/app.min.js': ['<%= path.prod %>/js/app.js']
                }
            }
        },

        jade: {
            options: {
                pretty: true,
                basedir: '<%= path.src %>/jade'
            },
            compile: {
                options: {
                    data: {
                        libs: libs,
                        sc: scripts,
                        dummy: dummy
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>/jade',
                    src: '**/!(_)*.jade',
                    dest: '<%= path.tmp %>',
                    ext: '.html'
                }]
            },
            prod: {
                options: {
                    data: {
                        prod: true,
                        libs: libs,
                        sc: scripts,
                        dummy: dummy
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>/jade',
                    src: '**/!(_)*.jade',
                    dest: '<%= path.prod %>',
                    ext: '.html'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                genPath(scripts, '<%= path.src %>'),
            ]
        },
        compass: {
            dev: {
                options: {}
            },
            prod: {
                options: {
                    environment: 'production',
                    force: true
                }
            }
        },
        clean: {
            prod:['<%= path.prod %>/**/*'],
            bower:['<%= path.src %>/js/lib/*']
        },
        copy: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>/js',
                    src:['**/*.js'],
                    dest: '<%= path.tmp %>/js'
                }]
            },
            jsprod: {
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>/js',
                    src:['lib/*.js'],
                    dest: '<%= path.prod %>/js'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>/img',
                    src:['**/*'],
                    dest: '<%= path.tmp %>/img'
                }]
            },
            imgprod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.src %>/img',
                        src:['**/*'],
                        dest: '<%= path.prod %>/img'
                    }
                ]
            },
            pie: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.src %>/pie',
                        src:['**/*'],
                        dest: '<%= path.tmp %>/pie'
                    }
                ]
            },
            pieprod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.src %>/pie',
                        src:['**/*'],
                        dest: '<%= path.prod %>/pie'
                    }
                ]
            },

        },
        connect: {
            proxies: [{
                context: '/api',
                host: 'localhost',
                port: '3000',
                https: false,
                changeOrigin: false
            }],
            server: {
                options: {
                    port: 9000,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost',
                    open: true,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            proxySnippet,
                            mountFolder(connect, '.tmp/')
                        ];
                    }
                }
            }
        },
        esteWatch: {
            options: {
                dirs: ['src/**'],
                livereload: {
                    enabled: false,
                    port: 35729,
                    extensions: [ 'html', 'css', 'js']
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
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%= path.src %>',
                    layout: function(type, component) {
                        var makeDir = true,
                            p = {
                                css: '/css',
                                img: '/img/lib',
                                js: '/js/lib'
                            },
                            tmp,
                            _component;
                        tmp = component.split('/');

                        _component = tmp[1];

                        if(makeDir) {
                            if(type === 'css') {
                                return pat.join(_component, p.css);
                            } else if(type === 'img') {
                                return pat.join(_component, p.img);
                            } else {
                                return pat.join(_component, p.js);
                            }
                        } else {
                            return _component;
                        }
                    },
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                options: {
                    files: testFiles,
                    exclude: ['src/js/main.js']
                }
            }
        }
    });

    var taskName;
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    grunt.registerTask('server', function() {
        grunt.task.run([
            'configureProxies',
            'connect:server',
            'esteWatch'
        ]);
    });

    grunt.registerTask('default', function() {
        grunt.task.run([
            'jshint:all',
            'jade:compile',
            'copy:js',
            'copy:img',
            'copy:pie',
            'compass:dev',
            'server'
        ]);
    });


    grunt.registerTask('build', function() {
        grunt.task.run([
            'jshint',
            'clean:prod',
            'jade:prod',
            'concat:js',
            'uglify',
            'copy:jsprod',
            'copy:imgprod',
            'copy:pieprod',
            'compass:prod'
        ]);
    });

    grunt.registerTask('bi', [
        'bower:install'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);
};


//-----------------------
// Private Methods
//-----------------------

/**
 * [generate filesPath]
 * @param  {[Array]} arr  [file-path]
 * @param  {[type]} head [ファイルパスに付加するパス]
 * @param  {[boolean]} detach [trueの時、headで指定した文字列を取り除いたファイルパスを返すようになります]
 * @return {[type]}      []
 */
function genPath(arr, head, detach) {
    var i=0, len = arr.length;
    var isDetach = detach?true:false;
    var res = [],
        _h = head || '';
    var reg = new RegExp(head);
    if(!len) return [];
    if(isDetach) {
        for(;i<len;i++) {
            if(reg.test(res[i])) {
                res[i] = arr[i].split(head)[1];
            } else {
                res[i] = arr[i];
            }
        }
    } else {
        for(;i<len;i++) {
            res[i] = _h + arr[i];
        }
    }
    return res;
}
