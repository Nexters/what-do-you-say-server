module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'd.ts'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/test/', '<rootDir>/generated/'],
  moduleNameMapper: {
    '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@web/(.*)': '<rootDir>/src/web/$1',
    '@container': '<rootDir>/src/container',
  },
  transform: { '^.+\\.(ts)?$': 'ts-jest' },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  silent: true,
  verbose: false,
};
