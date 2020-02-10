import React from "react";
import classNames from "classnames";
import styles from "../table.module.scss";
import { ColumnVisibilityChooser } from "./column-visibility-chooser";
import { InnerTableHeader } from "./inner-table-header";
import {
  InternalPagedTableColumn,
  SortingProps,
} from "../../types/paged-table";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

type Props = {
  columns: InternalPagedTableColumn[];
  sortingProps: SortingProps;
  enableSelectAll: boolean;
  wrapHeader: boolean;
  hasColumnVisibilityChooser: boolean;
  columnVisibility: {
    [x: number]: boolean;
  };
  setColumnVisibility: (x0: { [x: number]: boolean }) => any;
  adjustWithSelectableTable: boolean;
};

export const TableHeader: React.FC<Props> = props => {
  const {
    columns,
    sortingProps = {},
    enableSelectAll = true,
    hasColumnVisibilityChooser,
    columnVisibility,
    setColumnVisibility,
    wrapHeader,
  } = props;

  const visibleColumns = columns.filter(column => column.isVisible);
  const { onSort } = sortingProps;
  return (
    <TableHead className={classNames("TableHeader", styles.tableHead)}>
      <TableRow>
        {visibleColumns.map((column, index) => {
          const {
            Header,
            accessor = "",
            headerClassName = "",
            isSingleIcon = false,
            sortAccessor,
          } = column;
          const fieldId = typeof accessor === "string" ? accessor : "";
          const sortFieldId = sortAccessor || fieldId;
          const isCheckboxHeader = accessor === "COLUMN_SELECT";
          const isSortable =
            onSort && sortFieldId.length > 0 && column.sortable !== false;

          let inner = Header;
          if (isSortable && !isCheckboxHeader) {
            inner = (
              <InnerTableHeader
                sortFieldId={sortAccessor || fieldId}
                sortingProps={sortingProps}
              >
                {Header || null}
              </InnerTableHeader>
            );
          }
          if (isCheckboxHeader && !enableSelectAll) {
            return <TableCell />;
          }
          return (
            <TableCell
              key={index}
              className={classNames(headerClassName, styles.tableHeader, {
                [`${fieldId}-header`]: fieldId,
                [styles.singleIcon]: isCheckboxHeader || isSingleIcon,
                [styles.noWrap]: !wrapHeader,
              })}
            >
              {inner}
            </TableCell>
          );
        })}
        {hasColumnVisibilityChooser && (
          <TableCell
            key="column-visibility-chooser"
            className={classNames(styles.singleIcon, styles.iconInHeaderOnly)}
          >
            <ColumnVisibilityChooser
              columns={columns.filter(
                column => column.accessor !== "COLUMN_SELECT",
              )}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
            />
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
