export type GridCellCoordinate = {
  rowIndex: number;
  colIndex: number;
};

export type GridCellInfo = GridCellCoordinate & {
  cellIndex: number;
  instance: any;
};

export type SelectionGridClasses = {
  root?: string;
  header?: string;
  row?: string | ((x0: number) => string);
  cell?: string | ((x0: GridCellInfo) => string);
  cellContent?: string;
};
