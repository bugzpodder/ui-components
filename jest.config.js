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
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist", "/cypress/"],
  transform: {
    ".tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["jest-mock-console/dist/setupTestFramework.js"],
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2345, 2739, 2740, 2741, 2769],
      },
    },
  },
};
