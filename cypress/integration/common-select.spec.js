// ASSOCIATED_TASKS: T8000
describe("Common Select", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/#!/CommonSelect");
    cy.get("[data-preview=CommonSelect]").within(() => {
      cy.get("[data-testid='country-chooser']").should("exist");
    });
    ["Albania", "Algeria", "Andorra"].forEach((country) => {
      cy.get("[data-preview=CommonSelect]")
        .first()
        .within(() => {
          cy.get("[data-testid=common-select-helper-text]").should(
            "contain",
            "Choose a country",
          );
          cy.get("[data-testid=country-chooser]").click();
          cy.get(".MuiAutocomplete-listbox").within(() => {
            cy.contains(country).click();
          });

          cy.get(
            "[data-testid=country-chooser] #country-chooser-select-input",
          ).should("contain", country);
        });
    });
  });
});
