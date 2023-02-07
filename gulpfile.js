import gulp from 'gulp';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import imagemin, { mozjpeg } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import inlineCss from 'gulp-inline-css';
import bsync from 'browser-sync';
import { deleteAsync } from 'del';

const browserSync = bsync.create();

const viewsPath = 'src/views/**/mail-*.pug';
const imagesPath = 'src/images/**/*';
const distPath = './dist/';

function delImages() {
  return deleteAsync(distPath + 'images');
}

export async function images() {
  await delImages();
  return gulp.src(imagesPath)
  .pipe(
    imagemin([
      mozjpeg({ quality: 70 }),
      imageminPngquant({ speed: 5, quality: [0.6, 0.7] })
    ])
  )
  .pipe(gulp.dest(distPath + 'images'));
}

export function compilePug() {
  return gulp.src(viewsPath)
  .pipe(pug({ pretty: true }))
  .pipe(rename({ extname: '.html' }))
  .pipe(inlineCss({ removeLinkTags: false, preserveMediaQueries: true  }))
  .pipe(gulp.dest(distPath))
  .pipe(browserSync.stream({ match: '**/*.html' }));
}

export default function () {
  browserSync.init({
    server: {
      baseDir: distPath
    }
  });

  gulp.watch('src/views/**/*', compilePug);
  gulp.watch('src/images/**/*.{jpeg,png}', images);
}
