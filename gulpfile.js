const gulp = require("gulp");
const run = require("gulp-run");
const zip = require("gulp-zip");
const fs = require("fs");
const { version } = require("./lerna.json");

const defaultSession = {
  apiId: 0,
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
  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  gulp.src("packages/bot/build/**").pipe(gulp.dest("dist/"));
  gulp.src("packages/bot/package.json").pipe(gulp.dest("dist/"));
  gulp.src("app.json").pipe(gulp.dest("dist/"));
  gulp.src("packages/dashboard/build/**").pipe(gulp.dest("dist/dashboard"));

  fs.writeFileSync("dist/session.json", JSON.stringify(defaultSession));
  fs.writeFileSync("dist/.env", `NODE_ENV=production\nMONGO=`);

  gulp
    .src("dist/**")
    .pipe(zip(`ion-release-v${version}.zip`))
    .pipe(gulp.dest("."));

  cb();
});

exports.default = gulp.series("build-client", "build-server");
