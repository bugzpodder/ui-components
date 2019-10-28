// @flow
export const setRowsPerPage = (rowsPerPage = 10) => {
  cy.get("[data-testid=rows-per-page]").click();
  cy.get(
    `#menu- [role=listbox] [role=option][data-value=${rowsPerPage}]`,
  ).click();
};

export const sortWords = () => {
  cy.get("span.sort-word").click();
};

export const checkSorting = (firstWord, lastWord, descending) => {
  const desc = descending ? "descending" : "ascending";
  cy.get("th.word-header").should("have.attr", "aria-sort", desc);
  cy.get("td.word-class")
    .first()
    .should("contain", firstWord);
  cy.get("td.word-class")
    .last()
    .should("contain", lastWord);
};

export const testSelectOne = shouldStatement => {
  cy.get("span[data-testid='paged-table-checkbox-cell']")
    .first()
    .click();
  cy.get("span[data-testid='paged-table-checkbox-cell']")
    .first()
    .should(shouldStatement, "active");
  cy.get("span[data-testid='paged-table-checkbox-header']").should(
    shouldStatement,
    "indeterminate",
  );
  cy.get("span[data-testid='paged-table-checkbox-header']").should(
    "not.have.class",
    "active",
  );
};

export const testSelectAll = shouldStatement => {
  cy.get("span[data-testid='paged-table-checkbox-header']").click();
  cy.get("span[data-testid='paged-table-checkbox-header']").should(
    shouldStatement,
    "active",
  );
  cy.get("span[data-testid='paged-table-checkbox-cell']").each(item =>
    cy.wrap(item).should(shouldStatement, "active"),
  );
};

export const checkFirstWord = word => {
  cy.get("td.word-class")
    .first()
    .should("contain", word);
};

export const checkRowsPerPage = count => {
  cy.get("input#rows-per-page").should("have.value", `${count}`);
};

export const checkTablePager = display => {
  cy.get("div.table-pager")
    .find("span")
    .should("contain", display);
};
