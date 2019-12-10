import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import classNames from "classnames";
import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";
import styles from "../table.module.scss";
import { PagedTableClasses, PagedTableColumn } from "../../types/paged-table";
import { PagedTableRow } from "./table-row";
import { SimpleTableOptions } from "../../types/table";
import { SortOption } from "@grailbio/lib";
import { TableHeader } from "./table-header";
import { getCheckboxColumn } from "../utilities/checkbox-column";
import { getRowId, handleKeyboardHighlight } from "../utilities/row-utils";

type Props = {
  columns: PagedTableColumn<any>[];
  data: Array<{
    [x: string]: any;
  }>;
  isLoading: boolean;
  selectedRows: Array<number | string>;
  classes?: PagedTableClasses;
  idKey?: string | number;
  onSelect?: (x0: any[]) => any;
  onSort?: (x0: { sortOptions: SortOption[] }) => any;
  onHighlightRow?: (x0?: number | string | null) => any;
  highlightedRowId?: number | string | null;
  tableOptions?: SimpleTableOptions;
  enableSelectAll: boolean;
  shadeOnHover: boolean;
  hasColumnVisibilityChooser?: boolean;
  wrapHeader?: boolean;
  paddingLeft?: number;
};

export const TableComponent: React.FC<Props> = props => {
  const {
    classes = {},
    columns,
    data,
    idKey,
    isLoading,
    onSelect,
    onSort,
    selectedRows,
    onHighlightRow,
    highlightedRowId,
    tableOptions,
    enableSelectAll,
    shadeOnHover,
    hasColumnVisibilityChooser = false,
    wrapHeader = true,
    paddingLeft = 20,
    ...tableProps
  } = props;
  const sortingProps = { onSort, tableOptions };
  const selectionProps = {
    data,
    idKey,
    onSelect,
    selectedRows,
    onHighlightRow,
    highlightedRowId,
  };
  const highlightRowProps = {
    data,
    idKey,
    onHighlightRow,
    highlightedRowId,
  };
  const availableColumns = columns
    .filter(column => column.excludeFromTable !== true)
    .map((column, index) => ({
      ...column,
      index,
    }));
  const [columnVisibility, setColumnVisibility] = useState<{
    [x0: number]: boolean;
  }>(
    // This simply constructs a map from the column index to a boolean
    // representing whether or not the column is visible.
    mapValues(
      keyBy(availableColumns, column => column.index),
      // TODO(ecarrel): maybe retrieve visibility values from localstorage once
      //  they are stored there.
      column => column.showByDefault !== false,
    ),
  );
  let tableColumns = availableColumns.map(column => ({
    ...column,
    isVisible: !hasColumnVisibilityChooser || columnVisibility[column.index],
  }));
  if (onSelect) {
    tableColumns = [getCheckboxColumn(selectionProps), ...tableColumns];
  }
  const hasHeaders = tableColumns.find(column => column.Header);
  const canSelect = !!(onSelect && selectedRows);
  return (
    <Table
      tabIndex={0}
      data-testid="table"
      onKeyDown={event => handleKeyboardHighlight(event, highlightRowProps)}
      className={classNames(classes.table, styles.table)}
      {...tableProps}
    >
      {hasHeaders && (
        <TableHeader
          canSelect={canSelect}
          paddingLeft={paddingLeft}
          wrapHeader={wrapHeader}
          columns={tableColumns}
          sortingProps={sortingProps}
          enableSelectAll={enableSelectAll}
          hasColumnVisibilityChooser={hasColumnVisibilityChooser}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      )}
      <TableBody>
        {data.length > 0 &&
          data.map((instance, index) => {
            const rowId = getRowId(idKey, instance, index);
            return (
              <PagedTableRow
                paddingLeft={paddingLeft}
                selectionProps={selectionProps}
                canSelect={canSelect}
                key={index}
                instance={instance}
                columns={tableColumns}
                rowId={rowId}
                rowIndex={index}
                shadeOnHover={shadeOnHover}
                className={classes.rows || ""}
                hasColumnVisibilityChooser={hasColumnVisibilityChooser}
              />
            );
          })}
        {!data.length && (
          <TableRow>
            <TableCell
              colSpan={tableColumns.length}
              className={classNames("no-results", styles.noResults)}
            >
              {!isLoading && "0 Results"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
