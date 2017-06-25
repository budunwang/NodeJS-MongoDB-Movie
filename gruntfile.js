module.exports = function(grunt) {

    grunt.initConfig({
        watch:{
            jade: {
                files:['views/**'],
                options:{
                    livereload:true
                }
            },
            js: {
                files:['public/js/**','models/**/*.js', 'schemas/**/*.js'],
                options:{
                    livereload:true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoreFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    })

    // 加载热更新插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 加载进入文件修改热更新插件
    grunt.loadNpmTasks('grunt-nodemon');
    // 加载慢任务开发，例如SASS/LESS编译
    grunt.loadNpmTasks('grunt-concurrent');

    // 定义产生错误，不中断任务
    grunt.option('force', true);
    // 定义默认任务
    grunt.registerTask('default', ['concurrent']);

}

