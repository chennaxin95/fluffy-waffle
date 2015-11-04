// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Copy HTML Templates
gulp.task('templates', function() {
    return gulp.src('html/templates/*.html')
        .pipe(gulp.dest('dist/html'));
});

// Copy Server Scripts
gulp.task('serverjs', function() {
    return gulp.src('js/server/*.js')
        .pipe(gulp.dest('dist/js/server'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'js/client/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/client'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/client'));
});

// Copy Data Content
gulp.task('contents', function() {
    return gulp.src('data/*.json')
        .pipe(gulp.dest('dist/data'));
});

// gulp.task('lib_uikit', function() {
//     return gulp.src(['node_modules/uikit/dist/**/*'])
//         .pipe(gulp.dest('dist/lib/uikit'));
// })

gulp.task('lib_react', function() {
    return gulp.src(['node_modules/react/dist/**/*'])
        .pipe(gulp.dest('dist/lib/react'));
})

gulp.task('lib_react_dom', function() {
    return gulp.src(['node_modules/react-dom/dist/**/*'])
        .pipe(gulp.dest('dist/lib/react-dom'));
})

gulp.task('libraries', ['lib_react', 'lib_react_dom']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/client/*.js', ['lint', 'scripts']);
    gulp.watch('js/server/*.js', ['serverjs']);
    gulp.watch('data/*.json', ['contents']);
    gulp.watch('html/templates/*.html', ['templates']);
    // gulp.watch('node_modules/uikit/package.json', ['lib_uikit']);
    gulp.watch('node_modules/react/package.json', ['lib_react', 'lib_react_dom']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'serverjs', 'contents', 'templates', 'watch']);