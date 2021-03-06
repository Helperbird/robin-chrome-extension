var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var chalk = require('chalk');
var logger = require('gulp-logger');
var rename = require('gulp-rename');


gulp.task('css', function() {
  gulp.src('assets/css/*/*')
    .pipe(minifyCSS({
      keepSpecialComments: 1
    }))
    .pipe(logger({
      before: 'Compressing Css ',
      after: 'Compressing finished!',
      extname: '.min.css',
      showChange: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))

  .pipe(gulp.dest('./assets/dist/css'));
})

gulp.task('fonts', function() {
  gulp.src('assets/fonts/*.*')
    .pipe(logger({
      before: 'Moving Fonts ',
      after: 'Moving finished!',
      extname: '',
      showChange: true
    }))

  .pipe(gulp.dest('./assets/dist/fonts'));
})


gulp.task('less', function() {
  gulp.src('./assets/less/style.less') // path to your file
    .pipe(less())
    .pipe(gulp.dest('./assets/dist/css/'));
});

gulp.task('lessPop', function() {
  gulp.src('./assets/less/popup.less') // path to your file
    .pipe(less())
    .pipe(gulp.dest('./assets/dist/css/'));
});

gulp.task('scripts', function() {
  gulp.src('assets/js/*')
    .pipe(uglify({
      preserveComments: 'all'
    }))
    .pipe(logger({
      before: 'Starting Compressing Javascript',
      after: 'Compressing complete!',
      extname: '.js',
      showChange: true
    }))

  .pipe(rename({
    suffix: '.min'
  }))

  .pipe(gulp.dest('./assets/dist/js'));
})


gulp.task('build', ['less', 'lessPop', 'css', 'fonts', 'scripts']);


gulp.task('default', ['build']);
