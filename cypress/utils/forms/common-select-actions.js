// @flow
export const getCommonSelectValueContainer = selector => {
  return cy.get(
    `.common-select__root ${selector} .common-select__value-container`,
  );
};

export const selectFirstItemInCommonSelect = selector => {
  cy.get(`.common-select__root ${selector}`).click();
  cy.get(`.common-select__root ${selector} .common-select__menu-item`)
    .first()
    .click();
};

export const selectLastItemInCommonSelect = selector => {
  cy.get(`.common-select__root ${selector}`).click();
  cy.get(`.common-select__root ${selector} .common-select__menu-item`)
    .last()
    .click();
};

export const selectItemFromCommonSelect = (selector, value) => {
  cy.get(`.common-select__root ${selector}`).click();
  cy.get(
    `.common-select__root ${selector} .common-select__menu-item[data-testid='${value}']`,
  ).click({
    force: true,
  });
};

export const selectItemFromCommonSelectUsingContent = (selector, content) => {
  cy.get(`.common-select__container ${selector}`).click();
  return cy
    .get(".common-select__menu-item")
    .contains(content)
    .click({
      force: true,
    });
};

export const selectFirstItemFromCommonTypeahead = (selector, searchValue) => {
  cy.get(`.common-select__root ${selector}`).click();
  cy.get(`.common-select__root ${selector} .common-select__input input`).type(
    searchValue,
    { force: true },
  );
  cy.get(`.common-select__root ${selector} .common-select__menu-item`)
    .first()
    .click({
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
  cy.get(`.common-select__root ${selector}`)
    .first()
    .click();
  cy.get(`.common-select__root ${selector} .common-select__input input`)
    .first()
    .type(searchValue, { force: true });
  cy.get(`.common-select__root ${selector} .common-select__menu-item`)
    .first()
    .click({
      force: true,
    });
};

export const selectLastItemFromCommonSelect = selector => {
  cy.get(`.common-select__root ${selector}`).click();
  return cy
    .get(`.common-select__root ${selector} .common-select__menu-item`)
    .last()
    .click({
      force: true,
    });
};

export const verifySelectedItemInCommonSelect = (selector, expectedValue) => {
  cy.get(`${selector} .common-select__single-value`).should(
    "contain",
    expectedValue,
  );
};

export const verifySelectedItemsInCommonMultiSelect = (
  selector,
  expectedValues,
) => {
  return cy
    .get(`${selector} .common-select__multi-value__remove`)
    .should($selectedValues => {
      expect($selectedValues).to.have.length(expectedValues.length);
      expectedValues.forEach((expectedValue, index) => {
        expect($selectedValues.eq(index)).to.have.data(
          "testid",
          `remove-${expectedValue}`,
        );
      });
    });
};

export const clearCommonSelect = selector => {
  return cy
    .get(`.common-select__root ${selector} [data-testid='clear-icon']`)
    .click();
};
