describe("Date Input", () => {
  it("successfully loads", () => {
    cy.visit("/#!/DateInput");
    cy.get("[data-preview=DateInput]").should("contain", "Release Date");
  });
});

describe("Date Time Input", () => {
  it("successfully loads", () => {
    cy.visit("/#!/DateTimeInput");
    cy.get("[data-preview=DateTimeInput]").should("contain", "Release Date & Time");
  });
});
