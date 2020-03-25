import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import React from "react";
import classNames from "classnames";
import styles from "../table.module.scss";
import {
  InternalPagedTableColumn,
  PagedTableCell,
  SelectionProps,
} from "../../types/paged-table";

export const getCheckboxColumn = (
  selectionProps: SelectionProps,
  shouldAdjustTable: boolean,
): InternalPagedTableColumn => {
  if (shouldAdjustTable) {
    return {
      accessor: "COLUMN_SELECT",
      headerClassName: styles.checkBoxColumn,
      className: styles.checkBoxColumn,
      Header: (
        <Checkbox
          classes={{
            root: classNames({
              [styles.checkBox]: shouldAdjustTable,
            }),
          }}
          inputProps={{
            // @ts-ignore: data-testid is nnt assignable.
            "data-testid": "hidden-table-checkbox-header",
          }}
        />
      ),
      Cell: ({ rowId }: PagedTableCell<any>) => {
        const testId = String(rowId).toLowerCase().replace(" ", "-");
        return (
          <Checkbox
            id={String(rowId)}
            classes={{
              root: classNames({
                [styles.checkBox]: shouldAdjustTable,
              }),
            }}
            inputProps={{
              // @ts-ignore: data-testid is not assignable.
              "data-testid": `hidden-table-checkbox-cell-${testId}`,
            }}
          />
        );
      },
      isVisible: true,
      index: -1,
      exportHeaderName: "",
      exportAccessor: "",
    };
  }
  const { data, selectedRows, idKey, onSelect } = selectionProps;
  if (selectedRows === undefined || selectedRows === null) {
    throw new Error("selectedRows is missing from props");
  }
  const ids = data.map((instance, index) =>
    idKey ? instance[idKey] : `${index}`,
  );
  // FIXME (nsawas): allAreSelected will only work as expected if API is retrieving data using count parameter.
  const allAreSelected =
    data.length > 0 && ids.every((id) => selectedRows.includes(id));
  const someAreSelected = selectedRows.length > 0 && !allAreSelected;

  const selectAll = (): void => {
    if (someAreSelected || allAreSelected) {
      onSelect && onSelect([]);
    } else {
      onSelect && onSelect(ids);
    }
  };

  const selectItem = (rowId: number | string): void => {
    const newSelection = [];
    if (selectedRows.includes(rowId)) {
      newSelection.push(...selectedRows.filter((item) => item !== rowId));
    } else {
      newSelection.push(...selectedRows, rowId);
    }
    onSelect && onSelect(newSelection);
  };
  return {
    accessor: "COLUMN_SELECT",
    className: styles.checkBoxColumn,
    Header: (
      <Checkbox
        classes={{
          root: classNames({
            active: allAreSelected,
            indeterminate: someAreSelected,
          }),
        }}
        inputProps={{
          // @ts-ignore: data-testid is nnt assignable.
          "data-testid": "table-checkbox-header",
        }}
        color="primary"
        checked={allAreSelected || !!someAreSelected}
        indeterminate={someAreSelected}
        onChange={selectAll}
      />
    ),
    Cell: ({ rowId }: PagedTableCell<any>) => {
      const testId = String(rowId).toLowerCase().replace(" ", "-");
      return (
        <Checkbox
          id={String(rowId)}
          classes={{
            root: classNames({
              active: selectedRows.includes(rowId),
            }),
          }}
          inputProps={{
            // @ts-ignore: data-testid is not assignable.
            "data-testid": `table-checkbox-cell-${testId}`,
          }}
          color="primary"
          checked={selectedRows.includes(rowId)}
          onChange={() => selectItem(rowId)}
        />
      );
    },
    isVisible: true,
    index: -1,
    exportHeaderName: "",
    exportAccessor: "",
  };
};
