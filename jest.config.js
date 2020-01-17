module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/index.ts",
    "!src/types/**/*.ts",
    "!src/dev/**/*.{ts,tsx}",
    "!src/__deprecated__/**/*.{ts,tsx}",
    "!src/utils/*.{ts,tsx}",
  ],
  coverageThreshold: {
    "src/**/*.{ts,tsx}": {
      lines: 25,
    },
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.entry.js": "<rootDir>/__mocks__/pdfMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist", "/cypress/"],
  transform: {
    ".tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts",
    "jest-mock-console/dist/setupTestFramework.js",
  ],
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2345, 2739, 2740, 2741, 2769],
      },
    },
  },
};
