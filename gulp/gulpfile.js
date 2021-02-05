let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync").create();

const $ = require("gulp-load-plugins")({
    scope: ["devDependencies"],
    pattern: "*",
});

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

gulp.task("clean", () => {
    return gulp.src("../build", { read: false, allowEmpty: true }).pipe($.clean({ force: true }));
});

gulp.task("sass", () => {
    return gulp.src("../src/css/main.scss").pipe(sass()).pipe(gulp.dest("../build"));
});

gulp.task("sass.watch", () => {
    return gulp.src("../src/css/main.scss").pipe(sass()).pipe(gulp.dest("../build")).pipe(browserSync.stream());
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
        .pipe(gulp.dest("../build"));
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
        .pipe(gulp.dest("../build"))
        .pipe(browserSync.stream());
});

gulp.task("js", () => {
    return gulp
        .src("../src/js/main.js")
        .pipe($.webpackStream(requireUncached("./webpack.config.js")()))
        .pipe(gulp.dest("../build"));
});

gulp.task("js.watch", () => {
    return gulp
        .src("../src/js/main.js")
        .pipe(
            $.webpackStream(
                requireUncached("./webpack.config.js")({
                    watch: true,
                })
            )
        )
        .pipe(gulp.dest("../build"))
        .pipe(browserSync.stream());
});

gulp.task("build", gulp.series(["clean", gulp.parallel(["sass", "html", "js"])]));

gulp.task("watch", () => {
    browserSync.init({
        server: {
            baseDir: "../build",
        },
        notify: false,
    });
    gulp.watch("../src/css/**/*.scss", gulp.series(["sass.watch"]));
    gulp.watch("../src/js/**/*.js", gulp.series(["js.watch"]));
    gulp.watch("../src/html/index.html", gulp.series(["html.watch"]));
});

gulp.task("default", gulp.series(["build", "watch"]));