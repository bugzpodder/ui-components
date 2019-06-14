// @flow
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import classNames from "classnames";
import styles from "../table.module.scss";
import { mapBy } from "@grail/lib";

type Props = {
  columns: Array<PagedTableColumn>,
  sortingProps: SortingProps,
  onSort?: (sortOption: SortOption) => any,
  enableSelectAll: boolean,
};

export const TableHeader = (props: Props) => {
  const { columns, sortingProps = {}, enableSelectAll = true } = props;
  const { onSort, tableOptions = {} } = sortingProps;
  if (onSort && !tableOptions.sortOptions) {
    throw new Error("tableOptions prop is required and must include a sortOptions parameter");
  }
  const { sortOptions = [] } = tableOptions;
  if (onSort && tableOptions && !sortOptions) {
    throw new Error("tableOptions prop requires a sortOptions parameter for sorting");
  }
  const sortFieldsById = mapBy(sortOptions, "id");
  const handleClickSort = (event: SyntheticMouseEvent<HTMLButtonElement>, accessor) => {
    if (!accessor) {
      return;
    }
    const { ctrlKey } = event;
    if (typeof accessor === "function") {
      return;
    }
    const fieldId = typeof accessor === "string" ? accessor : "";
    const currentSortField = sortFieldsById.get(fieldId) || {};
    const newSortField = {
      id: fieldId,
      desc: currentSortField.id !== accessor || currentSortField.desc !== true,
    };
    const sortOptions = [];
    if (ctrlKey) {
      // If the user holds ctrl while clicking on a header, multi-sort.
      sortFieldsById.set(fieldId, newSortField);
      sortOptions.push(...sortFieldsById.values());
    } else {
      sortOptions.push(newSortField);
    }
    onSort({ sortOptions });
  };
  return (
    <TableHead className="TableHeader">
      <TableRow>
        {columns.map((column, index) => {
          const {
            Header, accessor = "", headerClassName = "", isSingleIcon = false,
          } = column;
          const fieldId = typeof accessor === "string" ? accessor : "";
          const sortField = sortFieldsById.get(fieldId) || {};
          const isCheckboxHeader = accessor === "COLUMN_SELECT";
          const isSortable = onSort && column.sortable !== false;
          const isSorted = onSort && !!sortField.id;
          const sortOrder = sortField.desc ? "desc" : "asc";
          const key = `${accessor.toString() || "table-head-key"}-${index}`;
          let inner = Header;
          if (isSortable && !isCheckboxHeader) {
            inner = (
              <TableSortLabel
                className={`sort-${fieldId}`}
                data-testid={`sort-${fieldId}`}
                active={isSorted}
                direction={sortOrder}
                onClick={event => handleClickSort(event, accessor)}
              >
                {Header}
              </TableSortLabel>
            );
          }
          return (
            ((enableSelectAll || !isCheckboxHeader) && (
              <TableCell
                key={key}
                className={classNames(headerClassName, styles.tableHeader, {
                  [`${fieldId}-header`]: fieldId,
                  [styles.singleIcon]: isCheckboxHeader || isSingleIcon,
                })}
                sortDirection={isSorted ? sortOrder : false}
              >
                {inner}
              </TableCell>
            )) || <TableCell />
          );
        })}
      </TableRow>
    </TableHead>
  );
};
