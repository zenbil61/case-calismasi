var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./css/*.scss') // ana klasörümüz içerisinde .scss dosyalarını
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css')); // ana klasör içerisinde css klasörü içerisinde çıkarı
});

gulp.task("watch", function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./css/*.scss", gulp.series("sass")); 
    gulp.watch("./css/*.css").on('change', browserSync.reload);

    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});