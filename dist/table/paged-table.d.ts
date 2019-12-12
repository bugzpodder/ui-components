import React, { ComponentProps, ReactNode } from "react";
import { CommonCard } from "../common-card";
import { PagedTableClasses, PagedTableColumn } from "../types/paged-table";
import { PagedTableOptions } from "../types/table";
import { SortOption } from "@grailbio/lib";
export declare type PagedTableProps = {
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
    /**
     * Provides classNames to table sub-components. Options include:
     *
     *  - `root`: card root div element
     *
     *  - `body`: table div container
     *
     *  - `pagination`: pagination div container
     *
     *  - `table`: `table` element
     *
     *  - `rows`: table row. Can take a function to help specify a className for any specific row
     */
    classes?: PagedTableClasses;
    /**
     * Defaults to the row's `index`.
     *
     * The key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
     */
    idKey?: string | number;
    /** Displays a spinner when `isLoading` is true */
    isLoading?: boolean;
    /** Includes an export button which allows users to download the contents of
     * the table in various formats. Defaults to true. */
    includeExportButton?: boolean;
    /** A function which takes no input and returns a promise to a list of the
     * data that will be exported if the user chooses the option "All rows on all
     * pages matching the given search filter" in the modal that appears when
     * they click the export button. If this function is not specified, such an
     * option does not appear and so users can only export the data present in
     * the table (which is limited by pagination). Has no effect if
     * `includeExportButton` is false. */
    fetchBulkExportRows?: () => Promise<Array<{
        [x: string]: any;
    }>>;
    /** Enables checkbox selection. Must change the state of selectedRows */
    onSelect?: (x0: any[]) => any;
    /** Provides the id's for the selected rows when onSelect is used */
    selectedRows?: any[];
    /** Enables row highlighting */
    onHighlightRow?: (x0?: string | number | null) => any;
    /** Provides the id for the highlighted row when onHighlightRow is used */
    highlightedRowId?: string | null | number | null;
    /** Parameters for onPageChange and onSort (see documentation for functions) */
    tableOptions?: PagedTableOptions;
    /** Title to display in card header */
    title?: ReactNode;
    /** Sub Title to display in card header */
    subheader?: ReactNode;
    /** Buttons to display in card header */
    headerActions?: ReactNode;
    /**
     * Enables card pagination.
     *
     * Must change the state of `tableOptions {count: number, offset: number}`
     */
    onPageChange?: (x0: {
        [x: string]: any;
    }) => any;
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
    /** Props for the CommonCard component */
    cardProps?: Partial<ComponentProps<typeof CommonCard>>;
    /** Add margins to card body */
    hasTableMargin?: boolean;
    /** If true, fill parent element with card and table (should specify parent height)
    If false, show as fixed height card. */
    isFullBleed?: boolean;
    /** Displays rows as shade when hovered over. Can only be used with onHighlightRow */
    shadeOnHover?: boolean;
    /** Allows user to show/hide columns. */
    hasColumnVisibilityChooser?: boolean;
    /** Provides id for the table. */
    id?: string;
    /** When false, turns off text wrapping for table headers */
    wrapHeader?: boolean;
    /** Add padding to the left of the table in pixels. This is most useful when the table is not selectable */
    paddingLeft?: number;
};
/** Provides a simple table for displaying data, with the ability to opt into additional features. */
export declare const PagedTable: React.FC<PagedTableProps>;
