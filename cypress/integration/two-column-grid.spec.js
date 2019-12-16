// ASSOCIATED_TASKS: T8000

describe("Two Column Grid", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/TwoColumnGrid");
    [
      "Label Header",
      "Value Header",
      "Label 1",
      "Value 1",
      "Label 2",
      "Value 2",
      "Label 3",
      "Value 3",
      "Label 4",
      "Value 4",
      "Label 5",
      "Value 5",
      "Label 6",
      "Value 6",
      "Label 7",
      "Value 7",
      "Label 8",
      "Value 8",
      "Label 9",
      "Value 9",
    ].map(e => cy.get("[data-preview=TwoColumnGrid]").should("contain", e));
  });
});
