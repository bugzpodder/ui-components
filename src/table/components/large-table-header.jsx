// @flow
import React from "react";
import classNames from "classnames";
import styles from "./large-table.module.scss";
import { InnerTableHeader } from "./inner-table-header";

type Props = {
  tableColumns: Array<PagedTableColumn>,
  sortingProps: SortingProps,
  enableSelectAll: boolean,
};

export const LargeTableHeader = (props: Props) => {
  const { tableColumns, enableSelectAll = true, sortingProps } = props;

  return (
    <div className={classNames(styles.headerContainer, styles.headerContainerPadding)}>
      <div className={styles.headerRow}>
        {tableColumns.map((tableColumn, columnIndex) => {
          const {
            Header, accessor = "", headerClassName, isSingleIcon, sortAccessor,
          } = tableColumn;
          const isCheckboxColumn = accessor === "COLUMN_SELECT";
          if (isCheckboxColumn && !enableSelectAll) {
            return null;
          }
          let inner = Header;
          const fieldId = typeof accessor === "string" ? accessor : "";
          const sortFieldId = sortAccessor || fieldId;
          const isSortable = sortingProps.onSort && sortFieldId.length > 0 && tableColumn.sortable !== false;
          if (isSortable && !isCheckboxColumn) {
            inner = (
              <InnerTableHeader
                sortFieldId={sortAccessor || fieldId}
                sortingProps={sortingProps}
              >
                {Header || null}
              </InnerTableHeader>
            );
          }

          return (
            <div
              key={columnIndex}
              className={classNames(headerClassName, styles.headerCell, {
                [`${fieldId}-header`]: fieldId,
                [styles.singleIcon]: isCheckboxColumn || isSingleIcon,
                [styles.tableHeader]: !isCheckboxColumn,
              })}
            >
              <div className={styles.headerText}>{inner}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
