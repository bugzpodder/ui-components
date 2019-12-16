// ASSOCIATED_TASKS: T8000
describe("OmniSearchBar", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/OmniSearchBar");
    cy.get("[data-preview=OmniSearchBar]").within(() => {
      cy.get("input").should(
        "have.attr",
        "placeholder",
        "Search here or use dropdown",
      );
    });
  });
});
