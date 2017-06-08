'user strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const del = require('del');

gulp.task('clean', function() {
  return del(['public']);
})

gulp.task('lib', function() {
  return gulp.src('lib/*.js')
  .pipe(debug({title: 'src'}))
//  .pipe(concat("lib.js"))
//  .pipe(debug({title: 'concat'}))
  .pipe(gulp.dest('public/lib'));
})

gulp.task('js', function() {
  return gulp.src(['source/**/*.module.js', 'source/**/*.js'])
  .pipe(debug({title: 'src'}))
  .pipe(concat("script.js"))
  .pipe(debug({title: 'concat'}))
  .pipe(gulp.dest('public/js'));
})


gulp.task('html', function() {
  return gulp.src('source/**/*.html')
  .pipe(debug({title: 'src'}))
  .pipe(gulp.dest('public'));
})


gulp.task('css', function() {
  console.log('task css');

  return gulp.src('source/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'src'}))
    .pipe(stylus())
    .pipe(debug({title: 'stylus'}))
    .pipe(concat("style.css"))
    .pipe(debug({title: 'concat'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
})


gulp.task('build', ['lib', 'html', 'css', 'js']);
