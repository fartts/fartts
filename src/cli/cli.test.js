const fs = require('fs');

const mockToml = `\
[workspace]
members = [
  "src/lab/11-rust-wasm",
  "src/lab/12-wasm-particles",
  "src/lab/13-game-of-life",
]

[profile.release]
# optimize for size
# @see: https://doc.rust-lang.org/cargo/reference/manifest.html#the-profile-sections
opt-level = "s"
`;

jest.mock('fs');

fs.mkdir.mockImplementation((path, options, callback) => callback());
fs.readdir.mockImplementation((path, callback) =>
  callback(null, { length: 17 }),
);
fs.readFile.mockImplementation((path, callback) => callback(null, mockToml));

const cli = require('./cli');

describe('cli', () => {
  const origConsoleWarn = console.warn;
  let writeFileSpy;
  let consoleWarnSpy;

  beforeAll(() => {
    console.warn = jest.fn();
  });

  beforeEach(() => {
    writeFileSpy = jest.spyOn(fs, 'writeFile');
    consoleWarnSpy = jest.spyOn(console, 'warn');
  });

  afterEach(() => {
    writeFileSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  afterAll(() => {
    console.warn = origConsoleWarn;
  });

  it("tries to write if the file doesn't exist", async () => {
    fs.writeFile.mockImplementation((path, contents, options, callback) =>
      callback(),
    );

    await cli(['test']);

    expect(writeFileSpy).toHaveBeenCalledTimes(8);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
  });

  it("doesn't try to write if the file exists", async () => {
    fs.writeFile.mockImplementation((path, contents, options, callback) =>
      callback({ code: 'EEXIST' }),
    );

    await cli(['test']);

    expect(writeFileSpy).toHaveBeenCalledTimes(8);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(6);
  });
});
