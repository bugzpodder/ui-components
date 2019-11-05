export const enterText = (selector, value, options = {}) => {
  if (typeof value !== "string") {
    throw Error(
      `enterText expected param 'value' to be a string, got ${typeof value}`,
    );
  }
  const { force } = options;
  cy.get(selector)
    .clear({ force })
    .should("have.value", "");
  value = value.replace(/{enter}/g, "\n");
  value = value.replace(/{esc}/g, "");
  if (value.length) {
    cy.get(selector)
      .type(value, options)
      .should("have.value", value);
  }
  return cy.get(selector);
};
