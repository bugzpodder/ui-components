import React from "react";

import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./large-table.module.scss";
import { AutoSizer, Column, Table } from "react-virtualized";
import { LargeTableHeader } from "./large-table-header";
import { PagedTableClasses, PagedTableColumn } from "../../types/paged-table";
import { SimpleTableOptions } from "../../types/table";
import { SortOption } from "@grailbio/lib";
import { getCheckboxColumn } from "../utilities/checkbox-column";
import { getRowId } from "../utilities/row-utils";

type Props = {
  id?: string;
  columns: PagedTableColumn[];
  data: Array<Record<string, any>>;
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
  rowHeight?: number | ((x0: Record<string, any>, x1: number) => number);
};

export const LargeTableComponent: React.FC<Props> = props => {
  const {
    id,
    classes = {},
    columns,
    data,
    idKey,
    isLoading,
    onSelect,
    onSort,
    selectedRows,
    onHighlightRow,
    tableOptions,
    highlightedRowId,
    enableSelectAll = true,
    rowHeight,
  } = props;
  if (!isLoading && data.length === 0) {
    return <Typography>No data</Typography>;
  }
  const sortingProps = { onSort, tableOptions };
  const selectionProps = {
    data,
    idKey,
    onSelect,
    selectedRows,
    onHighlightRow,
    highlightedRowId,
  };
  const tableColumns = onSelect
    ? [getCheckboxColumn(selectionProps), ...columns]
    : columns;
  return (
    <div>
      <LargeTableHeader
        tableColumns={tableColumns}
        sortingProps={sortingProps}
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
              headerHeight={0}
              rowHeight={({ index }) => {
                if (typeof rowHeight === "function") {
                  return rowHeight(data[index], index);
                }
                return rowHeight || 50;
              }}
              // FIXME (jsingh): Table props.width doesn't seem to work correctly. Overwriting with scss.
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
                  [styles.highlightedRow]:
                    highlightedRowId === getRowId(idKey, rowData, index),
                });
              }}
              rowGetter={({ index }) => data[index]}
              gridStyle={{ overflow: "hidden scroll" }}
            >
              {tableColumns.map(
                (
                  { Cell, Header, accessor = "", className = "", isSingleIcon },
                  columnIndex,
                ) => {
                  const isCheckboxColumn = accessor === "COLUMN_SELECT";
                  return (
                    <Column
                      key={columnIndex}
                      width={50}
                      flexGrow={isCheckboxColumn ? undefined : 1}
                      // @ts-ignore accessor is not assignable to type.
                      dataKey={accessor}
                      cellRenderer={({ rowData, rowIndex }) => {
                        const rowId = getRowId(idKey, rowData, rowIndex);
                        const itemKey = `${rowId}-${columnIndex}`;
                        let value = "";
                        if (typeof accessor === "string") {
                          value = rowData[accessor];
                        } else if (typeof accessor === "function") {
                          value = accessor(rowData);
                        }
                        let inner = null;
                        if (Cell) {
                          // N.B. The Cell is instantiated as a pure function instead of a React element.
                          // This makes the Cell able to flexibly render any elements (like inputs) without changes
                          // to their internal state causing rerenders of the entire table.
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
                              [styles.singleIcon]:
                                isSingleIcon || isCheckboxColumn,
                            })}
                            onClick={
                              onHighlightRow
                                ? () => onHighlightRow(rowId)
                                : undefined
                            }
                          >
                            {inner}
                          </div>
                        );
                      }}
                    />
                  );
                },
              )}
            </Table>
          );
        }}
      </AutoSizer>
    </div>
  );
};
