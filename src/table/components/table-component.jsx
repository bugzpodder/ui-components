// @flow
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import classNames from "classnames";
import styles from "../table.module.scss";
import { PagedTableRow } from "./table-row";
import { TableHeader } from "./table-header";
import { getCheckboxColumn } from "../utilities/checkbox-column";
import { getRowId, handleKeyboardHighlight } from "../utilities/row-utils";

type Props = {
  columns: Array<PagedTableColumn>,
  data: Array<Object>,
  isLoading: boolean,
  selectedRows: Array<number | string>,
  classes?: PagedTableClasses,
  idKey?: string | number,
  onSelect?: (Array<any>) => any,
  onSort?: SortOption => any,
  onHighlightRow?: (?number | ?string) => any,
  highlightedRowId?: ?number | ?string,
  tableOptions?: SimpleTableOptions,
  enableSelectAll: boolean,
  shadeOnHover: boolean,
};

export const TableComponent = (props: Props) => {
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
  let tableColumns = onSelect ? [getCheckboxColumn(selectionProps), ...columns] : columns;
  tableColumns = tableColumns.filter(column => !column.excludeFromTable);
  const hasHeaders = tableColumns.find(column => column.Header);
  return (
    <Table
      tabIndex="0"
      data-testid="table"
      onKeyDown={event => handleKeyboardHighlight(event, highlightRowProps)}
      className={classNames(classes.table, styles.table)}
      {...tableProps}
    >
      {hasHeaders && (
        <TableHeader
          columns={tableColumns}
          // $FlowFixMe undefined props are incompatible with flow definitions.
          sortingProps={sortingProps}
          enableSelectAll={enableSelectAll}
        />
      )}
      <TableBody>
        {data.length > 0 &&
          data.map((instance, index) => {
            const rowId = getRowId(idKey, instance, index);
            return (
              <PagedTableRow
                selectionProps={selectionProps}
                key={index}
                instance={instance}
                columns={tableColumns}
                rowId={rowId}
                rowIndex={index}
                shadeOnHover={shadeOnHover}
                className={classes.rows || ""}
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
