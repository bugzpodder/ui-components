// @flow
import { generateColHeaders, generateRowHeaders, validateGridData } from "./grid-utils";
import { upperAlphaChars } from "@grail/lib";

describe("validateGridData", () => {
  const testGridData = [["alligator", "bat", "cat", "dog"], ["elephant", "fox", null, null]];
  const numRows = testGridData.length;
  const numCols = testGridData[0].length;

  it("should return true when `numRows` and `numCols` match the dimensions of gridData", () => {
    expect(validateGridData(numRows, numCols, testGridData)).toEqual(true);
  });

  it("should error when number of rows in `gridData` does not match `numRows`", () => {
    expect(() => validateGridData(numRows - 1, numCols, testGridData)).toThrowError();
  });

  it("should error when number of columns in `gridData` does not match `numCols`", () => {
    expect(() => validateGridData(numRows, numCols - 1, testGridData)).toThrowError();
  });
});

describe("generateColHeaders", () => {
  it("should return numeric array to represent column headers", () => {
    expect(generateColHeaders(5)).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("should error when `numCols` is invalid", () => {
    expect(() => generateColHeaders(-1)).toThrowError();
  });
});

describe("generateRowHeaders", () => {
  it("should return an array upper alphabet characters to represent row headers", () => {
    expect(generateRowHeaders(5)).toEqual(["A", "B", "C", "D", "E"]);
  });

  it("should error when `numRows` is invalid", () => {
    expect(() => generateRowHeaders(-1)).toThrowError();
    expect(() => generateRowHeaders(upperAlphaChars.length * 26)).toThrowError();
  });
});
