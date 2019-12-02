import React from "react";
import { PagedTableClasses, PagedTableColumn } from "../types/paged-table";
import { SimpleTableOptions } from "../types/table";
import { SortOption } from "@grailbio/lib";
declare type Props = {
    /** Provides the information you wish to display */
    data: Array<{
        [x: string]: any;
    }>;
    /**
     * Defines the table structure.
     *
     * Must at least include a Cell or accessor key to identify which property in data to display
     */
    columns: PagedTableColumn<any>[];
    /** Provides an id to the component */
    id?: string;
    /**
     * Defaults to the row's `index`.
     *
     * The key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
     */
    idKey?: string | number;
    /** Table className. Can also be applied in classNames via `root` */
    className?: string;
    /**
     * Provides classNames to table sub-components. Options include:
     *
     *  - `root`: table's outermost div
     *
     *  - `rows`: table row. Can take a function to help specify a className for any specific row
     */
    classes?: PagedTableClasses;
    /** Provides a spinner when `isLoading` is true */
    isLoading?: boolean;
    /**
     * Enables checkbox selection.
     *
     * Must change the state of selectedRows
     */
    onSelect?: (x0: any[]) => any;
    /** Provides the id's for the selected rows when onSelect is used */
    selectedRows?: any[];
    /** Enables row highlighting */
    onHighlightRow?: (x0?: string | number | null) => any;
    /** Provides the id for the highlighted row when onHighlightRow is used */
    highlightedRowId?: string | null | number | null;
    /** Parameters for onSort (see documentation for function) */
    tableOptions?: SimpleTableOptions;
    /**
     * Enables sorting.
     *
     * Must change the state of `tableOptions {sortOptions: Array<{id: string, desc: boolean}>`
     */
    onSort?: (x0: {
        sortOptions: SortOption[];
    }) => any;
    /** Enables the "select all" checkbox if specified (default: true). */
    enableSelectAll?: boolean;
    /** Displays rows as shade when hovered over. Can only be used with onHighlightRow */
    shadeOnHover?: boolean;
    /** Allows user to show/hide columns. */
    hasColumnVisibilityChooser?: boolean;
};
/** Provides a simple table for displaying data, with the ability to opt into additional features. */
export declare const SimpleTable: React.FC<Props>;
export {};
