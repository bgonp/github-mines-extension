/* eslint-disable */
module.exports = {
  preset: 'ts-jest',
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.mocks.{ts,tsx}',
    '!<rootDir>/src/*.d.ts',
    '!<rootDir>/src/**/index.{ts,tsx}',
  ],
  testEnvironment: 'jsdom'
}
