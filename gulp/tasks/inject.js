'use strict';
const argv = require('yargs').argv;
const gulp = require('gulp');
const inject = require('gulp-inject');
const when = require('gulp-if');

// 'gulp inject:head' -- injects our style.css file into the head of our HTML
gulp.task('inject:head', () =>
  gulp.src('.tmp/src/_includes/head.html')
    .pipe(inject(gulp.src('.tmp/assets/stylesheets/*.css'), {ignorePath: '.tmp', addPrefix: when(!argv.prod, '/', 'email-docs' )}))
    .pipe(gulp.dest('.tmp/src/_includes'))
);

// 'gulp inject:footer' -- injects our index.js file into the end of our HTML
gulp.task('inject:footer', () =>
  gulp.src('.tmp/src/_layouts/default.html')
    .pipe(inject(gulp.src('.tmp/assets/scripts/*.js'), {ignorePath: '.tmp', addPrefix: when(!argv.prod, '/', 'email-docs')}))
    .pipe(gulp.dest('.tmp/src/_layouts'))
);
