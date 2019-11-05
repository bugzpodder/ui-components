import React from "react";
import { InternalPagedTableColumn, SortingProps } from "../../types/paged-table";
declare type Props = {
    columns: InternalPagedTableColumn[];
    sortingProps: SortingProps;
    enableSelectAll: boolean;
    hasColumnVisibilityChooser: boolean;
    columnVisibility: {
        [x: number]: boolean;
    };
    setColumnVisibility: (x0: {
        [x: number]: boolean;
    }) => any;
};
export declare const TableHeader: React.FC<Props>;
export {};
