// @flow
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./large-table.module.scss";
import { AutoSizer, Grid, ScrollSync } from "react-virtualized";
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
  rowHeight?: number | ((Object, number) => number),
  numFrozenColumns?: number,
};

export const LargeWideTableComponent = (props: Props) => {
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
    rowHeight = 50,
  } = props;
  let { numFrozenColumns = 1 } = props;
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
  const defaultColumnSize = 150;
  const height = 300;
  const overscanColumnCount = 1;
  const overscanRowCount = 1;
  const rowCount = data.length;
  const scrollbarSize = 20;

  // Add a checkbox column if it exists.
  const tableColumns = onSelect
    ? [
      {
        width: 50,
        ...getCheckboxColumn(selectionProps),
      },
      ...columns,
    ]
    : columns;
  // Increment numFrozenColumns by one if there is a checkbox column because the
  // checkbox column does not count towards numFrozenColumns.
  if (onSelect) {
    numFrozenColumns += 1;
  }
  const columnCount = tableColumns.length;

  const renderCell = ({ columnIndex, rowIndex, style }) => {
    const {
      Cell, Header, accessor = "", className = "", isSingleIcon,
    } = tableColumns[columnIndex];
    const isCheckboxColumn = accessor === "COLUMN_SELECT";
    const rowData = data[rowIndex];
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
    let columnClassName = className;
    if (typeof className === "function") {
      columnClassName = className(value);
    }
    let rowClassName = classes.rows;
    if (typeof rowClassName === "function") {
      rowClassName = rowClassName(rowData, rowIndex);
    }
    const rowIsHighlighted = highlightedRowId === rowId;
    const isRightmostFrozenColumn = columnIndex === numFrozenColumns - 1;
    const isLeftmostUnfrozenColumn = columnIndex === numFrozenColumns;
    return (
      <div
        key={itemKey}
        data-cell-id={itemKey}
        style={style}
        className={classNames(columnClassName, styles.largeWideTableCell, rowClassName, {
          [styles.tableCell]: !isCheckboxColumn,
          [styles.singleIcon]: isSingleIcon || isCheckboxColumn,
          [styles.highlightedCell]: rowIsHighlighted,
          [styles.highlightedRow]: rowIsHighlighted && isCheckboxColumn,
          [styles.isRightmostFrozenColumn]: isRightmostFrozenColumn,
          [styles.isLeftmostUnfrozenColumn]: isLeftmostUnfrozenColumn,
        })}
        onClick={onHighlightRow ? () => onHighlightRow(rowId) : undefined}
      >
        {inner}
      </div>
    );
  };

  const renderHeader = ({ columnIndex, style }) => {
    const tableColumn = tableColumns[columnIndex];
    const {
      Header, accessor = "", headerClassName, isSingleIcon,
    } = tableColumn;
    const isCheckboxColumn = accessor === "COLUMN_SELECT";
    if (isCheckboxColumn && !enableSelectAll) {
      return null;
    }
    const fieldId = typeof accessor === "string" ? accessor : "";
    const isRightmostFrozenColumn = columnIndex === numFrozenColumns - 1;
    const isLeftmostUnfrozenColumn = columnIndex === numFrozenColumns;
    return (
      <div
        key={columnIndex}
        style={style}
        className={classNames(headerClassName, styles.headerCell, styles.headerRow, {
          [`${fieldId}-header`]: fieldId,
          [styles.singleIcon]: isCheckboxColumn || isSingleIcon,
          [styles.tableHeader]: !isCheckboxColumn,
          [styles.isRightmostFrozenColumn]: isRightmostFrozenColumn,
          [styles.isLeftmostUnfrozenColumn]: isLeftmostUnfrozenColumn,
        })}
      >
        <div className={styles.headerText}>{Header}</div>
      </div>
    );
  };

  const columnWidths = tableColumns.map(({ width = defaultColumnSize }, columnIndex) => {
    // 10px of padding is added to the leftmost unfrozen column, encroaching on
    // the rest of its space by 10px. Add 10px to counteract this.
    const isLeftmostUnfrozenColumn = columnIndex === numFrozenColumns;
    if (isLeftmostUnfrozenColumn) {
      return width + 10;
    }
    return width;
  });
  // TODO(ecarrel): use recomputeGridSize to force a re-render if columnWidths
  //  change. Currently, that does not happen.

  let columnWidthProducer = ({ index }: { index: number }) => columnWidths[index];
  const rowHeightFunction = ({ index }) => {
    if (typeof rowHeight === "function") {
      const rowData = index < data.length ? data[index] : {};
      return rowHeight(rowData, index);
    }
    return rowHeight || 50;
  };
  const firstRowHeight = rowHeightFunction({ index: 0 });

  return (
    <div
      className={classNames(styles.table, classes.table)}
      id={id}
    >
      <ScrollSync>
        {({ onScroll, scrollLeft, scrollTop }) => {
          const frozenColumnsWidth = columnWidths.slice(0, numFrozenColumns).reduce((sum, width) => sum + width);

          // The cells of the table are partitioned into four Grid components,
          // representing the four quadrants of the graph that are produced if
          // we draw one vertical line separating the frozen column(s) from the
          // unfrozen ones and one horizontal line separating the header row
          // from the data cells. Each cell gets rendered as part of only one
          // Grid. Having four grids is necessary in order for the header row to
          // stay in place while the remaining rows scroll up and down and for
          // the frozen columns to stay in place while the unfrozen columns
          // scroll left and right.

          // For example, in a table with two frozen columns, here is how the
          // cells would be distributed across the four Grids:

          // Legend:
          // - A = frozen header cell
          // - B = frozen data cell
          // - C = unfrozen header cell
          // - D = unfrozen data cell
          // +---+---++---+---+---+---+---+
          // | A | A || C | C | C | C | … |
          // +===+===++===+===+===+===+===+
          // | B | B || D | D | D | D | … |
          // +---+---++---+---+---+---+---+
          // | B | B || D | D | D | D | … |
          // +---+---++---+---+---+---+---+
          // | B | B || D | D | D | D | … |
          // +---+---++---+---+---+---+---+
          // | … | … || … | … | … | … | … |
          // +---+---++---+---+---+---+---+

          // This design is based off the ScrollSync example here:
          // Demo: http://bvaughn.github.io/react-virtualized/#/components/ScrollSync
          // Code: https://github.com/bvaughn/react-virtualized/blob/master/source/ScrollSync/ScrollSync.example.js

          return (
            <div className={styles.gridRow}>
              <div
                className={styles.frozenColumnsGridContainer}
                style={{
                  top: 0,
                }}
              >
                <Grid
                  // This Grid corresponds to grid A in the example above.
                  rowCount={1}
                  columnCount={numFrozenColumns}
                  columnWidth={columnWidthProducer}
                  estimatedColumnSize={defaultColumnSize}
                  width={frozenColumnsWidth}
                  height={firstRowHeight}
                  rowHeight={rowHeightFunction}
                  cellRenderer={renderHeader}
                  className={styles.headerGrid}
                  overscanColumnCount={overscanColumnCount}
                  overscanRowCount={overscanRowCount}
                />
              </div>
              <div
                className={styles.frozenColumnsGridContainer}
                style={{
                  top: firstRowHeight,
                }}
              >
                <Grid
                  // This Grid corresponds to grid B in the example above.
                  rowCount={rowCount}
                  columnCount={numFrozenColumns}
                  columnWidth={columnWidthProducer}
                  estimatedColumnSize={defaultColumnSize}
                  width={frozenColumnsWidth}
                  height={height - scrollbarSize}
                  rowHeight={rowHeightFunction}
                  cellRenderer={renderCell}
                  className={styles.frozenColumnsGrid}
                  overscanColumnCount={overscanColumnCount}
                  overscanRowCount={overscanRowCount}
                  scrollTop={scrollTop}
                />
              </div>
              <div className={styles.gridColumn}>
                <AutoSizer disableHeight>
                  {({ width }) => {
                    // If there is extra space, linearly grow all the non-frozen
                    // columns to fill it.
                    const nonFrozenColumnsWidth = columnWidths
                      .slice(numFrozenColumns)
                      .reduce((sum, columnWidth) => sum + columnWidth, 0);
                    const availableWidth = width - frozenColumnsWidth - scrollbarSize;
                    if (nonFrozenColumnsWidth < availableWidth) {
                      const scaleFactor = availableWidth / nonFrozenColumnsWidth;
                      columnWidthProducer = ({ index }: { index: number }) => {
                        if (index < numFrozenColumns) {
                          // Leave the frozen columns alone.
                          return columnWidths[index];
                        }
                        return columnWidths[index] * scaleFactor;
                      };
                    }
                    return (
                      <div>
                        <div
                          style={{
                            height: firstRowHeight,
                            width: width - scrollbarSize,
                          }}
                        >
                          <Grid
                            // This Grid corresponds to grid C in the example
                            // above.
                            rowCount={1}
                            columnCount={columnCount}
                            columnWidth={columnWidthProducer}
                            estimatedColumnSize={defaultColumnSize}
                            width={width - scrollbarSize}
                            height={firstRowHeight}
                            rowHeight={rowHeightFunction}
                            cellRenderer={cellData => {
                              const { columnIndex } = cellData;
                              if (columnIndex < numFrozenColumns) {
                                return null;
                              }
                              return renderHeader(cellData);
                            }}
                            className={styles.headerGrid}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            scrollLeft={scrollLeft}
                          />
                        </div>
                        <div
                          style={{
                            height,
                            width,
                          }}
                        >
                          <Grid
                            // This Grid corresponds to grid D in the example
                            // above.
                            rowCount={rowCount}
                            columnCount={columnCount}
                            columnWidth={columnWidthProducer}
                            estimatedColumnSize={defaultColumnSize}
                            width={width - scrollbarSize}
                            height={height - scrollbarSize}
                            rowHeight={rowHeightFunction}
                            cellRenderer={cellData => {
                              const { columnIndex } = cellData;
                              if (columnIndex < numFrozenColumns) {
                                return null;
                              }
                              return renderCell(cellData);
                            }}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            className={styles.bodyGrid}
                            onScroll={onScroll}
                          />
                        </div>
                      </div>
                    );
                  }}
                </AutoSizer>
              </div>
            </div>
          );
        }}
      </ScrollSync>
    </div>
  );
};
