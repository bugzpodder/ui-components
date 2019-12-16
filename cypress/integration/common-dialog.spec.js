// ASSOCIATED_TASKS: T8000
describe("Common Dialog", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/CommonDialog");
    cy.get("[data-preview=CommonDialog]")
      .contains("Open simple dialog")
      .click();
    cy.get("[role=dialog]").should("contain", "Example Dialog");
    cy.get("[role=dialog]")
      .contains("Close")
      .click();
    cy.get("[role=dialog]").should("not.exist");
  });
});
