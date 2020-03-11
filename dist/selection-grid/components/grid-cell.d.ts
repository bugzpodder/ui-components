import { ReactNode } from "react";
import { GridCellInfo, SelectionGridClasses } from "../../types/selection-grid";
declare type Props = {
    gridCellInfo: GridCellInfo;
    isEmpty: boolean;
    isSelectable: boolean;
    isSelected: boolean;
    classes: SelectionGridClasses;
    cellRenderer: (x0: GridCellInfo) => ReactNode;
    onSelect?: (x0: GridCellInfo) => any;
};
export declare const GridCell: (props: Props) => JSX.Element;
export {};
