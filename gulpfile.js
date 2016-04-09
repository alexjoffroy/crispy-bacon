'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

var name = require('./package.json').name,
    input = 'src/index.scss',
    output = 'dist',
    autoprefixerOptions = {
      browsers: ['last 2 versions']
    };

gulp.task('dist:min', function () {
  return gulp
    .src( input )
    .pipe( sass({ outputStyle: 'compressed' }).on('error', sass.logError) )
    .pipe( autoprefixer(autoprefixerOptions) )
    .pipe( rename(name + '.min.css') )
    .pipe( gulp.dest(output) )
    .pipe( livereload() );
});

gulp.task('dist', function () {
  return gulp
    .src( input )
    .pipe( sass().on('error', sass.logError) )
    .pipe( autoprefixer(autoprefixerOptions) )
    .pipe( rename(name + '.css') )
    .pipe( gulp.dest(output) )
    .pipe( livereload() );
});

gulp.task('build', ['dist', 'dist:min']);

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/**/*.scss', ['build']);
});