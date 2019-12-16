// ASSOCIATED_TASKS: T8000
import * as tableActions from "~/utils/tables";

describe("Simple Table", () => {
  it("successfully sorts table", () => {
    cy.visit("http://localhost:6060/#!/SimpleTable");
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
