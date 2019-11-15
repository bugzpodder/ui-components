import { ReactNode } from "react";
import { ExportableColumn, SortOption } from "@grailbio/lib";
import { PagedTableOptions, SimpleTableOptions } from "./table";
export declare type Sorting = {
    id: string;
    desc: boolean;
};
export declare type PagedTableCell = {
    accessor: string | Function;
    rowId: string | number;
    rowIndex: number;
    instance: Record<string, any>;
    label: string;
    original: Record<string, any>;
    value: any;
};
export declare type InternalPagedTableColumn = PagedTableColumn & {
    index: number;
    isVisible: boolean;
};
export declare type PagedTableColumn = ExportableColumn & {
    Header?: ReactNode;
    sortable?: boolean;
    Cell?: React.FC<any>;
    headerClassName?: string;
    className?: string | Function;
    isSingleIcon?: boolean;
    accessor?: string | ((x0: Record<string, any>) => string);
    excludeFromExport?: boolean;
    excludeFromTable?: boolean;
    width?: number;
    sortAccessor?: string;
    showByDefault?: boolean;
    isRequired?: boolean;
};
export declare type PagedTableClasses = {
    root?: string;
    body?: string;
    rows?: string | Function;
    pagination?: string;
    table?: string;
    tableContainer?: string;
};
export declare type SelectionProps = {
    data: Record<string, any>[];
    idKey?: string | number;
    selectedRows?: Array<string | number>;
    onSelect?: (x0: Array<string | number>) => any;
    onHighlightRow?: (x0: string | number | null) => any;
    highlightedRowId?: string | number | null;
};
export declare type PaginationProps = {
    rowCount: number;
    tableOptions?: PagedTableOptions;
    onPageChange?: (x0: Record<string, any>) => any;
    onSelect?: (x0: any[]) => any;
};
export declare type SortingProps = {
    onSort?: (x0: {
        sortOptions: SortOption[];
    }) => any;
    tableOptions?: SimpleTableOptions;
};
export declare type HighlightRowProps = {
    data: Record<string, any>[];
    idKey?: string | number;
    onHighlightRow?: (x0: string | number) => any;
    highlightedRowId: string | number | null;
};
