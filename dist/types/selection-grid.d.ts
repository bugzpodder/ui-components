export declare type GridCellCoordinate = {
    rowIndex: number;
    colIndex: number;
};
export declare type GridCellInfo = GridCellCoordinate & {
    cellIndex: number;
    instance: any;
};
export declare type SelectionGridClasses = {
    root?: string;
    header?: string;
    row?: string | ((x0: number) => string);
    cell?: string | ((x0: GridCellInfo) => string);
    cellContent?: string;
};
