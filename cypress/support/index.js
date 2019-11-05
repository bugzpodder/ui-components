// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./common";

// eslint-disable-next-line import/no-extraneous-dependencies
const istanbul = require("istanbul-lib-coverage");

const map = istanbul.createCoverageMap({});

Cypress.on("window:before:unload", e => {
  const coverage = e.currentTarget.__coverage__;

  if (!coverage) {
    return;
  }
  map.merge(coverage);
});

if (Cypress.env("coverage")) {
  afterEach(() => {
    cy.window().then(win => {
      const coverage = win.__coverage__;

      if (!coverage) {
        return;
      }

      map.merge(coverage);
      cy.writeFile(".nyc_output/output.json", JSON.stringify(map));
    });
  });
}
