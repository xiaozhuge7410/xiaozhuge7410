var gulp = require('gulp'),
    minhtml = require('gulp-htmlmin'),
    mincss = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    md5 = require('gulp-md5-plus'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js');

var myDevConfig = Object.create(webpackConfig),
    devCompiler = webpack(myDevConfig);

function prod(){
    gulp.task('minhtml', function(){
        gulp.src('src/html/*.html')
            .pipe(minhtml({collapseWhitespace:true}))
            .pipe(gulp.dest('../dist/html'));
        gulp.src('src/html/*/**.html')
            .pipe(minhtml({collapseWhitespace:true}))
            .pipe(gulp.dest('dist/html'))
    });

    gulp.task("clean-css", function(){
        gulp.src('dist/css/*.css')
            .pipe(clean());
    });

    gulp.task('sass', ['clean-css'],function(){
        gulp.src('src/sass/*.scss')
            .pipe(sass())
            .pipe(mincss())
            .pipe(autoprefixer({
                browsers:['last 2 versions','Android>=4.0','> 5% in CN','> 0.1%',"ie 6-8","Firefox < 20"]
            }))
            .pipe(gulp.dest('dist/css'))
            .pipe(md5(10,'dist/html/**/*.html'))
            .pipe(gulp.dest('dist/css'))
    });


    gulp.task("clean-js", function(){
        gulp.src('dist/js/*.js')
            .pipe(clean());
    });

    gulp.task("build-js", ['clean-js'],function(callback) {
        devCompiler.run(function(err, stats) {
            if(err) throw new gutil.PluginError("webpack:build-js", err);
            gutil.log("[webpack:build-js]", stats.toString({
                colors: true
            }));
            callback();
        });
    });

    gulp.task("md5-js",["build-js"],function(){
        gulp.src('dist/js/*.js')
            .pipe(md5(10,'dist/html/**/*.html'))
            .pipe(gulp.dest('dist/js'))
    });

    gulp.task('copy', function() {
        gulp.src('src/img/*')
            .pipe(gulp.dest('dist/img'));
        gulp.src('src/plugins/**/*')
            .pipe(gulp.dest('dist/plugins'));
    });

    gulp.task('build', ['minhtml','sass','md5-js','copy']);

}


module.exports = prod;