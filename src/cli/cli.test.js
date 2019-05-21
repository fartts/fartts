const fs = require('fs');

const mockToml = `\
[workspace]
members = [
  "src/lab/11-rust-wasm",
  "src/lab/12-wasm-particles",
  "src/lab/13-game-of-life",
]
`;

jest.mock('fs', () => ({
  existsSync: jest.fn(() => false),
  mkdirSync: jest.fn(() => true),
  readdirSync: jest.fn(() => ({ length: 17 })),
  readFileSync: jest.fn(() => mockToml),
  writeFileSync: jest.fn((path, contents) => ({
    path,
    contents,
  })),
}));

const cli = require('./cli');

describe('cli', () => {
  const origConsoleWarn = console.warn;

  beforeAll(() => {
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.warn = origConsoleWarn;
  });

  it("tries to write if the file doesn't exist", () => {
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    cli(['test']);

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(7);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);

    writeFileSyncSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("doesn't try to write if the file exists", () => {
    fs.existsSync.mockReturnValue(true);

    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    cli(['test']);

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(6);

    writeFileSyncSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });
});
