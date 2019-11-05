import React from "react";
import { PagedTableColumn, SortingProps } from "../../types/paged-table";
declare type Props = {
    tableColumns: PagedTableColumn[];
    sortingProps: SortingProps;
    enableSelectAll: boolean;
};
export declare const LargeTableHeader: React.FC<Props>;
export {};
