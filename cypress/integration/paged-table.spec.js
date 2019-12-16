// ASSOCIATED_TASKS: T8000
import * as tableActions from "~/utils/tables";

describe("Paged Table", () => {
  it("successfully sorts table", () => {
    cy.visit("http://localhost:6060/#!/PagedTable");
    tableActions.setRowsPerPage(10);
    tableActions.sortWords();
    tableActions.checkSorting("Tittynope", "Flibbertigibbet", true);
    tableActions.sortWords();
    tableActions.checkSorting("Argle-bargle", "Lollygag", false);
  });

  it.skip("successfully selects one item", () => {
    tableActions.testSelectOne("have.class");
  });

  it.skip("successfully unselects one item", () => {
    tableActions.testSelectOne("not.have.class");
  });

  it.skip("successfully selects all items", () => {
    tableActions.testSelectAll("have.class");
  });

  it.skip("successfully unselects all items", () => {
    tableActions.testSelectAll("not.have.class");
  });

  it.skip("successfully pages table", () => {
    let count = 0;
    tableActions.checkFirstWord("Argle-bargle");
    cy.get("span[data-testid='paged-table-checkbox-cell']")
      .each(() => (count += 1))
      .then(() => tableActions.checkRowsPerPage(count));
    tableActions.checkTablePager("Showing 1 to 5");
    cy.get("button.next-page")
      .click()
      .then(() => {
        count = 0;
        cy.get("span[data-testid='paged-table-checkbox-cell']")
          .each(() => (count += 1))
          .then(() => expect(count).to.equal(2));
      });
    tableActions.checkTablePager("Showing 6 to 7");
    tableActions.checkFirstWord("Ogdoad");
    cy.get("button.previous-page").click();
    cy.get("div.select-row-count")
      .first()
      .click();
    cy.get("li")
      .last()
      .click()
      .then(() => {
        count = 0;
        tableActions.checkRowsPerPage(50);
        cy.get("span[data-testid='paged-table-checkbox-cell']")
          .each(() => (count += 1))
          .then(() => expect(count).to.equal(7));
      });
    tableActions.checkTablePager("Showing 1 to 7");
  });
});
