const fs = require('fs');
const util = require('util');

module.exports = {
  mkdir: util.promisify(fs.mkdir),
  readdir: util.promisify(fs.readdir),
  readFile: util.promisify(fs.readFile),
  writeFile: util.promisify(fs.writeFile),
};
