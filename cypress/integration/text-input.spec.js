// ASSOCIATED_TASKS: T8000
describe("Text Input", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/TextInput");
    cy.get("[data-preview=TextInput]").should("contain", "read-only value");
  });
});
