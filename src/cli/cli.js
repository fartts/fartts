const createLab = require('./utils/create-lab');

const commonFiles = {
  'index.html': require('./templates/common/index-html.js'),
  'src/style.css': require('./templates/common/src/style-css'),
};

const wasmFiles = {
  'Cargo.toml': require('./templates/wasm/Cargo-toml'),
  'src/entry.ts': require('./templates/wasm/src/entry-ts'),
  'src/lib.rs': require('./templates/wasm/src/lib-rs'),
  'src/utils.rs': require('./templates/wasm/src/utils-rs'),
};

const files = {
  wasm: {
    ...commonFiles,
    ...wasmFiles,
  },
};

module.exports = async function cli([cmd, ...args]) {
  for (const arg of args) {
    await createLab(files[cmd], arg, { isWasm: cmd === 'wasm' });
  }
};
