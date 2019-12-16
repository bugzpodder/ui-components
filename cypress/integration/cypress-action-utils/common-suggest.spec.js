// ASSOCIATED_TASKS: T8000
import * as formActions from "~/utils/forms";

const fieldId = "country-chooser";

const testCases = [
  {
    value: "France",
    suggestion: "France",
  },
  {
    value: "ited sTAT",
    suggestion: "United States #1",
  },
  {
    value: "India",
    suggestion: "Bassas da India",
  },
  {
    value: "hong kong",
    suggestion: "Hong Kong",
  },
];

describe("CommonSuggest", () => {
  before(() => {
    cy.visit("http://localhost:6060/#!/CommonSuggest");
  });
  testCases.forEach(({ value, suggestion }) => {
    it(`should selectFirstSuggestionInCommonSuggest for ${value}`, () => {
      formActions.selectFirstSuggestionInCommonSuggest(fieldId, value);
      formActions
        .getCommonSuggestInputContainer(fieldId)
        .should("contain.value", `${suggestion}`);
    });
    it(`should setCommonSuggestText with ${value}`, () => {
      formActions.setCommonSuggestText(fieldId, value);
      formActions
        .getCommonSuggestInputContainer(fieldId)
        .should("have.value", value);
    });
  });
  it("should selectItemFromCommonSuggest", () => {
    // Reload required to remove focus from common suggest.
    cy.reload();
    formActions.selectItemFromCommonSuggest(fieldId, "United States #1");
    formActions
      .getCommonSuggestInputContainer(fieldId)
      .should("have.value", "United States #1");
  });
  it("should selectFirstItemInCommonSuggest", () => {
    formActions.selectFirstItemInCommonSuggest(fieldId);
    formActions
      .getCommonSuggestInputContainer(fieldId)
      .should("have.value", "Afghanistan");
  });
  it("should selectLastItemInCommonSuggest", () => {
    formActions.selectLastItemInCommonSuggest(fieldId);
    formActions
      .getCommonSuggestInputContainer(fieldId)
      .should("have.value", "Zimbabwe");
  });
});
