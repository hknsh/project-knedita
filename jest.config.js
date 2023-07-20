/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
}
