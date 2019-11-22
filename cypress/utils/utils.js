/* eslint-disable */
import uuid from "uuid";

export const getRandomCharacters = length => {
  return uuid
    .v4()
    .replace(/-/g, "")
    .substring(0, length);
};

export const generateRandomNumber = () => {
  return Array(5)
    .fill(0)
    .map(() => Math.random() * 1000 * 1000 * 1000)
    .map(Math.round)
    .map(value => `${value}`)
    .map(value => value.padStart(9, "0"))
    .join("");
};

export const getTextFromElement = element => {
  if (typeof element === "string") {
    return cy.get(element).then(getTextFromElement);
  }
  return cy.wrap(
    Cypress.$(element)
      .text()
      .trim(),
  );
};

export const getActiveSpinner = () => {
  return cy.get("[data-testid='spinner-overlay'][data-is-active='true']");
};

export const waitForProgressIndicator = () => {
  return getActiveSpinner().should("not.exist");
};
