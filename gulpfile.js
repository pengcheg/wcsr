'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');

/*
 * 语法检查
 */
gulp.task('jshint', function() {
    return gulp.src('./js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*
 * 压缩js
 */
gulp.task('compress', function() {
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(minify({
            ext: {
                src: '-dev.js',
                min: '.js'
            },
            noSource: true,
            exclude: ['tasks'],
            ignoreFiles: ['*.combo.js', '*-min.js', '*.min.js']
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/js'))
});
/*
 * 复制js
 */
gulp.task('copyjs', function() {
    gulp.src('js/**/*.js')
        .pipe(gulp.dest('./dist/js'))
});
/*
 * 编译sass 
 * nested 嵌套格式
 * expanded 缩进模式
 * compact 每条一行
 * compressed 单行
 */
gulp.task('sass', function() {
    return gulp.src(['./sass/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:prod', function() {
    return gulp.src(['./sass/**/*.scss'])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

/*
 *  优化图片
 */
gulp.task('image', function() {
    gulp.src('./images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'));
});

/*
 * 移动字体文件
 */
gulp.task('copyfonts', function() {
    gulp.src('./fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});
/*
 * 清除编译文件
 */
gulp.task('clean', function() {
    return gulp.src(['./dist/**/*'], { read: false })
        .pipe(clean({ force: true }));
});
/*
 * 监听js和css的改变
 */
gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./js/**/*.js', ['copyjs']);
    gulp.watch('./images/**/*', ['image']);
});

/*
 * 构建项目并监听 用于开发
 */
gulp.task('default', ['sass', 'copyjs', 'image', 'copyfonts', 'watch']);
gulp.task('prod', ['sass:prod', 'copyjs', 'image', 'copyfonts']);
