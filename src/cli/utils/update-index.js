const path = require('path');

const cheerio = require('cheerio');
const { words } = require('lodash');
const prettier = require('prettier');

const { readFile, writeFile } = require('.');

module.exports = async function updateIndex(labName, labNumber) {
  const labsDir = path.join(process.cwd(), 'src/lab');
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
};
