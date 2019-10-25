/* eslint-disable */
import uuid from "uuid";
import moment from "moment";

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

// civilDateToMoment converts the format that the test server passes for a
// gt.CivilDate field into a moment() type, or null if the gt.CivilDate is is a
// zero-date.
export const civilDateToMoment = civilDate => {
  if (civilDate == null || civilDate.date == null) {
    return null;
  }
  const {
    date: { day, month, year },
  } = civilDate;
  if (day === 0 && month === 0 && year === 0) {
    return null;
  }
  // gt.CivilDate uses 1-based indexing for months, but moment.js uses 0-based indexing.
  return moment({
    day,
    month: month - 1,
    year,
  });
};
