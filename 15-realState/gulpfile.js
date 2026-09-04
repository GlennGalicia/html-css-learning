import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import webp from 'gulp-webp';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const { src, dest, watch, series } = gulp;
const server = browserSync.create();

// Dev CSS: sourcemaps, no minification, injected without a full page reload.
function cssDev() {
  return src('src/scss/app.scss', { sourcemaps: true })
    .pipe(sass({ api: 'modern' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css', { sourcemaps: '.' }))
    .pipe(server.stream());
}
// Production CSS: minified, no sourcemaps.
function cssProd() {
  return src('src/scss/app.scss')
    .pipe(sass({ api: 'modern' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('build/css'));
}

// `encoding: false` is required in Gulp 5 to avoid corrupting binary files.
function images() {
  return src('src/img/**/*', { encoding: false }).pipe(dest('build/img', { encoding: false }));
}

function webpVersion() {
  return src('src/img/**/*.{png,jpg}', { encoding: false })
    .pipe(webp({ quality: 50 }))
    .pipe(dest('build/img', { encoding: false }));
}

// Long-running task: `done` is declared so Gulp waits, and intentionally never
// called so the watchers keep the process alive.
function watchFiles(done) {
  server.init({
    server: './',
    host: '0.0.0.0',
    port: 3000,
    open: false,
    notify: false,
  });

  watch('src/scss/**/*.scss', cssDev);
  watch('src/img/**/*', series(images, webpVersion));
  watch('*.html').on('change', server.reload);
}

export const dev = series(images, webpVersion, cssDev, watchFiles);
export const build = series(images, webpVersion, cssProd);

export { cssDev, cssProd, images, webpVersion, watchFiles };
export default dev;
