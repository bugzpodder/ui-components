// @flow
import React from "react";
import classNames from "classnames";
import styles from "./large-table.module.scss";

type Props = {
  tableColumns: Array<PagedTableColumn>,
  data: Array<Object>,
  enableSelectAll: boolean,
};

export const LargeTableHeader = (props: Props) => {
  const { tableColumns, data, enableSelectAll = true } = props;
  return (
    <div className={classNames(styles.headerContainer, { [styles.headerContainerPadding]: data.length > 5 })}>
      <div className={styles.headerRow}>
        {tableColumns.map((tableColumn, columnIndex) => {
          const {
            Header, accessor = "", headerClassName, isSingleIcon,
          } = tableColumn;
          const isCheckboxColumn = accessor === "COLUMN_SELECT";
          if (isCheckboxColumn && !enableSelectAll) {
            return null;
          }
          const fieldId = typeof accessor === "string" ? accessor : "";
          return (
            <div
              key={columnIndex}
              className={classNames(headerClassName, styles.headerCell, {
                [`${fieldId}-header`]: fieldId,
                [styles.singleIcon]: isCheckboxColumn || isSingleIcon,
                [styles.tableHeader]: !isCheckboxColumn,
              })}
            >
              {<div className={styles.headerText}>{Header}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
