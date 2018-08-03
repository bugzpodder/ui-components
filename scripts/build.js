import cp from "child_process";
import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import fse from "fs-extra";

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, "../dist/", path.basename(file));
  await fse.copy(file, buildPath);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(__dirname, "../package.json"), "utf8");
  const { name, version, dependencies } = JSON.parse(packageData);
  // This is not published currently and needs to be removed from dependencies.
  delete dependencies["@grail/lib"];
  const newPackageData = {
    name,
    version,
    dependencies,
    main: "./index.js",
    private: true,
  };
  const buildPath = path.resolve(__dirname, "../dist/package.json");
  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), "utf8");
  return newPackageData;
}

async function run() {
  const distDir = path.resolve(__dirname, "../dist/");
  await cp.exec("find . -name '*.spec.js' -delete", { cwd: distDir });
  await cp.exec("find . -name '*.snap' -delete", { cwd: distDir });
  await cp.exec("find . -name '*.md' -delete", { cwd: distDir });
  await cp.exec("find . -name '__snapshots__' -delete", { cwd: distDir });
  await Promise.all(["README.md", "CHANGELOG.md"].map(file => copyFile(file)));
  const packageData = await createPackageFile();
  await cp.exec("npm pack", { cwd: distDir });
  console.info(
    `\n\nTo upload to s3, run:\n\ngrail-aws tickets/eng/dev/aws s3 cp dist/grail-components-${
      packageData.version
    }.tgz s3://grail-ui/${packageData.version}/`,
  );
  console.info(
    `\n\nTo deploy styleguide to aws, run:\n\nyarn styleguide:build && grail-aws tickets/eng/dev/aws s3 sync styleguide s3://grail-ui-styleguide/${
      packageData.version
    }/\n\n`,
  );
}

run();
