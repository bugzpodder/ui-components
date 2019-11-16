import React, { useRef } from "react";

import AutoSizer from "react-virtualized-auto-sizer";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./large-table.module.scss";
import { InnerTableHeader } from "./inner-table-header";
import { PagedTableClasses, PagedTableColumn } from "../../types/paged-table";
import { SimpleTableOptions } from "../../types/table";
import { SortOption } from "@grailbio/lib";
import { VariableSizeGrid } from "react-window";
import { getCheckboxColumn } from "../utilities/checkbox-column";
import { getRowId } from "../utilities/row-utils";

type Props = {
  id?: string;
  columns: PagedTableColumn[];
  data: Array<Record<string, any>>;
  isLoading?: boolean;
  selectedRows?: Array<number | string>;
  classes?: PagedTableClasses;
  idKey?: string | number;
  onSelect?: (x0: any[]) => any;
  onSort?: (x0: { sortOptions: SortOption[] }) => any;
  onHighlightRow?: (x0: number | string) => any;
  highlightedRowId?: number | string;
  tableOptions?: SimpleTableOptions;
  enableSelectAll?: boolean;
  rowHeight?: number | ((x0: Record<string, any>, x1: number) => number);
  numFrozenColumns?: number;
  height?: number;
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
    highlightedRowId,
    tableOptions,
    enableSelectAll = true,
    rowHeight = 50,
    height = 300,
  } = props;
  let { numFrozenColumns = 1 } = props;

  // Set up some refs so we can have access to `.scrollTo`.
  // https://react-window.now.sh/#/examples/list/scroll-to-item
  const rowLabelRef = useRef(null);
  const columnLabelRef = useRef(null);
  const gridRef = useRef(null);

  // create event handlers for the `onScroll` events.
  const handleGridScroll = ({
    scrollUpdateWasRequested,
    scrollLeft,
    scrollTop,
  }) => {
    // From the official docs:
    // > scrollUpdateWasRequested is a boolean.
    // > This value is true if the scroll was caused by scrollTo() or scrollToItem(),
    // > And false if it was the result of a user interaction in the browser.
    //
    // So we want to ignore events that were from `scrollTo`.
    if (!scrollUpdateWasRequested) {
      if (columnLabelRef.current) {
        columnLabelRef.current.scrollTo({
          scrollLeft,
        });
      }

      if (rowLabelRef.current) {
        rowLabelRef.current.scrollTo({
          scrollTop,
        });
      }
    }
  };

  const handleRowLabelScroll = ({ scrollUpdateWasRequested, scrollTop }) => {
    if (!scrollUpdateWasRequested && gridRef.current) {
      gridRef.current.scrollTo({
        scrollTop,
      });
    }
  };

  const handleColumnLabelScroll = ({
    scrollUpdateWasRequested,
    scrollLeft,
  }) => {
    if (!scrollUpdateWasRequested && gridRef.current) {
      gridRef.current.scrollTo({
        scrollLeft,
      });
    }
  };

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
  const overscanColumnCount = 1;
  const overscanRowCount = 1;
  const rowCount = data.length;
  const scrollbarSize = 20;
  const sortingProps = { onSort, tableOptions };

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
      Cell,
      Header,
      accessor = "",
      className = "",
      isSingleIcon,
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
        className={classNames(
          columnClassName,
          styles.largeWideTableCell,
          rowClassName,
          {
            [styles.tableCell]: !isCheckboxColumn,
            [styles.singleIcon]: isSingleIcon || isCheckboxColumn,
            [styles.highlightedCell]: rowIsHighlighted,
            [styles.highlightedRow]: rowIsHighlighted && isCheckboxColumn,
            [styles.isRightmostFrozenColumn]: isRightmostFrozenColumn,
            [styles.isLeftmostUnfrozenColumn]: isLeftmostUnfrozenColumn,
          },
        )}
        onClick={onHighlightRow ? () => onHighlightRow(rowId) : undefined}
      >
        {inner}
      </div>
    );
  };

  const renderHeader = ({ columnIndex, style }) => {
    const tableColumn = tableColumns[columnIndex];
    const {
      Header,
      accessor = "",
      headerClassName,
      isSingleIcon,
      sortAccessor,
    } = tableColumn;
    const isCheckboxColumn = accessor === "COLUMN_SELECT";
    if (isCheckboxColumn && !enableSelectAll) {
      return null;
    }
    const fieldId = typeof accessor === "string" ? accessor : "";
    const sortFieldId = sortAccessor || fieldId;
    const isSortable =
      onSort && sortFieldId.length > 0 && tableColumn.sortable !== false;
    let inner = Header;
    if (isSortable && !isCheckboxColumn) {
      inner = (
        <InnerTableHeader
          sortFieldId={sortAccessor || fieldId}
          sortingProps={sortingProps}
        >
          {Header}
        </InnerTableHeader>
      );
    }

    const isRightmostFrozenColumn = columnIndex === numFrozenColumns - 1;
    const isLeftmostUnfrozenColumn = columnIndex === numFrozenColumns;
    return (
      <div
        key={columnIndex}
        style={style}
        className={classNames(
          headerClassName,
          styles.headerCell,
          styles.headerRow,
          {
            [`${fieldId}-header`]: fieldId,
            [styles.singleIcon]: isCheckboxColumn || isSingleIcon,
            [styles.tableHeader]: !isCheckboxColumn,
            [styles.isRightmostFrozenColumn]: isRightmostFrozenColumn,
            [styles.isLeftmostUnfrozenColumn]: isLeftmostUnfrozenColumn,
          },
        )}
      >
        <div className={styles.headerText}>{inner}</div>
      </div>
    );
  };

  const columnWidths = tableColumns.map(
    ({ width = defaultColumnSize }, columnIndex) => {
      // 10px of padding is added to the leftmost unfrozen column, encroaching on
      // the rest of its space by 10px. Add 10px to counteract this.
      const isLeftmostUnfrozenColumn = columnIndex === numFrozenColumns;
      if (isLeftmostUnfrozenColumn) {
        return width + 10;
      }
      return width;
    },
  );
  // TODO(ecarrel): use recomputeGridSize to force a re-render if columnWidths
  //  change. Currently, that does not happen.

  let columnWidthProducer = (index: number) => columnWidths[index];
  const rowHeightFunction = (index: number) => {
    if (typeof rowHeight === "function") {
      const rowData = index < data.length ? data[index] : {};
      return rowHeight(rowData, index);
    }
    return rowHeight || 50;
  };
  const firstRowHeight = rowHeightFunction(0);
  const frozenColumnsWidth = numFrozenColumns
    ? columnWidths
        .slice(0, numFrozenColumns)
        .reduce((sum, width) => sum + width)
    : 0;

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
    <div className={classNames(styles.table, classes.table)} id={id}>
      <div className={styles.gridRow}>
        <div
          className={styles.frozenColumnsGridContainer}
          style={{
            top: 0,
          }}
        >
          <VariableSizeGrid
            // This Grid corresponds to grid A in the example above.
            rowCount={1}
            columnCount={numFrozenColumns}
            columnWidth={columnWidthProducer}
            width={frozenColumnsWidth}
            height={firstRowHeight}
            rowHeight={rowHeightFunction}
            className={styles.headerGrid}
            overscanColumnCount={overscanColumnCount}
            overscanRowCount={overscanRowCount}
          >
            {renderHeader}
          </VariableSizeGrid>
        </div>
        <div
          className={styles.frozenColumnsGridContainer}
          style={{
            top: firstRowHeight,
          }}
        >
          <VariableSizeGrid
            // This Grid corresponds to grid B in the example above.
            ref={rowLabelRef}
            rowCount={rowCount}
            columnCount={numFrozenColumns}
            columnWidth={columnWidthProducer}
            width={frozenColumnsWidth}
            height={height - scrollbarSize - firstRowHeight}
            rowHeight={rowHeightFunction}
            className={styles.frozenColumnsGrid}
            overscanColumnCount={overscanColumnCount}
            overscanRowCount={overscanRowCount}
            onScroll={handleRowLabelScroll}
          >
            {renderCell}
          </VariableSizeGrid>
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
                columnWidthProducer = (index: number) => {
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
                    <VariableSizeGrid
                      // This Grid corresponds to grid C in the example
                      // above.
                      ref={columnLabelRef}
                      rowCount={1}
                      columnCount={columnCount}
                      columnWidth={columnWidthProducer}
                      width={width - scrollbarSize}
                      height={firstRowHeight}
                      rowHeight={rowHeightFunction}
                      className={styles.headerGrid}
                      overscanColumnCount={overscanColumnCount}
                      overscanRowCount={overscanRowCount}
                      onScroll={handleColumnLabelScroll}
                    >
                      {cellData => {
                        const { columnIndex } = cellData;
                        if (columnIndex < numFrozenColumns) {
                          return null;
                        }
                        return renderHeader(cellData);
                      }}
                    </VariableSizeGrid>
                  </div>
                  <div
                    style={{
                      height,
                      width,
                    }}
                  >
                    <VariableSizeGrid
                      // This Grid corresponds to grid D in the example
                      // above.
                      ref={gridRef}
                      rowCount={rowCount}
                      columnCount={columnCount}
                      columnWidth={columnWidthProducer}
                      width={width - scrollbarSize}
                      height={height - scrollbarSize - firstRowHeight}
                      rowHeight={rowHeightFunction}
                      overscanColumnCount={overscanColumnCount}
                      overscanRowCount={overscanRowCount}
                      className={styles.bodyGrid}
                      onScroll={handleGridScroll}
                    >
                      {cellData => {
                        const { columnIndex } = cellData;
                        if (columnIndex < numFrozenColumns) {
                          return null;
                        }
                        return renderCell(cellData);
                      }}
                    </VariableSizeGrid>
                  </div>
                </div>
              );
            }}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
};
