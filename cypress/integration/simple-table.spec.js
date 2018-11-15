import * as tableActions from "../utils/table";

describe("Simple Table", () => {
  it("successfully sorts table", () => {
    cy.visit("/#!/SimpleTable");
    tableActions.sortWords();
    tableActions.checkSorting("Tittynope", "Argle-bargle", true);
    tableActions.sortWords();
    tableActions.checkSorting("Argle-bargle", "Tittynope", false);
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
});
