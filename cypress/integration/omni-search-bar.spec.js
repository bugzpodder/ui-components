// @flow
describe("OmniSearchBar", () => {
  it("successfully loads", () => {
    cy.visit("/#!/OmniSearchBar");
    cy.get("[data-preview=OmniSearchBar]").within(() => {
      cy.get("input").should("have.attr", "placeholder", "Search or specify a field");
    });
  });
});
