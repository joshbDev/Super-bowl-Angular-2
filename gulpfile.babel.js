import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import fs from 'fs';
import mkdirp from 'mkdirp';


gulp.task('serve', [], () => {
  mkdirp('bundle/');
  return browserify({debug: true})
    .transform(babelify)
    .require(['./src/index.js'], { entry: true })
    .bundle()
    .on('error', (err) => {console.log(err)})
    .pipe(fs.createWriteStream('bundle/my_bundle.js'))
  })

gulp.task('watch', ['serve'], () => {
  gulp.watch('src/*', ['serve']);
  });