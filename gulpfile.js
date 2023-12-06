import { task, watch, src, dest, parallel } from "gulp";
import browserSync, { reload, stream } from "browser-sync";
const sass = require("gulp-sass")(require("sass"));
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import webpack from "webpack-stream";

task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });

  watch("dist/*.html").on("change", reload);
});

task("styles", function () {
  return src("src/scss/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist/css"))
    .pipe(stream());
});

task("watch", function () {
  watch("src/sass/**/*.+(scss|sass|css)", parallel("styles"));
  watch("dist/*.html").on("change", parallel("html"));
  watch("src/js/**/*.js").on("change", parallel("webpack"));
  watch("src/fonts/**/*").on("all", parallel("fonts"));
  watch("src/icons/**/*").on("all", parallel("icons"));
  watch("src/img/**/*").on("all", parallel("images"));
  watch("src/img/*").on("all", parallel("images"));
});

task("html", function () {
  return src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/"));
});

task("webpack", function () {
  return src("src/js/**/*.js")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(dest("dist/js"));
});

task("fonts", function () {
  return src("src/fonts/**/*").pipe(dest("dist/fonts")).pipe(stream());
});

task("icons", function () {
  return src("src/icons/**/*").pipe(dest("dist/icons")).pipe(stream());
});

task("images", function () {
  return src("src/img/**/*").pipe(dest("dist/img")).pipe(stream());
});

task(
  "default",
  parallel(
    "watch",
    "server",
    "styles",
    "webpack",
    "fonts",
    "icons",
    "html",
    "images"
  )
);
