/** @type {import('@jest/types').Config.InitialOptions} */

// Any custom config you want to pass to Jest
module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  collectCoverageFrom: ['**/*.ts', '!<rootDir>/node_modules/', '!src/@*/**/*'],
  coverageThreshold: {
    global: {
      lines: 0,
      branches: 0,
      functions: 0,
      statements: 0,
    },
  },
}
