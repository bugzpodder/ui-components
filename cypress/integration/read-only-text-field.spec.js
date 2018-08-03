describe("ReadOnlyTextField", () => {
  it("successfully loads", () => {
    cy.visit("/#!/ReadOnlyTextField");
    ["Readonly text input", "-", "Starred"].map(e => cy.get("[data-preview=ReadOnlyTextField]").should("contain", e));
  });
});

describe("ValidatedReadOnlyTextField", () => {
  it("successfully loads", () => {
    cy.visit("/#!/ValidatedReadOnlyTextField");
    ["yes", "no", "N/A"].map(e => cy.get("[data-preview=ValidatedReadOnlyTextField]").should("contain", e));
  });
});
