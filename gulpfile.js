var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');

gulp.task('default', function () {

    return gulp.src('app/**/*.js')
        .pipe(concat('dist.js'))
        .pipe(ngmin())
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('dist'));
});