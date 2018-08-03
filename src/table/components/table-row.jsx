// @flow
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import classNames from "classnames";
import styles from "../table.module.scss";

type Props = {
  columns: Array<PagedTableColumn>,
  instance: Object,
  rowId: string | number,
  rowIndex: number,
  className?: string | Function,
};

export const PagedTableRow = (props: Props) => {
  const {
    columns, instance, rowIndex, rowId,
  } = props;
  let { className } = props;
  if (typeof className === "function") {
    className = className(instance, rowIndex);
  }
  return (
    <TableRow
      className={className}
      data-testid={rowId}
      key={rowId}
    >
      {columns.map(({ /* $FlowFixMe: accessor can be string or Function */
        Cell, Header, accessor = "", className = "",
      }: PagedTableColumn, index) => {
        let inner = null;
        const itemKey = `${rowId}-${index}`;
        let value = "";
        if (typeof accessor === "string") {
          value = instance[accessor];
        } else if (typeof accessor === "function") {
          value = accessor(instance);
        }
        if (Cell) {
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
          throw new Error("row missing content declaration. Provide either Cell or accessor to columns object(s)");
        }
        if (typeof className === "function") {
          className = className(value);
        }
        return (
          <TableCell
            key={itemKey}
            data-cell-id={itemKey}
            className={classNames(styles.tableCell, className)}
          >
            {inner}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
