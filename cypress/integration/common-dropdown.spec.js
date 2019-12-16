// ASSOCIATED_TASKS: T8000
describe("Common Dropdown Menu", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/CommonDropdownMenu");
    cy.get("[data-preview=CommonDropdownMenu] p").should(
      "contain",
      "This proposal is pending approval",
    );

    cy.get("[data-preview=CommonDropdownMenu]")
      .contains("Select Option")
      .click();

    cy.get("[data-testid='dropdown-item-0']").click();

    cy.get("[data-preview=CommonDropdownMenu] p").should(
      "contain",
      "This proposal has been approved",
    );
    cy.get("[data-testid='dropdown-item-0']").should("not.exist");
  });
});
