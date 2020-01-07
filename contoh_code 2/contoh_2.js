const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const browserSynnc = require('browser-sync').create();
const sass = require('gulp-sass');

//fungsi memperkecil file css
gulp.task('minifyCss', function () {
   
   return gulp.src('./src/assets/sass/*.css', { matchBase: './src/assets/css/' })
      .pipe(cssnano())
      .pipe(gulp.dest('./src/assets/css/'))
      .pipe(browserSynnc.stream());
});

//convert sass variable ke css variable
gulp.task('transformSass', function () {

   return gulp.src('./src/assets/sass/**/*.scss', { matchBase: './src/assets/sass/' })
      .pipe(sass().on('error', () => sass.logError()))
      .pipe(gulp.dest('./src/assets/css/'))
      .pipe(browserSynnc.stream());
});

//live reload
gulp.task('watchFile', function () {

   browserSynnc.init({
      server: {
         baseDir: './'
      }
   });

   //lihat file jika terjadi perbubahan pada file sass
   gulp.watch('./src/assets/sass/**/*.scss', gulp.series('transformSass'));
   //reload browser jika ada nilai yang terpengaruh
   gulp.watch('./index.html').on('change', browserSynnc.reload);
   //error handling jika terjadi error
   gulp.watch('./index.html').on('error', (err) => console.log(err.stack));

});

//menjalankan fungsi gulp dengan cara parallel
gulp.task('default', gulp.parallel('transformSass','minifyCss','watchFile'));