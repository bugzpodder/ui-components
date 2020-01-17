// ASSOCIATED_TASKS: T8000
describe("Text Input V2", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/TextInput");
    cy.get("[data-preview=TextInput]").within(() => {
      cy.root().should("contain", "some label");
      cy.get(
        "[data-testid=fourth-text-input] > .MuiInputBase-root > .MuiInputBase-input",
      ).should("have.value", "filled read-only value");
    });
  });
});
