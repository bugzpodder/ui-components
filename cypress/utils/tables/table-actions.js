import * as utilActions from "../utils";

const pagedTableBaseTableSelector =
  "[data-testid='paged-table'] > [data-testid='card-body'] > table";

export const getPagedTable = options => {
  return cy.get(pagedTableBaseTableSelector, options);
};

export const getFieldsInTable = (columnSelector, options) => {
  return cy.get(
    `${pagedTableBaseTableSelector} > tbody > tr ${columnSelector}`,
    options,
  );
};

export const getFieldAtRowAndCol = (rowNumber, colNumber, options) => {
  return cy.get(
    `${pagedTableBaseTableSelector} > tbody > tr [data-cell-id='${rowNumber}-${colNumber}'`,
    options,
  );
};

export const getFirstFieldInTable = (columnSelector, options) => {
  return getFieldsInTable(columnSelector, options).first();
};

export const getFirstTextContentInTable = columnSelector => {
  return getFirstFieldInTable(columnSelector).then(element =>
    utilActions.getTextFromElement(element),
  );
};

export const checkFirstBoxInTable = options => {
  return getFirstFieldInTable(
    "td[data-cell-id$='-0'] input[type='checkbox']",
    options,
  ).click();
};

export const checkPagedTableHeader = headerNames => {
  return cy.get("th").each(header => {
    const headerValue = Cypress.$(header).text();
    cy.expect(headerNames).includes(headerValue);
  });
};

export const getPagedTableProgress = () => {
  return utilActions.getActiveSpinner();
};

export const waitForPagedTableProgress = () => {
  return utilActions.waitForProgressIndicator();
};
