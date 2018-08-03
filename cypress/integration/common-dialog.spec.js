describe("Common Dialog", () => {
  it("successfully loads", () => {
    cy.visit("/#!/CommonDialog");
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
