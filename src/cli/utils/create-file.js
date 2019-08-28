const path = require('path');

const { mkdir, writeFile } = require('.');

module.exports = async function createFile(filePath, fileContents) {
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
};
