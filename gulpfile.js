'user strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
const del = require('del');


gulp.task('clean', function() {
//  console.log("clean public");
  return del(['public']);
})

gulp.task('lib', function() {
  return gulp.src([
    'source/libs/angular.min.js',
    'source/libs/*.js'])
  .pipe(debug({title: 'src'}))
  .pipe(concat("lib.js"))
  .pipe(debug({title: 'concat'}))
  .pipe(uglify({ mangle: false }))
  .pipe(debug({title: 'uglify'}))
  .pipe(gulp.dest('public/lib'));
})

gulp.task('js', function() {
  return gulp.src([
    '!source/libs/*.js',
    'source/**/*.module.js',
    'source/**/*.js'
  ])
//  .pipe(debug({title: 'src'}))
  .pipe(babel())
  .pipe(debug({title: 'babel'}))
  .pipe(concat("script.js"))
  .pipe(debug({title: 'concat'}))
  .pipe(uglify(/*{ mangle: false }*/))
  .pipe(debug({title: 'uglify'}))
  .pipe(gulp.dest('public/js'));
})


gulp.task('html', function() {
  return gulp.src('source/**/*.html' /*, {since : gulp.lastRun('html')}*/)

  .pipe(newer('public')) //Только обновленные файлы

  .pipe(debug({title: 'src'}))
  .pipe(gulp.dest('public'));
})




gulp.task('css', function() {
  console.log('task css');

  return gulp.src('source/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'src'}))
    .pipe(concat("style.css"))
    .pipe(debug({title: 'concat'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
})


gulp.task('build', ['lib', 'html', 'css', 'js'], function() {
  gulp.watch('source/lib/*.js', ['lib']);
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/css/*.css', ['css']);
  gulp.watch('source/**/*.js', ['js']);
});
//gulp.task('build', ['html', 'css', 'js']);
