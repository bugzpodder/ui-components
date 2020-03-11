module.exports = {
  env: {
    browser: true,
    "cypress/globals": true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "@grailbio/eslint-config-grail/src/front-end",
    "@grailbio/eslint-config-grail/src/cypress",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["cypress", "import", "react", "filenames", "@typescript-eslint"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@grailbio/lib/src/*", "@grailbio/components/src/*"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["src/**/*.spec.ts", "src/**/*.spec.tsx"] },
    ],
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": 0,
    "react/destructuring-assignment": 0,
    "react/no-array-index-key": 0,
    "react/require-default-props": 0,
    "react/no-unused-prop-types": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/label-has-for": 0,
    "consistent-return": 0,
    "react/jsx-one-expression-per-line": 0,
  },
};
