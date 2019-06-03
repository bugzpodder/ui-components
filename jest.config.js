// @flow
const jestConfig = require("kcd-scripts/config").jest;

module.exports = Object.assign(jestConfig, {
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/index.js",
    "!src/dev/**/*.{js,jsx}",
    "!src/__deprecated__/**/*.{js,jsx}",
    "!src/utils/*.{js,jsx}",
  ],
  coverageThreshold: {
    "src/**/*.{js,jsx}": {
      lines: 25,
    },
  },
  moduleNameMapper: {
    "^@grail/(.*)$": "<rootDir>/../$1/src",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
  transform: {
    ".jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["jest-mock-console/dist/setupTestFramework.js"],
});
