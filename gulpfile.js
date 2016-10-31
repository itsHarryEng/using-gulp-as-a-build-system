var gulp = require("gulp"),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync');

// Compile SASS to CSS
gulp.task('css', function() {
    // compile sass
    // output file to a dist/
    return gulp.src(['./src/sass/main.scss'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.cssmin())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// JavaScript
gulp.task('js', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './src/js/magic.js',
        './src/js/admin.js'
    ])
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.concat('all.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

// HTML
gulp.task('html', function() {
    return gulp.src([
        './src/*.html'
    ])
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

// Watch for file changes and run tasks
gulp.task('watch', function() {
    gulp.watch(['./src/sass/*.scss'], ['css']);
    gulp.watch(['./src/js/*.js'], ['js']);
    gulp.watch(['./src/*.html'], ['html']);
});

// Serve our app through browsersync
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
});

// Startup
gulp.task('default', ['css', 'js', 'html', 'watch', 'serve']);