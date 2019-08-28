const path = require('path');

const { parse, stringify } = require('@iarna/toml');

const { readFile, writeFile } = require('.');

module.exports = async function updateCargo(labDir) {
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
};
