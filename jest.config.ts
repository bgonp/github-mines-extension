module.exports = {
  preset: 'ts-jest',
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['src/**/*.ts', '!src/*.d.ts', '!**/__tests__/**'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom'
}
