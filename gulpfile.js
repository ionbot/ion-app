const gulp = require("gulp");
const run = require("gulp-run");
const zip = require("gulp-zip");
const fs = require("fs");
const { version } = require("./lerna.json");
let package = require("./packages/bot/package.json");

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

gulp.task("dist", (cb) => {
  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  gulp.src("packages/bot/build/**").pipe(gulp.dest("dist/"));
  gulp.src("app.json").pipe(gulp.dest("dist/"));
  gulp.src("README.md").pipe(gulp.dest("dist/"));
  gulp.src("packages/dashboard/build/**").pipe(gulp.dest("dist/dashboard"));

  const version = require("./lerna.json").version;

  delete package["devDependencies"];
  package["version"] = version;

  fs.writeFileSync(
    "dist/package.json",
    JSON.stringify(
      {
        ...package,
      },
      null,
      2
    )
  );

  cb();
});

gulp.task("release", (cb) => {
  gulp
    .src("dist/**")
    .pipe(zip(`ion-release-v${version}.zip`))
    .pipe(gulp.dest("."));
});
exports.default = gulp.series("build-client", "build-server", "dist");
