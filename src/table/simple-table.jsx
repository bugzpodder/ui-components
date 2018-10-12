// @flow
import React from "react";
import classNames from "classnames";
import styles from "./table.module.scss";
import { SpinnerOverlay } from "../spinner-overlay";
import { TableComponent } from "./components/table-component";

type Props = {
  /** Provides the information you wish to display */
  data: Array<Object>,
  /**
   * Defines the table structure.
   *
   * Must at least include a Cell or accessor key to identify which property in data to display
   */
  columns: Array<PagedTableColumn>,
  /**
   * Defaults to the row's `index`.
   *
   * The key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
   */
  idKey?: string | number,
  /** Table className. Can also be applied in classNames via `root` */
  className?: string,
  /**
   * Provides classNames to table sub-components. Options include:
   *
   *  - `root`: table's outermost div
   *
   *  - `rows`: table row. Can take a function to help specify a className for any specific row
   */
  classes?: PagedTableClasses,
  /** Provides a spinner when `isLoading` is true */
  isLoading?: boolean,
  /**
   * Enables checkbox selection.
   *
   * Must change the state of selectedRows
   */
  onSelect?: (Array<any>) => any,
  /** Provides the id's for the selected rows when onSelect is used */
  selectedRows?: Array<any>,
  /** Enables row highlighting */
  onHighlightRow?: (?string | ?number) => any,
  /** Provides the id for the highlighted row when onHighlightRow is used */
  highlightedRowId?: ?string | ?number,
  /** Parameters for onSort (see documentation for function) */
  tableOptions?: PagedTableOptions,
  /**
   * Enables sorting.
   *
   * Must change the state of `tableOptions {sortOptions: Array<{id: string, desc: boolean}>`
   */
  onSort?: Object => any,
  /** Enables the "select all" checkbox if specified (default: true). */
  enableSelectAll?: boolean,
};

/** Provides a simple table for displaying data, with the ability to opt into additional features. */
export const SimpleTable = (props: Props) => {
  const {
    columns, classes = {}, data, isLoading = false,
  } = props;
  if (!columns || !data) {
    throw new Error("data prop or columns prop or both are not provided");
  }
  return (
    <div className={classNames(styles.tableContainer, classes.tableContainer)}>
      <TableComponent {...props} />
      {isLoading && <SpinnerOverlay className={styles.spinnerOverlay} />}
    </div>
  );
};
