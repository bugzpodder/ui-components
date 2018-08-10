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

type Props = {
  columns: Array<PagedTableColumn>,
  data: Array<Object>,
  isLoading: boolean,
  selectedRows: Array<number | string>,
  classes?: PagedTableClasses,
  idKey?: string | number,
  onPageChange?: (options: GetContentOptions) => any,
  onSelect?: (Array<any>) => any,
  onSort?: SortOption => any,
  sortingProps?: SortingProps,
  tableOptions?: PagedTableOptions,
  enableSelectAll: boolean,
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
    tableOptions,
    enableSelectAll,
  } = props;
  const sortingProps = { onSort, tableOptions };
  const selectionProps = {
    data,
    idKey,
    onSelect,
    selectedRows,
  };
  const tableColumns = onSelect ? [getCheckboxColumn(selectionProps), ...columns] : columns;
  return (
    <Table className={classes.table}>
      <TableHeader
        columns={tableColumns}
        // $FlowFixMe undefined props are incompatible with flow definitions.
        sortingProps={sortingProps}
        enableSelectAll={enableSelectAll}
      />
      <TableBody>
        {data.length > 0 &&
          data.map((instance, index) => {
            const id = idKey ? instance[idKey] : `${index}`;
            return (
              <PagedTableRow
                key={index}
                instance={instance}
                columns={tableColumns}
                rowId={id}
                rowIndex={index}
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
