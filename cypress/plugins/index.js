// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/* eslint-disable */
const webpack = require("@cypress/webpack-preprocessor");

module.exports = on => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const options = webpack.defaultOptions;
  options.webpackOptions.resolve = {
    alias: {
      "~": require("path").resolve(__dirname, ".."),
    },
  };
  on("file:preprocessor", webpack(options));
  on("before:browser:launch", (browser = {}, args) => {
    // Deal with overlapping rendering issues: https://github.com/cypress-io/cypress/issues/2037
    if (browser.name === "chrome") {
      args = args.filter(arg => {
        return arg !== "--disable-blink-features=RootLayerScrolling";
      });

      return args;
    }
  });
};
