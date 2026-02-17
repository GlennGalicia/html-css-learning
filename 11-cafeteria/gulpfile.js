// CSS & SASS
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')

// Images
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(done) {
   // Compilar SaSS
   src('src/scss/app.scss')    // 1. Identificar archivo
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' })) // 2. Compilar
      .pipe(postcss([autoprefixer(), cssnano()])) // 3. Agregar prefijos y minificar css
      .pipe(sourcemaps.write('.'))
      .pipe(dest('build/css'))  // 3. Guardar archivo .css

   done()
}

function images() {
   // Carga la carpeta imagenes
   return src('src/img/**/*')
      .pipe(imagemin())
      .pipe(dest('build/img'))
}

function imgWebp() {
   // Convierte imagenes a formato .webp
   return src('src/img/**/*.{jpg}')
      .pipe(webp())
      .pipe(dest('build/img'))
}

function imgAvif() {
   // Convierte imagenes a formato .avif
   return src(['src/img/**/*.{png,jpg}', '!src/img/**/*.svg'])
      .pipe(avif({ quality: 50 }))
      .pipe(dest('build/img'))
}

function dev() {
   // Identifica cambios en el archivo y lo compila
   watch('src/scss/**/*.scss', css)
   watch('src/img/**/*', images)
}

// Serie - inicia una tarea despues de otra
// Parallel - inicia varias tareas al mismo tiempo
exports.css = css;
exports.dev = dev;
exports.images = images;
exports.imgWebp = imgWebp;
exports.imgAvif = imgAvif;
exports.default = series(images, imgWebp, css, dev);
