import React, { ReactNode } from "react";
import { GridCellCoordinate, GridCellInfo, SelectionGridClasses } from "../types/selection-grid";
declare type Props = {
    /** Data to be displayed in grid */
    gridData: any[][];
    /** Number of rows in the grid */
    numRows: number;
    /** Number of columns in the grid */
    numCols: number;
    /** A set of selected cell indices */
    selectedCoordinates: GridCellCoordinate[];
    /** Custom cell rendering function */
    cellRenderer: (x0: GridCellInfo) => ReactNode;
    /** Onclick handler for selecting cell */
    onSelect?: (x0: GridCellInfo) => void;
    /** Dictates whether to show the row/column header */
    showHeader?: boolean;
    /**
     * Provides classNames to the grid and its sub-components. Options include:
     *
     *  - `root`
     *
     *  - `header` (applied to the row/column headers)
     *
     *  - `row` (applied to each row of the grid. Can take a function `(rowIndex: number) => classname: string` to help
     *    specify a className for any specific row)
     *
     *  - `cell` (applied to each cell. Can take a function `(gridCellInfo: GridCellInfo) => classname: string` to help
     *    specify a className for any specific cell)
     *
     *  - `cellContent` (applied to content div inside each cell)
     */
    classes?: SelectionGridClasses;
    /** Should return true if cell is selectable. By default, it'll check if the instance at the position is not null. */
    isCellSelectable?: (x0: GridCellInfo) => boolean;
    /** Should return true if cell is empty. By default, it'll check if the instance at the position is null. */
    isCellEmpty?: (x0: GridCellInfo) => boolean;
    /** Invert rows showing from largest row to smallest */
    invertRows?: boolean;
};
export declare const SelectionGrid: React.FC<Props>;
export {};
