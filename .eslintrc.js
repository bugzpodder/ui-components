module.exports = {
  env: {
    browser: true,
    "cypress/globals": true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "@grailbio/eslint-config-grail/src/front-end",
    "@grailbio/eslint-config-grail/src/flow",
    "@grailbio/eslint-config-grail/src/cypress",
  ],
  plugins: ["cypress", "flowtype", "import", "react", "filenames"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message: 'Please import lodash functions directly, eg: import isEmpty from "lodash/isEmpty".',
          },
          {
            name: "@material-ui/core",
            message: 'Please import material-ui components directly, eg: import Card from "@material-ui/core/Card".',
          },
        ],
        patterns: ["@grailbio/lib/src/*", "@grailbio/components/src/*"],
      },
    ],

    "function-paren-newline": 0,
    "no-return-await": 0,
    "react/destructuring-assignment": 0,
    "react/no-array-index-key": 0,
    "react/require-default-props": 0,
    "react/no-unused-prop-types": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/label-has-for": 0,

    "react/jsx-one-expression-per-line": 0,
    "react/sort-comp": 0,

    "arrow-body-style": 0,
    "no-use-before-define": 0,
    "consistent-return": 0,
    "arrow-parens": 0,
    "implicit-arrow-linebreak": 0,
    "operator-linebreak": 0,
  },
};
