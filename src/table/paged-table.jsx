// @flow
import React, { Fragment } from "react";
import classNames from "classnames";
import styles from "./table.module.scss";
import { CommonCard } from "../common-card";
import { SpinnerOverlay } from "../spinner-overlay";
import { TableComponent } from "./components/table-component";
import { TablePager } from "./components/table-pager";

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
  classes?: PagedTableClasses,
  /**
   * Defaults to the row's `index`.
   *
   * The key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
   */
  idKey?: string | number,
  /** Provides a spinner when `isLoading` is true */
  isLoading?: boolean,
  /** Enables checkbox selection. Must change the state of selectedRows */
  onSelect?: (Array<any>) => any,
  /** Provides the id's for the selected rows when onSelect is used */
  selectedRows?: Array<any>,
  /** Parameters for onPageChange and onSort (see documentation for functions) */
  tableOptions?: PagedTableOptions,
  /** Title to display in card header */
  title?: string,
  /** Buttons to display in card header */
  headerActions?: Node<*>,
  /**
   * Enables card pagination.
   *
   * Must change the state of `tableOptions {count: number, offset: number}`
   */
  onPageChange?: Object => any,
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
export const PagedTable = (props: Props) => {
  const {
    onPageChange, headerActions = null, title = "", ...tableProps
  } = props;
  const {
    classes = {}, columns, data, isLoading = false, onSelect, selectedRows, tableOptions,
  } = tableProps;
  if (!columns || !data) {
    throw new Error("data prop or columns prop or both are not provided");
  }
  const rowCount = data.length;
  const paginationProps = {
    onPageChange,
    onSelect,
    rowCount,
    selectedRows,
    tableOptions,
  };
  const numberSelected = (selectedRows && selectedRows.length) || 0;
  const cardTitle = `${title}${numberSelected > 0 ? ` (${numberSelected} Selected)` : ""}`;
  return (
    <Fragment>
      <CommonCard
        title={cardTitle}
        headerActions={headerActions}
        footerActions={onPageChange ? <TablePager paginationProps={paginationProps} /> : null}
        data-testid="paged-table"
        classes={{
          root: classNames(styles.pagedTableCardRoot, classes.root),
          body: classNames(styles.pagedTableCardBody, styles.tableContainer, classes.tableContainer, classes.body),
          footer: classNames(styles.pagedTableCardFooter, { [styles.tableFooter]: onPageChange }, classes.pagination),
        }}
      >
        <TableComponent {...tableProps} />
      </CommonCard>
      {isLoading && <SpinnerOverlay />}
    </Fragment>
  );
};
