import * as inputActions from "./input-actions";

export const getCommonSuggestInputSelector = testId => {
  return `[data-testid=common-suggest-input-container] input[data-testid="${testId}"]`;
};

export const getCommonSuggestInputContainer = testId => {
  return cy.get(getCommonSuggestInputSelector(testId));
};

export const setCommonSuggestText = (testId, value) => {
  return inputActions.enterText(getCommonSuggestInputSelector(testId), value);
};

export const selectFirstSuggestionInCommonSuggest = (testId, value) => {
  setCommonSuggestText(testId, value);
  cy.get(".MuiAutocomplete-listbox .MuiAutocomplete-option")
    .first()
    .click();
};

export const selectFirstItemInCommonSuggest = testId => {
  return selectFirstSuggestionInCommonSuggest(testId, "");
};

export const selectLastItemInCommonSuggest = testId => {
  setCommonSuggestText(testId, "");
  cy.get(".MuiAutocomplete-listbox .MuiAutocomplete-option")
    .last()
    .click();
};

export const selectItemFromCommonSuggest = (testId, value) => {
  cy.get(`[data-testid="${testId}"]`).click();
  cy.get(".MuiAutocomplete-listbox").within(() => {
    cy.get(".MuiAutocomplete-option")
      .contains(value)
      .click({
        force: true,
      });
  });
};
