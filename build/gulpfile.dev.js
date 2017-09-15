var gulp = require('gulp'),
    minhtml = require('gulp-htmlmin'),
    mincss = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js');

var myDevConfig = Object.create(webpackConfig),
    devCompiler = webpack(myDevConfig);


function dev(){
    gulp.task('minhtml', function(){
        gulp.src('src/html/*.html')
            .pipe(minhtml({collapseWhitespace:true}))
            .pipe(gulp.dest('dist/html'));
        gulp.src('src/html/*/**.html')
            .pipe(minhtml({collapseWhitespace:true}))
            .pipe(gulp.dest('dist/html'))
    });

    gulp.task('sass', function(){
        gulp.src('src/sass/*.scss')
            .pipe(sass())
            .pipe(mincss())
            .pipe(autoprefixer({
                browsers:['last 2 versions','Android>=4.0','> 5% in CN','> 0.1%',"ie 6-8","Firefox < 20"]
            }))
            .pipe(gulp.dest('dist/css'))
    });

    gulp.task("build-js",function(callback) {
        devCompiler.run(function(err, stats) {
            if(err) throw new gutil.PluginError("webpack:build-js", err);
            gutil.log("[webpack:build-js]", stats.toString({
                colors: true
            }));
            callback();
        });
    });

    gulp.task('copy', function() {
        gulp.src('src/img/*')
            .pipe(gulp.dest('dist/img'));
        gulp.src('src/plugins/**/*')
            .pipe(gulp.dest('dist/plugins'));
    });

    gulp.task('watch', function (){
        gulp.watch(['src/**/*'],['minhtml','sass','build-js']);
    });

    gulp.task('dev', ['minhtml','sass','build-js','copy','watch']);
}

module.exports = dev;