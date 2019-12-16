// ASSOCIATED_TASKS: T8000
import * as formActions from "~/utils/forms";

const fieldSelector = "[data-testid=country-chooser]";

describe("CommonSelect", () => {
  before(() => {
    cy.visit("http://localhost:6060/#!/CommonSelect");
  });
  ["France", "United States #1"].forEach(label => {
    const value = label.toUpperCase().replace(" ", "_");
    it(`should selectItemFromCommonSelect with ${label}`, () => {
      formActions.selectItemFromCommonSelect(fieldSelector, value);
      formActions
        .getCommonSelectValueContainer(fieldSelector)
        .should("have.value", label);
      formActions.verifySelectedItemInCommonSelect(fieldSelector, label);
    });
  });
  it("should selectFirstItemInCommonSelect", () => {
    formActions.selectFirstItemInCommonSelect(fieldSelector);
    formActions
      .getCommonSelectValueContainer(fieldSelector)
      .should("have.value", "Afghanistan");
  });
  it("should selectLastItemInCommonSelect", () => {
    formActions.selectLastItemInCommonSelect(fieldSelector);
    formActions
      .getCommonSelectValueContainer(fieldSelector)
      .should("have.value", "Zimbabwe");
  });
});
