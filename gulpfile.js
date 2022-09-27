import gulpVar from 'gulp';
const { task, src, dest, watch, series } = gulpVar;
import gulpConnect from 'gulp-connect';
const { server, reload } = gulpConnect;
import gulpSource from 'gulp-sourcemaps';
const { init, write } = gulpSource
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import prefixer from 'gulp-autoprefixer';
import ts from 'gulp-typescript';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
//************************************* Start Tasks ******************************************************/
// html task
task("html", () => {
    return src('src/pug-js/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(dest('.'));
});
// css task
task("css", () => {
    return src('src/css/main.scss')
        .pipe(init())
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(prefixer('last 2 versions'))
        .pipe(write('.'))
        .pipe(dest('dist/css'))
})
// js task
task("js", () => {
    return src('src/ts/index.ts')
        .pipe(init())
        .pipe(ts({
            target: "es2016",
            strict: true,
            noImplicitAny: true,
            removeComments: true,
            outFile: 'main.js',
        }))
        .pipe(uglify())
        .pipe(write('.'))
        .pipe(dest('dist/js'))
});
// compress images
task("imgSquash", () => {
    return src("src/assets/images/*")
        .pipe(imagemin())
        .pipe(dest("dist/images"));
});
// connect task
task("connect", () => {
    server({
        root: './dist',
        livereload: true,
        port: 8000
    });
});
// watch task
task("watch", () => {
    reload();
    watch('src/pug-js/**/*.pug', series(['html']));
    watch('src/css/**/*.scss', series(['css']));
    watch('src/ts/*.ts', series(['js']));
    watch('src/assets/images/*', series('imgSquash'));
});

// Default task is WATCH
task('default', series('imgSquash', 'watch'));