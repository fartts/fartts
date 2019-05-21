const fs = require('fs');
const path = require('path');
const util = require('util');

const { parse, stringify } = require('@iarna/toml');
const { kebabCase } = require('lodash');

const labDir = path.join(__dirname, '../lab');
const files = {
  'Cargo.toml': require('./templates/Cargo.toml.js'),
  'index.html': require('./templates/index.html.js'),
  'src/entry.ts': require('./templates/src/entry.ts.js'),
  'src/lib.rs': require('./templates/src/lib.rs.js'),
  'src/style.css': require('./templates/src/style.css.js'),
  'src/utils.rs': require('./templates/src/utils.rs.js'),
};

module.exports = function cli(args) {
  args.forEach(arg => {
    const { length } = fs.readdirSync(labDir);
    const experimentName = kebabCase(`${length - 3}${arg}`);
    const experimentDir = path.join(labDir, experimentName);

    Object.entries(files).forEach(([relPath, tpl]) => {
      const filePath = path.join(experimentDir, relPath);
      const fileDir = path.dirname(filePath);
      const fileContents = tpl({ name: experimentName });

      fs.existsSync(fileDir) || fs.mkdirSync(fileDir);

      if (fs.existsSync(filePath)) {
        console.warn(
          `file already exists at ${path.relative(
            process.cwd(),
            filePath,
          )} skipping`,
        );

        return;
      }

      fs.writeFileSync(filePath, fileContents);
    });

    const cargoPath = path.join(process.cwd(), 'Cargo.toml');
    const {
      workspace: { members },
    } = parse(fs.readFileSync(cargoPath));

    fs.writeFileSync(
      cargoPath,
      stringify({
        workspace: {
          members: [
            ...new Set([
              ...members,
              path.relative(process.cwd(), experimentDir),
            ]),
          ],
        },
      }),
    );
  });
};
