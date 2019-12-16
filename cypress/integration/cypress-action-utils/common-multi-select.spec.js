// ASSOCIATED_TASKS: T8000

import * as formActions from "~/utils/forms";

const fieldSelector = "[data-testid=countries-chooser]";

describe("CommonMultiSelect", () => {
  before(() => {
    cy.visit("http://localhost:6060/#!/CommonMultiSelect");
  });
  // Test at least 2 values, since the formAction may depend on prior state (for example, needing to clearCommonSelect)
  ["France", "United States #1"].forEach(label => {
    const value = label.toUpperCase().replace(" ", "_");
    it(`should selectItemFromCommonSelect with ${label}`, () => {
      formActions.selectItemFromCommonSelect(fieldSelector, value);
      formActions
        .getCommonSelectContainer(fieldSelector)
        .should("contain", label);
      // It is a bit annoying, but the subsequent tests don't work unless the selector is cleared.
      formActions.clearCommonSelect(fieldSelector);
    });
    it(`should selectFirstItemFromFirstCommonTypeahead with ${label}`, () => {
      formActions.selectFirstItemFromFirstCommonTypeahead(fieldSelector, label);
      formActions
        .getCommonSelectContainer(fieldSelector)
        .should("contain", label);
      // It is a bit annoying, but the subsequent tests don't work unless the selector is cleared.
      formActions.clearCommonSelect(fieldSelector);
    });
    it(`should verifySelectedItemsInCommonMultiSelect with ${label}`, () => {
      formActions.selectItemFromCommonSelect(fieldSelector, value);
      formActions.verifySelectedItemsInCommonMultiSelect(fieldSelector, [
        value,
      ]);
      // It is a bit annoying, but the subsequent tests don't work unless the selector is cleared.
      formActions.clearCommonSelect(fieldSelector);
    });
  });
  const labels = ["Italy", "France"];
  it(`should verifySelectedItemsInCommonMultiSelect with ${labels}`, () => {
    const values = labels.map(label => label.toUpperCase().replace(" ", "_"));
    values.forEach(value => {
      formActions.selectItemFromCommonSelect(fieldSelector, value);
    });
    formActions.verifySelectedItemsInCommonMultiSelect(fieldSelector, values);
    // It is a bit annoying, but the subsequent tests don't work unless the selector is cleared.
    formActions.clearCommonSelect(fieldSelector);
  });
});
