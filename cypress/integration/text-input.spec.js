describe("Text Input", () => {
  it("successfully loads", () => {
    cy.visit("/#!/TextInput");
    cy.get("[data-preview=TextInput]").should("contain", "read-only value");
  });
});
