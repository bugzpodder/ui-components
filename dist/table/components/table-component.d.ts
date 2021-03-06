/// <reference types="react" />
import { PagedTableClasses, PagedTableColumn } from "../../types/paged-table";
import { SimpleTableOptions } from "../../types/table";
import { SortOption } from "@grailbio/lib";
declare type Props = {
    columns: PagedTableColumn<any>[];
    data: Record<string, any>[];
    isLoading: boolean;
    selectedRows: Array<number | string>;
    classes?: PagedTableClasses;
    idKey?: string | number;
    onSelect?: (x0: any[]) => any;
    onSort?: (x0: {
        sortOptions: SortOption[];
    }) => any;
    onHighlightRow?: (x0?: number | string | null) => any;
    highlightedRowId?: number | string | null;
    tableOptions?: SimpleTableOptions;
    enableSelectAll: boolean;
    shadeOnHover: boolean;
    hasColumnVisibilityChooser?: boolean;
    wrapHeader?: boolean;
    adjustWithSelectableTable?: boolean;
};
export declare const TableComponent: (props: Props) => JSX.Element;
export {};
