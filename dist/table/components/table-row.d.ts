import React from "react";
import { InternalPagedTableColumn, SelectionProps } from "../../types/paged-table";
declare type Props = {
    columns: InternalPagedTableColumn[];
    instance: {
        [x: string]: any;
    };
    rowId: string | number;
    shadeOnHover: boolean;
    rowIndex: number;
    className?: string | Function;
    selectionProps: SelectionProps;
    hasColumnVisibilityChooser: boolean;
    canSelect: boolean;
    paddingLeft: number;
};
export declare const PagedTableRow: React.FC<Props>;
export {};
