const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const browserSynnc = require('browser-sync').create();
const ugly = require('gulp-uglify');
const babel = require('gulp-babel');

//fungsi memperkecil file css
function minifyCss() {
   
   return gulp.src('./src/assets/sass/*.css', { matchBase: './src/assets/css/' })
   .pipe(cssnano())
   .pipe(gulp.dest('./src/assets/css/'))
   .pipe(browserSynnc.stream());
}

//fungsi memperkecil file javascript
function minifyJs() {

   return gulp.src('./src/assets/js/**/*.js', { matchBase: './src/assets/js/' })
      .pipe(ugly({compress: true}))
      .pipe(gulp.dest('./src/assets/css/'))
      .pipe(browserSynnc.stream());
}

// //fungsi untuk transformasi javascript sintak ke javascript es2015
function transfromJS() {

   return gulp.src('./src/assets/js/*.js')
      .pipe(babel({
         presets: ["@babel/preset-env"],
         plugins: ["@babel/plugin-transform-arrow-functions"],
         highlightCode: true
      })).pipe(gulp.dest('./dist/'));
}


//menjalankan gulp dengan cara one by one
exports.minifyjs = minifyJs;
exports.minifycss = minifyCss;
exports.transformjs = transfromJS;

//menjalankan gulp dengan cara one by series
gulp.series(minifyJs);
gulp.series(minifyCss);
gulp.series(transfromJS);

//menjalankan fungsi gulp dengan cara parallel
gulp.task('default',gulp.series(transfromJS, gulp.parallel(minifyJs, minifyCss)));