module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    "<rootDir>/tests/test-setup.js"
  ],
  transform: {
    "^.+\\.(css|less|scss)$": "<rootDir>/tests/test-styles-mock.js"
  }
};