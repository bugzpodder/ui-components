// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

// (margi) Cypress cannot capture/mock fetch requests, so use polyfill
// https://github.com/cypress-io/cypress/issues/95
Cypress.on("window:before:load", (win) => {
  win.fetch = null;
});

Cypress.Commands.overwrite("log", (originalLog, text, ...args) => {
  // Cypress logs are hard to see in the console. Add some special chars.
  text = `(⌐■_■) ${text}`;
  originalLog(text, ...args);
  console.debug(text, ...args);
});
