// @flow
import { generateFilledArray, getColHeader, getRowHeader } from "@grailbio/lib";

export const validateGridData = (numRows: number, numCols: number, gridData: Array<Array<any>>) => {
  if (numRows !== gridData.length) {
    throw new Error(`Number of rows in gridData (${gridData.length}) does not match numRows (${numRows})`);
  }
  gridData.forEach(gridRow => {
    if (gridRow.length !== numCols) {
      throw new Error(`Number of columns in gridData (${gridRow.length}) does not match numCols (${numCols})`);
    }
  });
  return true;
};

export const generateColHeaders = (numCols: number) => generateFilledArray(numCols, (_, index) => getColHeader(index));

export const generateRowHeaders = (numRows: number) => generateFilledArray(numRows, (_, index) => getRowHeader(index));
