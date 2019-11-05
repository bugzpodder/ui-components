// @flow
import { ExportableColumn } from "@grailbio/lib";
import { PagedTableOptions, SimpleTableOptions } from "./table";
import { ReactNode } from "react";
import { SortOption } from "./api";

export type Sorting = {
  id: string;
  desc: boolean;
};

export type PagedTableCell = {
  accessor: string | Function;
  rowId: string | number;
  rowIndex: number;
  instance: Record<string, any>;
  label: string;
  original: Record<string, any>;
  value: any;
};

export type InternalPagedTableColumn = PagedTableColumn & {
  index: number;
  isVisible: boolean;
};

export type PagedTableColumn = ExportableColumn & {
  Header?: ReactNode;
  sortable?: boolean;
  Cell?: ReactNode;
  headerClassName?: string;
  className?: string | Function;
  isSingleIcon?: boolean;
  accessor?: string | ((x0: Record<string, any>) => string);
  // If true, this column will not be included in the exported table data.
  excludeFromExport?: boolean;
  // If true, this column will not be displayed in the table UI.
  excludeFromTable?: boolean;
  // Only relevant for LargeSimpleTable's using the `isWide` prop; defines the
  // width of the column in pixels. Defaults to 150px.
  width?: number;
  // If defined, this field is used instead of the "accessor" field to sort by.
  // Typically useful when "accessor" is a function.
  sortAccessor?: string;
  // Defines whether or not the column should be shown or hidden by default. If
  // hidden by default, it can be enabled using the column chooser. This prop
  // has no effect if hasColumnVisibilityChooser is false. Defaults to true.
  showByDefault?: boolean;
  // If true, this column cannot be hidden via the column visibility chooser.
  // This prop has no effect if hasColumnVisibilityChooser is false. Defaults to
  // false.
  isRequired?: boolean;
};

export type PagedTableClasses = {
  root?: string;
  body?: string;
  rows?: string | Function;
  pagination?: string;
  table?: string;
  tableContainer?: string;
};

export type SelectionProps = {
  data: Record<string, any>[];
  idKey?: string | number;
  selectedRows?: Array<string | number>;
  onSelect?: (x0: Array<string | number>) => any;
  onHighlightRow?: (x0: string | number | null) => any;
  highlightedRowId?: string | number | null;
};

export type PaginationProps = {
  rowCount: number;
  tableOptions?: PagedTableOptions;
  onPageChange?: (x0: Record<string, any>) => any;
  onSelect?: (x0: any[]) => any;
};

export type SortingProps = {
  onSort?: (x0: { sortOptions: SortOption[] }) => any;
  tableOptions?: SimpleTableOptions;
};

export type HighlightRowProps = {
  data: Record<string, any>[];
  idKey?: string | number;
  onHighlightRow?: (x0: string | number) => any;
  highlightedRowId: string | number | null;
};
