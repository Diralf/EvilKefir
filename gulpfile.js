'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var includeSources = require('gulp-include-source');

gulp.task('default', function () {

    return gulp.src('app/**/*.js')
        .pipe(concat('dist.js'))
        .pipe(ngmin())
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
    return gulp.src( './_index.html' )
        .pipe( includeSources() )
        .pipe(concat('index.html'))
        .pipe( gulp.dest('./') );
});