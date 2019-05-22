const fs = require('fs');
const path = require('path');
const util = require('util');

const { kebabCase } = require('lodash');
const { parse, stringify } = require('@iarna/toml');

const labDir = path.join(__dirname, '../lab');
const files = {
  'Cargo.toml': require('./templates/Cargo.toml.js'),
  'index.html': require('./templates/index.html.js'),
  'src/entry.ts': require('./templates/src/entry.ts.js'),
  'src/lib.rs': require('./templates/src/lib.rs.js'),
  'src/style.css': require('./templates/src/style.css.js'),
  'src/utils.rs': require('./templates/src/utils.rs.js'),
};

const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function createLab(labName) {
  const { length } = await readdir(labDir);

  const experimentName = kebabCase(`${length - 3}${labName}`);
  const experimentDir = path.join(labDir, experimentName);

  const entries = Object.entries(files);
  for (const [relPath, tpl] of entries) {
    const filePath = path.join(experimentDir, relPath);
    const fileContents = tpl({ labName, experimentName });

    await createFile(filePath, fileContents);
  }

  await updateCargo(experimentDir);

  return;
}

async function createFile(filePath, fileContents) {
  const fileDir = path.dirname(filePath);

  const dirExists = await exists(fileDir);
  if (!dirExists) {
    await mkdir(fileDir);
  }

  const pathExists = await exists(filePath);
  if (pathExists) {
    console.warn(
      `file already exists at ${path.relative(
        process.cwd(),
        filePath,
      )} skipping`,
    );

    return;
  }

  return writeFile(filePath, fileContents);
}

async function updateCargo(experimentDir) {
  const cargoPath = path.join(process.cwd(), 'Cargo.toml');
  const cargo = parse(await readFile(cargoPath));

  const {
    workspace: { members },
  } = cargo;
  const cargoContents = stringify({
    ...cargo,
    workspace: {
      members: [
        ...new Set([...members, path.relative(process.cwd(), experimentDir)]),
      ],
    },
  });

  return writeFile(cargoPath, cargoContents);
}

module.exports = async function cli(labNames) {
  for (const labName of labNames) {
    await createLab(labName);
  }
};
