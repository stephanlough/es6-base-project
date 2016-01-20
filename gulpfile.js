var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

// show a native system notification on errors
var notifier = function(error){
    var title = 'Gulp Error';
    var message = error.message;
    var lines = error.message.split('\n');

    $.util.log(error.message);

    // skip double error in babelify
    if (message.match(/no writecb/i)) return;

    // try to make the message more concise
    if (error.plugin === 'gulp-stylus') {
        title = (lines[0].match(/[^\/]*$/i) || [''])[0];
        message = lines[5] + '\n' + lines.slice(-3).join(' ');
    } else {
        // error probably from browserify
        var tokens = lines[0].match(/([^\/:]*):(.*)$/i);
        if (tokens && tokens.length > 2) {
            title = tokens[1];
            message = tokens[2];
        }
    }

    $.notify.onError({
        title: title,
        message: message,
    }).apply(this, arguments);
};


////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////

gulp.task('css', function(){
    return gulp.src('www/media/main.styl')
        .pipe($.stylus({use:[require('nib')()],compress:false,'include css':true}))
        .on('error',notifier)
        .pipe(gulp.dest('www/media/'))
        .pipe(browserSync.reload({stream:true}));
});


////////////////////////////////////////////////////////////////////////////////
// JS
////////////////////////////////////////////////////////////////////////////////

function createBundler(watch) {
    watchify.args.debug = true;
    var bundler = browserify('./www/js/app/main.js', watchify.args);

    if (watch) {
        bundler = watchify(bundler);
        bundler.on('update', function(){ bundle(bundler) });
        bundler.on('log', function(message){ $.util.log(message) });
    }

    bundler.transform(babelify.configure({
        sourceMapRelative: 'www/js/app',
        presets: ['react', 'es2015'],
        plugins: ['transform-class-properties'],
    }));

    return bundler;
}

function bundle(bundler) {
    $.util.log('Compiling js...');

    return bundler.bundle()
        .on('error',notifier)
        .pipe(source('main.bundle.js'))
        .pipe(gulp.dest('./www/js/'));
}

gulp.task('js', function(){
    return bundle(createBundler());
});

gulp.task('js-watch', function(){
    return bundle(createBundler(true));
});


////////////////////////////////////////////////////////////////////////////////
// BUILD / WATCH
////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['css', 'js']);

gulp.task('watch', ['css', 'js-watch'], function(){

    gulp.watch('www/media/*.styl', ['css']);

    gulp.watch([
        'www/*.html',
        'www/js/main.bundle.js',
        'www/js/vendor/**/*',
    ]).on('change', browserSync.reload);
});

gulp.task('serve', ['watch'], function(){
    browserSync.init({
        ui: false,
        ghostMode: false,
        startPath: '?dev',
        server: { baseDir: 'www' }
    });
});

gulp.task('default', ['serve']);
