// ASSOCIATED_TASKS: T8000
describe("Common Panel", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/CommonPanel");
    cy.get("[data-preview=CommonPanel]").should("contain", "Panel Title");
  });
});
