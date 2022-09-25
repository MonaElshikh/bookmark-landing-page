const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    prefixer = require('gulp-autoprefixer'),
    ts = require('gulp-typescript'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug');
//************************************* Start Tasks ******************************************************/
// html task
gulp.task("html", () => {
    return gulp.src('src/pug-js/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('.'));
});
// css task
gulp.task("css", () => {
    return gulp.src('src/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(prefixer('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
})
// js task
gulp.task("js", () => {
    return gulp.src('src/ts/main.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: "es2016",
            strict: true,
            noImplicitAny: true,
            removeComments: true,
            outFile: 'main.js',
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});
// connect task
gulp.task("connect", () => {
    connect.server({
        root: './dist',
        livereload: true,
        port: 8000
    });
});
// watch task
gulp.task("watch", () => {
    connect.reload();
    gulp.watch('src/pug-js/**/*.pug', gulp.series(['html']));
    gulp.watch('src/css/**/*.scss', gulp.series(['css']));
    gulp.watch('src/ts/*.ts', gulp.series(['js']));
});

// Default task is WATCH
gulp.task('default', gulp.series('watch'));