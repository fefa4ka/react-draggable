var gulp = require('gulp');
var del = require('del');

var cleanTask = function(cb) {
  del(['./static']).then(function() {
    cb();
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;