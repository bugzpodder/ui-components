// @flow
import { type ExportableColumn } from "@grailbio/lib";
import { type Node } from "react";

declare type Sorting = {
  id: string,
  desc: boolean,
};

declare type PagedTableCell = {
  accessor: string | Function,
  rowId: string | number,
  rowIndex: number,
  instance: Object,
  label: string,
  original: Object,
  value: any,
};

declare type InternalPagedTableColumn = {
  index: number,
  isVisible: boolean,
} & PagedTableColumn;

declare type PagedTableColumn = {
  Header?: Node<*>,
  sortable?: boolean,
  Cell?: Node<PagedTableCell>,
  headerClassName?: string,
  className?: string | Function,
  isSingleIcon?: boolean,
  accessor?: string | (Object => string),
  // If true, this column will not be included in the exported table data.
  excludeFromExport?: boolean,
  // If true, this column will not be displayed in the table UI.
  excludeFromTable?: boolean,
  // Only relevant for LargeSimpleTable's using the `isWide` prop; defines the
  // width of the column in pixels. Defaults to 150px.
  width?: number,
  // If defined, this field is used instead of the "accessor" field to sort by.
  // Typically useful when "accessor" is a function.
  sortAccessor?: string,
  // Defines whether or not the column should be shown or hidden by default. If
  // hidden by default, it can be enabled using the column chooser. This prop
  // has no effect if hasColumnVisibilityChooser is false. Defaults to true.
  showByDefault?: boolean,
  // If true, this column cannot be hidden via the column visibility chooser.
  // This prop has no effect if hasColumnVisibilityChooser is false. Defaults to
  // false.
  isRequired?: boolean,
} & $Shape<ExportableColumn>;

declare type PagedTableClasses = {
  root?: string,
  body?: string,
  rows?: string | Function,
  pagination?: string,
  table?: string,
  tableContainer?: string,
};

declare type SelectionProps = {
  data: Array<Object>,
  idKey?: string | number,
  selectedRows?: Array<string | number>,
  onSelect?: (Array<string | number>) => any,
  onHighlightRow?: (?string | ?number) => any,
  highlightedRowId?: ?string | ?number,
};

declare type PaginationProps = {
  rowCount: number,
  tableOptions?: PagedTableOptions,
  onPageChange?: Object => any,
  onSelect?: (Array<any>) => any,
};

declare type SortingProps = {
  onSort?: ({ sortOptions: SortOptions }) => any,
  tableOptions?: SimpleTableOptions,
};

declare type HighlightRowProps = {
  data: Array<Object>,
  idKey?: string | number,
  onHighlightRow?: (?string | ?number) => any,
  highlightedRowId: ?string | number,
};
