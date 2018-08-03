Cypress.Commands.add("sortWords", () => {
  cy.get("span.sort-word").click();
});

Cypress.Commands.add("checkSorting", (firstWord, lastWord, descending) => {
  const desc = descending ? "descending" : "ascending";
  cy.get("th.word-header").should("have.attr", "aria-sort", desc);
  cy.get("td.word-class")
    .first()
    .should("contain", firstWord);
  cy.get("td.word-class")
    .last()
    .should("contain", lastWord);
});

Cypress.Commands.add("testSelectOne", shouldStatement => {
  cy.get("span[data-testid='paged-table-checkbox-cell']")
    .first()
    .click();
  cy.get("span[data-testid='paged-table-checkbox-cell']")
    .first()
    .should(shouldStatement, "active");
  cy.get("span[data-testid='paged-table-checkbox-header']").should(shouldStatement, "indeterminate");
  cy.get("span[data-testid='paged-table-checkbox-header']").should("not.have.class", "active");
});

Cypress.Commands.add("testSelectAll", shouldStatement => {
  cy.get("span[data-testid='paged-table-checkbox-header']").click();
  cy.get("span[data-testid='paged-table-checkbox-header']").should(shouldStatement, "active");
  cy.get("span[data-testid='paged-table-checkbox-cell']").each(item => cy.wrap(item).should(shouldStatement, "active"));
});

Cypress.Commands.add("checkFirstWord", word => {
  cy.get("td.word-class")
    .first()
    .should("contain", word);
});

Cypress.Commands.add("checkRowsPerPage", count => {
  cy.get("input#rows-per-page").should("have.value", `${count}`);
});

Cypress.Commands.add("checkTablePager", display => {
  cy.get("div.table-pager")
    .find("span")
    .should("contain", display);
});
