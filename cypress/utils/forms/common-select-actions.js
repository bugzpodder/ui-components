export const getCommonSelectContainer = (selector) => {
  return cy.get(`${selector}`);
};

export const getCommonSelectValueContainer = (selector) => {
  return cy.get(`${selector} [data-testid=common-select-input]`);
};

export const selectFirstItemInCommonSelect = (selector) => {
  cy.get(`${selector}`).click();
  cy.get(`.MuiAutocomplete-listbox .MuiAutocomplete-option`).first().click({
    force: true,
  });
};

export const selectLastItemInCommonSelect = (selector) => {
  cy.get(`${selector}`).click();
  cy.get(`.MuiAutocomplete-listbox .MuiAutocomplete-option`).last().click({
    force: true,
  });
};

export const selectItemFromCommonSelect = (selector, value) => {
  cy.get(`${selector}`).click();
  cy.get(`.MuiAutocomplete-listbox [data-testid='${value}']`).click({
    force: true,
  });
};

export const selectItemFromCommonSelectUsingContent = (selector, content) => {
  cy.get(`${selector}`).click();
  return cy
    .get(".MuiAutocomplete-listbox .MuiAutocomplete-option")
    .contains(content)
    .click({
      force: true,
    });
};

export const selectFirstItemFromCommonTypeahead = (selector, searchValue) => {
  cy.get(`${selector}`).click();
  cy.get(`${selector} [data-testid=common-select-input]`).type(searchValue, {
    force: true,
  });
  cy.get(`.MuiAutocomplete-listbox .MuiAutocomplete-option`).first().click({
    force: true,
  });
};

// Note that "First" intentionally appears twice in this function name: it
// selects an item from the first common select that cypress finds on the page
// with the given selector. It is an uncommon use case.
export const selectFirstItemFromFirstCommonTypeahead = (
  selector,
  searchValue,
) => {
  cy.get(`${selector}`).first().click();
  cy.get(`${selector} [data-testid="common-select-input"]`).type(searchValue, {
    force: true,
  });
  cy.get(`.MuiAutocomplete-listbox .MuiAutocomplete-option`).first().click({
    force: true,
  });
};

export const selectLastItemFromCommonSelect = (selector) => {
  cy.get(`${selector}`).click();
  return cy
    .get(`.MuiAutocomplete-listbox .MuiAutocomplete-option`)
    .last()
    .click({
      force: true,
    });
};

export const verifySelectedItemInCommonSelect = (selector, expectedValue) => {
  cy.get(`${selector} [data-testid=common-select-input]`).should(
    "have.value",
    expectedValue,
  );
};

export const verifySelectedItemsInCommonMultiSelect = (
  selector,
  expectedValues,
) => {
  return cy.get(`${selector} .MuiChip-deleteIcon`).should(($selectedValues) => {
    expect($selectedValues).to.have.length(expectedValues.length);
  });
};

export const clearCommonSelect = (selector) => {
  cy.get(`${selector}`).click();
  return cy.get(`${selector} [data-testid='common-select-close-icon']`).click();
};
