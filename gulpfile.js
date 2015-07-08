var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var through2 = require('through2');

var browserSync = require('browser-sync').create();

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

// show a native system notification on errors
var notifier = function(error){
    var title = 'Gulp Error';
    var message = error.message;
    var lines = error.message.split('\n');

    console.log(error);

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

gulp.task('js', function(){

    var browserifyStream = through2.obj(function(file, enc, next) {
        var b = browserify({entries: [file.path], debug: true});

        b.transform('jstify');
        b.transform('babelify');

        return b.bundle(function(err, res) {
            if (err) return next(err);
            file.contents = res;
            next(err, file);
        });
    });

    return gulp.src(['./www/js/app/main.js'])
        .pipe(browserifyStream)
        .on('error',notifier)
        .pipe($.concat('main.bundle.js'))
        .pipe(gulp.dest('./www/js/'));

});

////////////////////////////////////////////////////////////////////////////////
// BUILD / WATCH
////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['css', 'js']);

gulp.task('watch', ['build'], function(){

    gulp.watch('www/media/*.styl', ['css']);

    gulp.watch('www/js/app/**/*', ['js']);

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
        startPath: '#dev',
        server: { baseDir: 'www' }
    });
});

gulp.task('default', ['serve']);
