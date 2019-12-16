// ASSOCIATED_TASKS: T8000
describe("Common Card", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/CommonCard");
    cy.get("[data-testid=card-header]").should("contain", "New Instrument");
    cy.get("[data-testid=card-body]").should("contain", "Your Card");
  });
});
