const gulp = require("gulp");
const run = require("gulp-run");
const fs = require("fs");

const defaultSession = {
  apiId: "",
  apiHash: "",
  session: "",
};

gulp.task("build-server", (cb) => {
  run("npm run build:server").exec("", () => {
    cb();
  });
});

gulp.task("build-client", (cb) => {
  run("npm run build:client").exec("", () => {
    cb();
  });
});

gulp.task("release", (cb) => {
  fs.mkdirSync("dist");
  gulp.src("packages/bot/build/**").pipe(gulp.dest("dist/"));
  gulp.src("packages/bot/package.json").pipe(gulp.dest("dist/"));
  gulp.src("packages/dashboard/build/**").pipe(gulp.dest("dist/dashboard"));

  fs.writeFileSync("dist/session.json", JSON.stringify(defaultSession));

  cb();
});

exports.default = gulp.series("build-client", "build-server", "release");
