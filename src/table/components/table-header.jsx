// @flow
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import classNames from "classnames";
import styles from "../table.module.scss";
import { ColumnVisibilityChooser } from "./column-visibility-chooser";
import { mapBy } from "@grailbio/lib";

type Props = {
  columns: Array<InternalPagedTableColumn>,
  sortingProps: SortingProps,
  onSort?: (sortOption: SortOption) => any,
  enableSelectAll: boolean,
  hasColumnVisibilityChooser: boolean,
  columnVisibility: { [number]: boolean },
  setColumnVisibility: ({ [number]: boolean }) => any,
};

export const TableHeader = (props: Props) => {
  const {
    columns,
    sortingProps = {},
    enableSelectAll = true,
    hasColumnVisibilityChooser,
    columnVisibility,
    setColumnVisibility,
  } = props;

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
  const visibleColumns = columns.filter(column => column.isVisible);
  return (
    <TableHead className="TableHeader">
      <TableRow>
        <>
          {visibleColumns.map((column, index) => {
            const {
              Header, accessor = "", headerClassName = "", isSingleIcon = false, sortAccessor, id,
            } = column;
            const fieldId = typeof accessor === "string" ? accessor : "";
            const sortFieldId = sortAccessor || fieldId;
            const sortField = sortFieldsById.get(sortFieldId) || {};
            const isCheckboxHeader = accessor === "COLUMN_SELECT";
            const isSortable = onSort && sortFieldId.length > 0 && column.sortable !== false;
            const isSorted = onSort && !!sortField.id;
            const sortOrder = sortField.desc ? "desc" : "asc";
            const key = `${id || accessor.toString() || "table-head-key"}-${index}`;
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
            if (isCheckboxHeader && !enableSelectAll) {
              return <TableCell />;
            }
            return (
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
            );
          })}
          {hasColumnVisibilityChooser && (
            <TableCell
              key="column-visibility-chooser"
              className={classNames(styles.singleIcon, styles.iconInHeaderOnly)}
            >
              <ColumnVisibilityChooser
                columns={columns.filter(column => column.accessor !== "COLUMN_SELECT")}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
              />
            </TableCell>
          )}
        </>
      </TableRow>
    </TableHead>
  );
};
