// ASSOCIATED_TASKS: T8000
describe("Text Input V2", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/TextInputV2");
    cy.get("[data-preview=TextInputV2]").within(() => {
      cy.root().should("contain", "some label");
      cy.get(
        "[data-testid=fourth-text-input] > .MuiInputBase-root > .MuiInputBase-input",
      ).should("have.value", "filled read-only value");
    });
  });
});
