/** @type {import('@jest/types').Config.InitialOptions} */

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
  collectCoverageFrom: [
    '**/*.ts',
    'src/**/*.ts',
    '!src/**/index.*',
    '<rootDir>/src/utils/coreActions/index.ts',
    '!<rootDir>/node_modules/',
    '!src/@*/**/*',
  ],
  coverageThreshold: {
    global: {
      lines: 85,
      branches: 85,
      functions: 85,
      statements: 85,
    },
  },
}
