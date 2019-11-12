import React from "react";
import { PagedTableClasses, PagedTableColumn } from "../../types/paged-table";
import { SimpleTableOptions } from "../../types/table";
import { SortOption } from "@grailbio/lib";
declare type Props = {
    id?: string;
    columns: PagedTableColumn[];
    data: Array<Record<string, any>>;
    isLoading: boolean;
    selectedRows: Array<number | string>;
    classes?: PagedTableClasses;
    idKey?: string | number;
    onSelect?: (x0: any[]) => any;
    onSort?: (x0: {
        sortOptions: SortOption[];
    }) => any;
    onHighlightRow?: (x0: number | string) => any;
    highlightedRowId?: number | string;
    tableOptions?: SimpleTableOptions;
    enableSelectAll: boolean;
    rowHeight?: number | ((x0: Record<string, any>, x1: number) => number);
    numFrozenColumns?: number;
    height?: number;
};
export declare const LargeWideTableComponent: React.FC<Props>;
export {};
