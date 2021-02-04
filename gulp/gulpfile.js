let gulp = require("gulp");
let sass = require("gulp-dart-sass");
let browserSync = require("browser-sync").create();
const $ = require("gulp-load-plugins")({
    scope: ["devDependencies"],
    pattern: "*",
});

gulp.task("clean", () => {
    return gulp.src("../build", { read: false, allowEmpty: true }).pipe($.clean({ force: true }));
});

gulp.task("sass", () => {
    return gulp.src("../src/css/main.scss").pipe(sass()).pipe(gulp.dest("../build/res/"));
});

gulp.task("sass.watch", () => {
    return gulp
        .src("../src/css/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("../build/res/"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
});

gulp.task("html", () => {
    return gulp
        .src("../src/html/index.html")
        .pipe(
            $.htmlmin({
                caseSensitive: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyJS: true,
                minifyCSS: true,
                quoteCharacter: '"',
                useShortDoctype: true,
            })
        )
        .pipe($.htmlBeautify())
        .pipe(gulp.dest("../build/"));
});

gulp.task("html.watch", () => {
    return gulp
        .src("../src/html/index.html")
        .pipe(
            $.htmlmin({
                caseSensitive: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyJS: true,
                minifyCSS: true,
                quoteCharacter: '"',
                useShortDoctype: true,
            })
        )
        .pipe($.htmlBeautify())
        .pipe(gulp.dest("../build/"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
});

gulp.task("js", () => {
    return;
});

gulp.task("js.watch", () => {
    return;
});

gulp.task("browserSync", function() {
    return browserSync.init({
        server: {
            baseDir: "../build",
        },
    });
});

gulp.task("build", gulp.series(["clean", "sass", "html", "js"]));

gulp.task("watch", gulp.series(["build", "browserSync"]), () => {
    gulp.watch("../src/css/**/*.scss", gulp.series(["sass.watch"]));
    gulp.watch("../src/js/**/*.js", gulp.series(["js.watch"]));
    gulp.watch("../src/html/index.html", gulp.series(["html.watch"]));
});

gulp.task("default", gulp.series(["watch"]));