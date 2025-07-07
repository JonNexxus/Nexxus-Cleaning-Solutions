const baseConfig = require('../../jest.config.js');

module.exports = {
  ...baseConfig,
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/ui/(.*)$': '<rootDir>/../../packages/ui/$1',
    '^@/config/(.*)$': '<rootDir>/../../packages/config/$1',
  },
  testMatch: ['<rootDir>/__tests__/**/*.(ts|tsx|js)', '<rootDir>/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/.next/**',
  ],
}
