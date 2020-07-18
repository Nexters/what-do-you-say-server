module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'd.ts'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/test/'],
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@controller/(.*)': '<rootDir>/src/controller/$1',
    '@service/(.*)': '<rootDir>/src/service/$1',
    '@repository/(.*)': '<rootDir>/src/repository/$1',
    '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
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
}
