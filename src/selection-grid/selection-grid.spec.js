// @flow
import "jest-dom/extend-expect";
import React, { useState } from "react";
import mockConsole from "jest-mock-console";
import { ALPHABET_ANIMALS_DATA, TestWrapper } from "../test-utils";
import { SelectionGrid } from "./selection-grid";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const TestSelectionGrid = props => {
  const {
    mockOnSelect,
    classes,
    numRows = ALPHABET_ANIMALS_DATA.length,
    numCols = ALPHABET_ANIMALS_DATA[0].length,
  } = props;
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const isCellEmpty = ({ instance }) => instance == null;
  const isCellSelectable = ({ cellIndex }) => cellIndex % 2 === 0;
  const cellRenderer = gridCellInfo => {
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
  const onSelect = value => {
    const { rowIndex, colIndex } = value;
    mockOnSelect(value);
    setSelectedCoordinates([{ rowIndex, colIndex }]);
  };
  return (
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
        classes={classes}
      />
    </TestWrapper>
  );
};

test("render selection grid and select a cell", () => {
  const mockOnSelect = jest.fn(result => result);
  const { container, getByTestId } = render(<TestSelectionGrid mockOnSelect={mockOnSelect} />);
  expect(container).toMatchSnapshot();

  // Test selection.
  const expectedResult = {
    rowIndex: 0,
    colIndex: 2,
    cellIndex: 2,
    instance: "cat",
  };
  expect(getByTestId("grid-cell-2")).not.toHaveClass("isSelected");
  fireEvent.click(getByTestId("grid-cell-2"));
  expect(mockOnSelect).toHaveBeenCalled();
  expect(mockOnSelect.mock.results[0].value).toEqual(expectedResult);
  expect(getByTestId("grid-cell-2")).toHaveClass("isSelected");
});

test("selection grid classes", () => {
  const classes = {
    root: "test-root",
    header: "test-header",
    row: "test-row",
    cell: "test-cell",
    cellContent: "test-content",
  };
  const { rerender, getByTestId } = render(<TestSelectionGrid classes={classes} />);
  const mockRowClass = jest.fn(result => result);
  const mockCellClass = jest.fn(result => result);
  expect(getByTestId("selection-grid")).toHaveClass("test-root");
  expect(getByTestId("selection-grid-row-1")).toHaveClass("test-row");
  expect(getByTestId("grid-cell-2")).toHaveClass("test-cell");
  expect(getByTestId("selection-grid-cell-2")).toHaveClass("test-content");
  const specialClasses = {
    row: mockRowClass,
    cell: mockCellClass,
  };
  rerender(<TestSelectionGrid classes={specialClasses} />);
  expect(mockRowClass).toHaveBeenCalled();
  expect(mockCellClass).toHaveBeenCalled();
  // row class should return index
  expect(mockRowClass.mock.results[0].value).toEqual(0);
  expect(mockRowClass.mock.results[3].value).toEqual(3);
  // cell class should return datum.
  expect(mockCellClass.mock.results[0].value).toEqual({
    cellIndex: 0,
    colIndex: 0,
    instance: "alligator",
    rowIndex: 0,
  });
});

test("render selection grid with mismatching numRow and numCols ", () => {
  mockConsole();
  expect(() => render(<TestSelectionGrid numRows={1} />)).toThrowError();
  expect(() => render(<TestSelectionGrid numCols={1} />)).toThrowError();
});
