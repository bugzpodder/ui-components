describe("Simple Table", () => {
  it("successfully sorts table", () => {
    cy.visit("/#!/SimpleTable");
    cy.sortWords();
    cy.checkSorting("Sesquipedalian", "Argle-bargle", true);
    cy.sortWords();
    cy.checkSorting("Argle-bargle", "Sesquipedalian", false);
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
});
