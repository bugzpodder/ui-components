import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import React from "react";
import classNames from "classnames";
import { PagedTableCell, SelectionProps } from "../../types/paged-table";

export const getCheckboxColumn = (selectionProps: SelectionProps) => {
  const { data, selectedRows, idKey, onSelect } = selectionProps;
  if (selectedRows === undefined || selectedRows === null) {
    throw new Error("selectedRows is missing from props");
  }
  const ids = data.map((instance, index) =>
    idKey ? instance[idKey] : `${index}`,
  );
  // FIXME (nsawas/jsingh): allAreChecked will only work as expected if API is retrieving data using count parameter.
  const allAreChecked =
    selectedRows.length === data.length && data.length !== 0;
  const someAreChecked = selectedRows.length > 0;

  const selectAll = () => {
    const areAllSelected = ids.every(id => selectedRows.includes(id));
    if (areAllSelected) {
      onSelect && onSelect([]);
      return;
    }
    onSelect && onSelect(ids);
  };

  const selectItem = (rowId: number | string) => {
    const newSelection = [];
    if (selectedRows.includes(rowId)) {
      newSelection.push(...selectedRows.filter(item => item !== rowId));
    } else {
      newSelection.push(...selectedRows, rowId);
    }
    onSelect && onSelect(newSelection);
  };

  return {
    accessor: "COLUMN_SELECT",
    Header: (
      <Checkbox
        className={classNames({
          active: allAreChecked,
          indeterminate: someAreChecked,
        })}
        inputProps={{
          // @ts-ignore: data-testid is nnt assignable.
          "data-testid": "table-checkbox-header",
        }}
        color="primary"
        checked={someAreChecked || allAreChecked}
        indeterminate={someAreChecked && !allAreChecked}
        onChange={selectAll}
      />
    ),
    Cell: ({ rowId }: PagedTableCell) => {
      const testId = String(rowId)
        .toLowerCase()
        .replace(" ", "-");
      return (
        <Checkbox
          id={String(rowId)}
          className={classNames({ active: selectedRows.includes(rowId) })}
          inputProps={{
            // @ts-ignore: data-testid is nnt assignable.
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
  };
};
