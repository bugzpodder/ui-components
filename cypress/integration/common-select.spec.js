describe("Common Typeahead", () => {
  it("successfully loads", () => {
    cy.visit("/#!/CommonSelect");
    cy.get("[data-preview=CommonSelect]").within(() => {
      cy.get(".common-select__root").should("exist");
    });
  });
});
