// @flow

export const clickSwitch = selector => {
  cy.get(`[data-testid='common-switch'] ${selector}`).click();
};
