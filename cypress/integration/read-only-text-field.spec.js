// ASSOCIATED_TASKS: T8000
describe("ReadOnlyTextField", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/ReadOnlyTextField");
    ["Readonly text field", "-", "Starred"].map(e =>
      cy.get("[data-preview=ReadOnlyTextField]").should("contain", e),
    );
  });
});

describe("ValidatedReadOnlyTextField", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/ValidatedReadOnlyTextField");
    ["yes", "no", "N/A"].map(e =>
      cy.get("[data-preview=ValidatedReadOnlyTextField]").should("contain", e),
    );
  });
});
