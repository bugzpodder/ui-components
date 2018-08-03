describe("Two Column Grid", () => {
  it("successfully loads", () => {
    cy.visit("/#!/TwoColumnGrid");
    [0, 1, 2, 3, "I", "want", "to render", "these items"].map(e =>
      cy.get("[data-preview=TwoColumnGrid]").should("contain", e),
    );
  });
});
