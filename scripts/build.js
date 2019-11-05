import cp from "child_process";
import path from "path";
import util from "util";
// eslint-disable-next-line import/no-extraneous-dependencies
import fse from "fs-extra";

const exec = util.promisify(cp.exec);

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, "../dist/", path.basename(file));
  await fse.copy(file, buildPath);
}

async function createPackageFile() {
  const packageData = await fse.readFile(
    path.resolve(__dirname, "../package.json"),
    "utf8",
  );
  const { name, version, dependencies } = JSON.parse(packageData);
  const newPackageData = {
    name,
    version,
    dependencies,
    main: "./index.js",
    private: true,
  };
  const buildPath = path.resolve(__dirname, "../dist/package.json");
  await fse.writeFile(
    buildPath,
    JSON.stringify(newPackageData, null, 2),
    "utf8",
  );
  return newPackageData;
}

async function run() {
  const distDir = path.resolve(__dirname, "../dist/");
  await exec("find . -name '*.spec.js*' -delete", { cwd: distDir });
  await exec("find . -name '*.snap' -delete", { cwd: distDir });
  await exec("find . -name '*.md' -delete", { cwd: distDir });
  await exec("find . -name '__snapshots__' -delete", { cwd: distDir });
  await Promise.all(["README.md", "CHANGELOG.md"].map(file => copyFile(file)));
  const packageData = await createPackageFile();
  await exec("npm pack", { cwd: distDir });
  const buildTarBall = `grail-components-${packageData.version}.tgz`;
  console.info("Built NPM package:", `dist/${buildTarBall}`);
}

run();
