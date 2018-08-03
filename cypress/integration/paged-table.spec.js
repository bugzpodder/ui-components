describe("Paged Table", () => {
  it("successfully sorts table", () => {
    cy.visit("/#!/PagedTable");
    cy.sortWords();
    cy.checkSorting("Sesquipedalian", "Floccinaucinihilipilification", true);
    cy.sortWords();
    cy.checkSorting("Argle-bargle", "Mouse Potato", false);
  });

  it("successfully selects one item", () => {
    cy.testSelectOne("have.class");
  });

  it("successfully unselects one item", () => {
    cy.testSelectOne("not.have.class");
  });

  it("successfully selects all items", () => {
    cy.testSelectAll("have.class");
  });

  it("successfully unselects all items", () => {
    cy.testSelectAll("not.have.class");
  });

  it("successfully pages table", () => {
    let count = 0;
    cy.checkFirstWord("Argle-bargle");
    cy.get("span[data-testid='paged-table-checkbox-cell']")
      .each(() => (count += 1))
      .then(() => cy.checkRowsPerPage(count));
    cy.checkTablePager("Showing 1 to 5");
    cy.get("button.next-page")
      .click()
      .then(() => {
        count = 0;
        cy.get("span[data-testid='paged-table-checkbox-cell']")
          .each(() => (count += 1))
          .then(() => expect(count).to.equal(2));
      });
    cy.checkTablePager("Showing 6 to 7");
    cy.checkFirstWord("Ogdoad");
    cy.get("button.previous-page").click();
    cy.get("div.select-row-count")
      .first()
      .click();
    cy.get("li")
      .last()
      .click()
      .then(() => {
        count = 0;
        cy.checkRowsPerPage(50);
        cy.get("span[data-testid='paged-table-checkbox-cell']")
          .each(() => (count += 1))
          .then(() => expect(count).to.equal(7));
      });
    cy.checkTablePager("Showing 1 to 7");
  });
});
