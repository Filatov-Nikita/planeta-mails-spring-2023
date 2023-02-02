const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const rename = require('gulp-rename');

const watchedFiles = 'views/**/*.pug';
const viewsPath = 'views/**/mail-*.pug';
const distPath = 'dist/';

exports.pug = function compilePug() {
  return src(viewsPath)
  .pipe(pug())
  .pipe(rename({ extname: '.html' }))
  .pipe(dest(distPath));
}

exports.default = function () {
  watch(watchedFiles, exports.pug);
}
