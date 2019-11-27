import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import classNames from "classnames";
import styles from "../table.module.scss";
import {
  InternalPagedTableColumn,
  PagedTableColumn,
  SelectionProps,
} from "../../types/paged-table";

type Props = {
  columns: InternalPagedTableColumn[];
  instance: {
    [x: string]: any;
  };
  rowId: string | number;
  shadeOnHover: boolean;
  rowIndex: number;
  className?: string | Function;
  selectionProps: SelectionProps;
  hasColumnVisibilityChooser: boolean;
};

export const PagedTableRow: React.FC<Props> = props => {
  const {
    columns,
    instance,
    rowIndex,
    rowId,
    selectionProps,
    shadeOnHover,
    hasColumnVisibilityChooser,
  } = props;
  const { highlightedRowId, onHighlightRow } = selectionProps;
  let { className } = props;
  if (typeof className === "function") {
    className = className(instance, rowIndex);
  }
  const rowIsHighlighted = highlightedRowId === rowId;
  const visibleColumns = columns.filter(column => column.isVisible);
  return (
    <TableRow
      classes={{
        root: classNames(className, styles.tableRow),
        selected: styles.highlightedRow,
      }}
      data-testid={rowId}
      key={rowId}
      hover={onHighlightRow ? shadeOnHover : false}
      selected={rowIsHighlighted}
      onClick={onHighlightRow ? () => onHighlightRow(rowId) : undefined}
    >
      <>
        {visibleColumns.map(
          (
            {
              Cell,
              Header,
              accessor = "",
              className = "",
              isSingleIcon,
            }: PagedTableColumn,
            index,
          ) => {
            let inner = null;
            const itemKey = `${rowId}-${index}`;
            let value = "";
            if (typeof accessor === "string") {
              value = instance[accessor];
            }
            if (typeof accessor === "function") {
              value = accessor(instance);
            }
            if (Cell) {
              // N.B. The Cell is instantiated as a pure function instead of a React element.
              // This makes the Cell able to flexibly render any elements (like inputs) without changes
              // to their internal state causing rerenders of the entire table.
              inner = Cell({
                instance,
                original: instance,
                value,
                accessor,
                rowId,
                rowIndex,
                label: Header || "",
              });
            } else if (accessor) {
              inner = value;
            } else {
              throw new Error(
                "row missing content declaration. Provide either Cell or accessor to columns object(s)",
              );
            }
            if (typeof className === "function") {
              className = className(value);
            }
            const isCheckboxColumn = accessor === "COLUMN_SELECT";
            return (
              <TableCell
                key={itemKey}
                data-cell-id={itemKey}
                className={classNames(styles.tableCell, className, {
                  [styles.singleIcon]: isSingleIcon || isCheckboxColumn,
                })}
              >
                {inner}
              </TableCell>
            );
          },
        )}
        {hasColumnVisibilityChooser && (
          <TableCell
            className={classNames(styles.singleIcon, styles.iconInHeaderOnly)}
          />
        )}
      </>
    </TableRow>
  );
};
