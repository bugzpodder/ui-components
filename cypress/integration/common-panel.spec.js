describe("Common Panel", () => {
  it("successfully loads", () => {
    cy.visit("/#!/CommonPanel");
    cy.get("[data-preview=CommonPanel]").should("contain", "Hello World");
  });
});
