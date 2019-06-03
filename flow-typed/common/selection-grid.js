// @flow
declare type GridCellCoordinate = {
  rowIndex: number,
  colIndex: number,
};

declare type GridCellInfo = {
  cellIndex: number,
  instance: any,
} & GridCellCoordinate;

declare type SelectionGridClasses = {
  root?: string,
  header?: string,
  row?: string,
  cell?: string | (GridCellInfo => string),
  cellContent?: string,
};
