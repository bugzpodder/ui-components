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
  const handleClickSort = (event: SyntheticMouseEvent<HTMLButtonElement>, fieldId) => {
    const { ctrlKey } = event;
    const currentSortField = sortFieldsById.get(fieldId) || {};
    const newSortField = {
      id: fieldId,
      desc: currentSortField.id !== fieldId || currentSortField.desc !== true,
    };
    const sortOptions = [];
    if (ctrlKey) {
      // If the user holds shift while clicking on a header, multi-sort.
      // TODO(ecarrel): support macs.
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
            Header, accessor = "", headerClassName = "", isSingleIcon = false, sortAccessor,
          } = column;
          const fieldId = typeof accessor === "string" ? accessor : "";
          const sortFieldId = sortAccessor || fieldId;
          const sortField = sortFieldsById.get(sortFieldId) || {};
          const isCheckboxHeader = accessor === "COLUMN_SELECT";
          const isSortable = onSort && sortFieldId.length > 0 && column.sortable !== false;
          const isSorted = onSort && !!sortField.id;
          const sortOrder = sortField.desc ? "desc" : "asc";
          const key = `${accessor.toString() || "table-head-key"}-${index}`;
          let inner = Header;
          if (isSortable && !isCheckboxHeader) {
            inner = (
              <TableSortLabel
                className={`sort-${sortFieldId}`}
                data-testid={`sort-${sortFieldId}`}
                active={isSorted}
                direction={sortOrder}
                onClick={event => handleClickSort(event, sortFieldId)}
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
