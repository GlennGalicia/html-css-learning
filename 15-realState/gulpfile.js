import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
import webp from 'gulp-webp';

const sass = gulpSass(dartSass);
const { src, dest, watch, series } = gulp;

// Dev — sin cssnano, con sourcemaps
function css(done) {
  src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ api: 'modern' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'));

  done();
}

// Build — con cssnano, sin sourcemaps
function build(done) {
  src('src/scss/app.scss')
    .pipe(sass({ api: 'modern' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('build/css'));
  done();
}

function imagenes() {
  return src('src/img/**/*', { encoding: false }).pipe(dest('build/img', { encoding: false }));
}

function versionWebp() {
  return src('src/img/**/*.{png,jpg}', { encoding: false })
    .pipe(webp({ quality: 50 }))
    .pipe(dest('build/img', { encoding: false }));
}

function dev() {
  watch('src/scss/**/*.scss', css);
  watch('src/img/**/*', imagenes);
}

export { css, build, dev, imagenes, versionWebp };
export default series(imagenes, versionWebp, css, dev);
