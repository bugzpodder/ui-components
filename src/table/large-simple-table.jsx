// @flow
import React from "react";
import classNames from "classnames";
import styles from "./table.module.scss";
import { LargeTableComponent } from "./components/large-table-component";
import { SpinnerOverlay } from "../spinner-overlay";

type Props = {
  /** id for the table element */
  id?: string,
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
  enableSelectAll?: boolean,
};

/** Provides a large simple table for displaying data, with the ability to opt into additional features. */
export const LargeSimpleTable = (props: Props) => {
  const {
    columns, classes = {}, data, isLoading = false,
  } = props;
  if (!columns || !data) {
    throw new Error("data prop or columns prop or both are not provided");
  }
  return (
    <div className={classNames(styles.tableContainer, classes.tableContainer)}>
      <LargeTableComponent {...props} />
      {isLoading && <SpinnerOverlay className={styles.spinnerOverlay} />}
    </div>
  );
};
