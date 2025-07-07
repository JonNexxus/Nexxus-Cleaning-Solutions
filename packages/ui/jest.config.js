const baseConfig = require('../../jest.config.js');

module.exports = {
  ...baseConfig,
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.js'],
  testMatch: ['<rootDir>/__tests__/**/*.(ts|tsx|js)', '<rootDir>/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
}
