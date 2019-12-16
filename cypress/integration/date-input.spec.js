// ASSOCIATED_TASKS: T8000
describe("Date Input", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/DateInput");
    cy.get("[data-preview=DateInput]").should("contain", "Release Date");
  });
});

describe("Date Time Input", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/DateTimeInput");
    cy.get("[data-preview=DateTimeInput]").should("contain", "Date & Time");
  });
});
