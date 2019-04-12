// @flow
import "jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { ALPHABET_ANIMALS_DATA, TestWrapper } from "../test-utils";
import { SelectionGrid } from "./selection-grid";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

const selectedCoordinates = [];
const numRows = ALPHABET_ANIMALS_DATA.length;
const numCols = ALPHABET_ANIMALS_DATA[0].length;

const isCellEmpty = ({ instance }) => instance == null;
const isCellSelectable = ({ cellIndex }) => cellIndex % 2 === 0;
const cellRenderer = (gridCellInfo) => {
  const {
    rowIndex, colIndex, cellIndex, instance: animal,
  } = gridCellInfo;
  if (isCellEmpty(gridCellInfo)) {
    return null;
  }
  return (
    <div>
      <div>Row index: {rowIndex}</div>
      <div>Col index: {colIndex}</div>
      <div>Cell index: {cellIndex}</div>
      <div>isCellSelectable: {isCellSelectable(gridCellInfo)}</div>
      <div>{animal}</div>
    </div>
  );
};
const onSelect = jest.fn();

test("render selection grid and select a cell", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <SelectionGrid
        gridData={ALPHABET_ANIMALS_DATA}
        numRows={numRows}
        numCols={numCols}
        selectedCoordinates={selectedCoordinates}
        cellRenderer={cellRenderer}
        isCellEmpty={isCellEmpty}
        isCellSelectable={isCellSelectable}
        onSelect={onSelect}
      />
    </TestWrapper>,
  );

  fireEvent.click(getByTestId("grid-cell-2"));
  expect(onSelect).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

test("render selection grid with mismatching numRow", () => {
  mockConsole();
  expect(() => render(
    <SelectionGrid
      gridData={ALPHABET_ANIMALS_DATA}
      numRows={numRows - 1}
      numCols={numCols}
      selectedCoordinates={selectedCoordinates}
      cellRenderer={cellRenderer}
      isCellEmpty={isCellEmpty}
      isCellSelectable={isCellSelectable}
      onSelect={onSelect}
    />
  )).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("render selection grid with mismatching numCols", () => {
  mockConsole();
  expect(() => render(
    <SelectionGrid
      gridData={ALPHABET_ANIMALS_DATA}
      numRows={numRows}
      numCols={numCols - 1}
      selectedCoordinates={selectedCoordinates}
      cellRenderer={cellRenderer}
      isCellEmpty={isCellEmpty}
      isCellSelectable={isCellSelectable}
      onSelect={onSelect}
    />
  )).toThrowError();
  expect(console.error).toHaveBeenCalled();
});
