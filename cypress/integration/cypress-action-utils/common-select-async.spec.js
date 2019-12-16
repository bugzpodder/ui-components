// ASSOCIATED_TASKS: T8000
import * as formActions from "~/utils/forms";

const fieldSelector = "[data-testid=async-country-chooser]";

describe("CommonSelectAsync", () => {
  before(() => {
    cy.visit("http://localhost:6060/#!/CommonSelect");
  });
  // Test at least 2 values, since the formAction may depend on prior state (for example, needing to clearCommonSelect)
  ["Andorra", "Albania"].forEach(label => {
    it(`should selectFirstItemFromCommonTypeahead with ${label}`, () => {
      formActions.selectFirstItemFromCommonTypeahead(fieldSelector, label);
      formActions
        .getCommonSelectValueContainer(fieldSelector)
        .should("have.value", label);
      formActions.verifySelectedItemInCommonSelect(fieldSelector, label);
      // It is a bit annoying, but the subsequent tests don't work unless the selector is cleared.
      formActions.clearCommonSelect(fieldSelector);
    });
    it(`should selectFirstItemFromFirstCommonTypeahead with ${label}`, () => {
      formActions.selectFirstItemFromFirstCommonTypeahead(fieldSelector, label);
      formActions
        .getCommonSelectValueContainer(fieldSelector)
        .should("have.value", label);
      // It is a bit annoying, but the subsequent tests don't work unless the selector is cleared.
      formActions.clearCommonSelect(fieldSelector);
    });
  });
});
