var gulp = require('gulp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    open = require('gulp-open');

var outputDir = ".";

gulp.task("clean", function() {
  return gulp.src([outputDir + "/*.html", outputDir + "/*.css"])
    .pipe(clean());
});

gulp.task("jade", function() {
  return gulp.src("src/jade/*.jade")
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task("reload", function() {
  return connect.reload();
});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname + "/.."],
        port: 3000,
    livereload: true
  });
});

gulp.task("watch", function() {
  gulp.watch("src/jade/*.jade", ["jade"]);
  gulp.watch("*.css", ["reload"]);
  gulp.watch("src/sass/*.scss", ["sass"]);
});

gulp.task("sass", function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({
        style: 'compact'
    }))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('open', function () {
  var options = {
    url: 'http://localhost:3000/polymer-date-picker/demo.html'
  };

  gulp.src('./demo.html')
  .pipe(open('', options));
});

gulp.task("default", ["jade", "sass", "watch", "connect", "open"]);

gulp.task("build", ["jade", "sass"]);