const fs = require('fs');
const path = require('path');
const util = require('util');

const cheerio = require('cheerio');
const { kebabCase, words } = require('lodash');
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

async function createLab(arg) {
  const { length } = await readdir(labDir);

  const labName = kebabCase(arg);
  const experimentName = kebabCase(`${length - 3}-${labName}`);
  const experimentDir = path.join(labDir, experimentName);

  const entries = Object.entries(files);
  for (const [relPath, tpl] of entries) {
    const filePath = path.join(experimentDir, relPath);
    const fileContents = tpl({ labName, experimentName });

    await createFile(filePath, fileContents);
  }

  await updateCargo(experimentDir);
  await updateIndex(labName, experimentDir);

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

async function updateIndex(labName, experimentName) {
  const indexPath = path.join(labDir, 'index.html');
  const index = cheerio.load(await readFile(indexPath));

  index('ul').append(
    `<li><a href="./${experimentName}/index.html">${words(labName)}</a></li>`,
  );

  console.log(index.html());

  return;
}

module.exports = async function cli(args) {
  for (const arg of args) {
    await createLab(arg);
  }
};
