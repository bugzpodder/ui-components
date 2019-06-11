// @flow
import { type ExportableColumn } from "@grail/lib";
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
  onSort: ({ sortOptions: SortOptions }) => any,
  tableOptions: PagedTableOptions,
};

declare type HighlightRowProps = {
  data: Array<Object>,
  idKey?: string | number,
  onHighlightRow?: (?string | ?number) => any,
  highlightedRowId: ?string | number,
};
