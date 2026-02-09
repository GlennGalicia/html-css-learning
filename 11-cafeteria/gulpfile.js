const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

function css(done) {
   // Compilar SaSS

   src('src/scss/app.scss')    // 1. Identificar archivo
      .pipe(sass({ outputStyle: 'expanded' })) // 2. Compilar
      .pipe(postcss([autoprefixer()])) // 3. Agregar prefijos
      .pipe(dest('build/css'))  // 3. Guardar archivo .css

   done()
}

function dev() {
   // Identifica cambios en el archivo y lo compila
   watch('src/scss/**/*.scss', css)
}
// Serie - inicia una tarea despues de otra
// Parallel - inicia varias tareas al mismo tiempo
exports.default = series(css, dev);
