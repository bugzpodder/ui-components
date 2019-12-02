import AutoSizer from "react-virtualized-auto-sizer";
import React from "react";
import classNames from "classnames";
import styles from "./table.module.scss";
import { LargeTableComponent } from "./components/large-table-component";
import { PagedTableClasses, PagedTableColumn } from "../types/paged-table";
import { SimpleTableOptions } from "../types/table";
import { SortOption } from "@grailbio/lib";
import { SpinnerOverlay } from "../spinner-overlay";

type Props = {
  /** id for the table element */
  id?: string;
  /** Provides the information you wish to display */
  data: Array<{
    [x: string]: any;
  }>;
  /**
   * Defines the table structure.
   *
   * Must at least include a Cell or accessor key to identify which property in data to display.
   */
  columns: PagedTableColumn<any>[];
  /**
   * Defaults to the row's `index`.
   *
   * The key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
   */
  idKey?: string | number;
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
  /** Provides the ids for the selected rows when onSelect is used */
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
  onSort?: (x0: { sortOptions: SortOption[] }) => any;
  enableSelectAll?: boolean;
  /**
   * Provides the rowHeight for each row of the table. Can take either a number
   * or function. The function takes as parameters the data for the row and the
   * index of the row.
   */
  rowHeight?:
    | number
    | ((
        x0: {
          [x: string]: any;
        },
        x1: number,
      ) => number);
  /**
   * Enables left-right scrolling rather than squeezing all columns into the
   * viewable area. Defaults to false.
   */
  isWide?: boolean;
  /**
   * Only relevant if `isWide` is true. The number of columns that stay stuck to
   * the left side when the table is scrolled to the right. Defaults to one. If
   * the table is selectable, the checkbox column does not count towards this
   * number.
   */
  numFrozenColumns?: number;
  /**
   * If true, autosize the table to fill the entire height of the parent. Defaults to false.
   */
  autosizeHeight?: boolean;
};

/** Provides a large simple table for displaying data, with the ability to opt into additional features. */
export const LargeSimpleTable: React.FC<Props> = props => {
  const {
    columns,
    classes = {},
    data,
    isLoading = false,
    autosizeHeight = false,
  } = props;
  const {
    isWide = false,
    numFrozenColumns = isWide ? 1 : 0,
    ...otherProps
  } = props;
  if (!columns || !data) {
    throw new Error("data prop or columns prop or both are not provided");
  }

  return (
    <div
      className={classNames(styles.tableContainer, classes.tableContainer, {
        [styles.autosizeHeight]: autosizeHeight,
      })}
    >
      {autosizeHeight ? (
        <AutoSizer disableWidth>
          {({ height }) => {
            // @ts-ignore height does not exist.
            return (
              <LargeTableComponent
                height={height}
                numFrozenColumns={numFrozenColumns}
                isLoading={isLoading}
                {...otherProps}
              />
            );
          }}
        </AutoSizer>
      ) : (
        // @ts-ignore some props are required.
        <LargeTableComponent
          numFrozenColumns={numFrozenColumns}
          {...otherProps}
        />
      )}
      {isLoading && <SpinnerOverlay className={styles.spinnerOverlay} />}
    </div>
  );
};
