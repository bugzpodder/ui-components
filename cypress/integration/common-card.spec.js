// @flow
describe("Common Card", () => {
  it("successfully loads", () => {
    cy.visit("/#!/CommonCard");
    cy.get("[data-testid=card-header]").should("contain", "New Instrument");
    cy.get("[data-testid=card-body]").should("contain", "Your Card");
  });
});
