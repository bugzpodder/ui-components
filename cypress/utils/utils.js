export const getTextFromElement = (element) => {
  if (typeof element === "string") {
    return cy.get(element).then(getTextFromElement);
  }
  return cy.wrap(Cypress.$(element).text().trim());
};

export const getActiveSpinner = () => {
  return cy.get("[data-testid='spinner-overlay'][data-is-active='true']");
};

export const waitForProgressIndicator = () => {
  return getActiveSpinner().should("not.exist");
};
