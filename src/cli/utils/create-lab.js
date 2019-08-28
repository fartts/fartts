const path = require('path');

const { kebabCase } = require('lodash');

const { readdir } = require('.');
const createFile = require('./create-file');
const updateCargo = require('./update-cargo');
const updateIndex = require('./update-index');

module.exports = async function createLab(files, arg, { isWasm }) {
  const labsDir = path.join(process.cwd(), 'src/lab');
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

  isWasm && (await updateCargo(labDir));
  await updateIndex(labName, labNumber);

  return;
};
