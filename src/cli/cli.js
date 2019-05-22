const fs = require('fs');
const path = require('path');
const util = require('util');

const cheerio = require('cheerio');
const { kebabCase, words } = require('lodash');
const prettier = require('prettier');
const { parse, stringify } = require('@iarna/toml');

const labsDir = path.join(__dirname, '../lab');
const files = {
  'Cargo.toml': require('./templates/Cargo.toml.js'),
  'index.html': require('./templates/index.html.js'),
  'src/entry.ts': require('./templates/src/entry.ts.js'),
  'src/lib.rs': require('./templates/src/lib.rs.js'),
  'src/style.css': require('./templates/src/style.css.js'),
  'src/utils.rs': require('./templates/src/utils.rs.js'),
};

const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function createLab(arg) {
  const { length } = await readdir(labsDir);

  const labName = kebabCase(arg);
  const labNumber = kebabCase(`${length - 3}-${labName}`);
  const labDir = path.join(labsDir, labNumber);

  const entries = Object.entries(files);
  for (const [relPath, tpl] of entries) {
    const filePath = path.join(labDir, relPath);
    const fileContents = tpl({ labName, labNumber });

    await createFile(filePath, fileContents);
  }

  await updateCargo(labDir);
  await updateIndex(labName, labNumber);

  return;
}

async function createFile(filePath, fileContents) {
  const fileDir = path.dirname(filePath);

  try {
    await mkdir(fileDir);
  } catch {}

  return writeFile(filePath, fileContents, { flag: 'wx' }).catch(() => {
    console.warn(
      `file already exists at ${path.relative(
        process.cwd(),
        filePath,
      )} skipping`,
    );
  });
}

async function updateCargo(labDir) {
  const cargoPath = path.join(process.cwd(), 'Cargo.toml');
  const cargo = parse(await readFile(cargoPath));

  const {
    workspace: { members },
  } = cargo;
  const cargoContents = stringify({
    ...cargo,
    workspace: {
      members: [...new Set([...members, path.relative(process.cwd(), labDir)])],
    },
  });

  return writeFile(cargoPath, cargoContents, { flag: 'w' }).catch(
    () => undefined,
  );
}

async function updateIndex(labName, labNumber) {
  const indexPath = path.join(labsDir, 'index.html');
  const index = cheerio.load(await readFile(indexPath));

  const linkText = words(labName).join(' ');
  index('ul').append(
    `<li><a href="./${labNumber}/index.html">${linkText}</a></li>`,
  );
  const indexContents = prettier.format(index.html(), { parser: 'html' });

  return writeFile(indexPath, indexContents, { flag: 'w' }).catch(
    () => undefined,
  );
}

module.exports = async function cli(args) {
  for (const arg of args) {
    await createLab(arg);
  }
};
