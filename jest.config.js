module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    '!src/lib/**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '@fartts/lib/(.*)': '<rootDir>/src/lib/$1',
    '^.+\\.s?css$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/src/lib/**/?(*.)test?(s).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
