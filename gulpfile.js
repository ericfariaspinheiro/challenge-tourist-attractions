const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
// const browserify = require("browserify");
// const babelify = require("babelify");
// const source = require("vinyl-source-stream");
// const buffer = require("vinyl-buffer");
// const uglify = require("gulp-uglify");

function styles() {
  return src("src/styles/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest("dist"));
}

// function scripts() {
//   return browserify("src/scripts/app.js")
//     .transform(
//       babelify.configure({
//         presets: ["@babel/preset-env"],
//       })
//     )
//     .bundle()
//     .pipe(source("bundle.js"))
//     .pipe(buffer())
//     .pipe(uglify())
//     .pipe(dest("dist"));
// }

function sentinel() {
  watch("src/styles/**/*.scss", { ignoreInitial: false }, styles);
  // watch("src/scripts/**/*.js", { ignoreInitial: false }, scripts);
}

exports.sentinel = sentinel;
