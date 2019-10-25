// @flow
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
  cy.get("[data-testid=items] [role=option]")
    .first()
    .click();
};

export const selectFirstItemInCommonSuggest = testId => {
  return selectFirstSuggestionInCommonSuggest(testId, "");
};

export const selectLastItemInCommonSuggest = testId => {
  setCommonSuggestText(testId, "");
  cy.get("[data-testid=items] [role=option]")
    .last()
    .click();
};

export const selectItemFromCommonSuggest = (testId, value) => {
  cy.get(
    `[data-testid=common-suggest-input-container] [data-testid="${testId}"] + div > [data-testid="toggle-suggestions"]`,
  ).click();
  cy.get("[data-testid=common-suggest-popper]").within(() => {
    cy.get("[data-testid=items] [role=option]")
      .contains(value)
      .click();
  });
};
