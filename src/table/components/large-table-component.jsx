// @flow
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./large-table.module.scss";
import { AutoSizer, Column, Table } from "react-virtualized";
import { LargeTableHeader } from "./large-table-header";
import { getCheckboxColumn } from "../utilities/checkbox-column";
import { getRowId } from "../utilities/row-utils";

type Props = {
  id?: string,
  columns: Array<PagedTableColumn>,
  data: Array<Object>,
  isLoading: boolean,
  selectedRows: Array<number | string>,
  classes?: PagedTableClasses,
  idKey?: string | number,
  onSelect?: (Array<any>) => any,
  onHighlightRow?: (?number | ?string) => any,
  highlightedRowId?: ?number | ?string,
  enableSelectAll: boolean,
};

export const LargeTableComponent = (props: Props) => {
  const {
    id,
    classes = {},
    columns,
    data,
    idKey,
    isLoading,
    onSelect,
    selectedRows,
    onHighlightRow,
    highlightedRowId,
    enableSelectAll = true,
  } = props;
  if (!isLoading && data.length === 0) {
    return <Typography>No data</Typography>;
  }
  const selectionProps = {
    data,
    idKey,
    onSelect,
    selectedRows,
    onHighlightRow,
    highlightedRowId,
  };
  const tableColumns = onSelect ? [getCheckboxColumn(selectionProps), ...columns] : columns;
  return (
    <div>
      <LargeTableHeader
        data={data}
        tableColumns={tableColumns}
        enableSelectAll={enableSelectAll}
      />
      <AutoSizer disableHeight>
        {({ width }) => {
          return (
            <Table
              id={id}
              height={300}
              overscanRowCount={1}
              rowCount={data.length}
              rowHeight={50}
              width={width}
              disableHeader
              className={classNames(styles.table, classes.table)}
              rowClassName={({ index }) => {
                if (index < 0) {
                  return styles.headerRow;
                }
                const rowData = data[index];
                let rowClassName = classes.rows;
                if (typeof rowClassName === "function") {
                  rowClassName = rowClassName(rowData, index);
                }
                return classNames(styles.row, rowClassName, {
                  [styles.highlightedRow]: highlightedRowId === getRowId(idKey, rowData, index),
                });
              }}
              rowGetter={({ index }) => data[index]}
            >
              {tableColumns.map(({
                Cell, Header, accessor = "", className = "", isSingleIcon,
              }, columnIndex) => {
                const isCheckboxColumn = accessor === "COLUMN_SELECT";
                return (
                  <Column
                    key={columnIndex}
                    width={50}
                    flexGrow={isCheckboxColumn ? undefined : 1}
                    dataKey={accessor}
                    cellRenderer={({ rowData, rowIndex }) => {
                      const rowId = getRowId(idKey, rowData, rowIndex);
                      const itemKey = `${rowId}-${rowIndex}`;
                      let value = "";
                      if (typeof accessor === "string") {
                        value = rowData[accessor];
                      } else if (typeof accessor === "function") {
                        value = accessor(rowData);
                      }
                      let inner = null;
                      if (Cell) {
                        inner = Cell({
                          instance: rowData,
                          original: rowData,
                          value,
                          accessor,
                          rowId,
                          rowIndex,
                          label: Header || "",
                        });
                      } else {
                        inner = <Typography>{value}</Typography>;
                      }
                      if (typeof className === "function") {
                        className = className(value);
                      }
                      return (
                        <div
                          key={itemKey}
                          data-cell-id={itemKey}
                          className={classNames(className, {
                            [styles.tableCell]: !isCheckboxColumn,
                            [styles.singleIcon]: isSingleIcon || isCheckboxColumn,
                          })}
                          onClick={onHighlightRow ? () => onHighlightRow(rowId) : undefined}
                        >
                          {inner}
                        </div>
                      );
                    }}
                  />
                );
              })}
            </Table>
          );
        }}
      </AutoSizer>
    </div>
  );
};
