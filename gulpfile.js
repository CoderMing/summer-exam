let gulp = require('gulp'),
	less = require('gulp-less');


gulp.task('default', _=> {
	gulp.watch('./**/*.less', e => {
		console.log(e);
		gulp.src(e.path).pipe(less()).pipe(gulp.dest(e.path.replace(/((?!.*?\/)*)([^\/]*?.less)/, '$1')));
		console.log("213");
	})
})