// ASSOCIATED_TASKS: T8000
describe("External Link", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/ExternalLink");
    cy.get("[data-preview=ExternalLink]").should(
      "contain",
      "GRAIL Link in new tab",
    );
  });
});
