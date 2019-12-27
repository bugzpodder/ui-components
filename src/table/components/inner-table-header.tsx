import React, { MouseEvent } from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { SortOption, mapBy } from "@grailbio/lib";
import { SortingProps } from "../../types/paged-table";

type Props = {
  sortingProps: SortingProps;
  sortFieldId: string;
};

export const InnerTableHeader: React.FC<Props> = props => {
  const { children, sortingProps, sortFieldId } = props;
  const { onSort, tableOptions } = sortingProps;
  if (onSort && (!tableOptions || !tableOptions.sortOptions)) {
    throw new Error(
      "tableOptions prop is required and must include a sortOptions parameter",
    );
  }
  const { sortOptions = [] } = tableOptions || {};
  if (onSort && tableOptions && !sortOptions) {
    throw new Error(
      "tableOptions prop requires a sortOptions parameter for sorting",
    );
  }
  const sortFieldsById = mapBy(sortOptions, "id");
  const handleClickSort = (event: MouseEvent<HTMLElement>, fieldId): void => {
    const { ctrlKey } = event;
    const currentSortField = sortFieldsById.get(fieldId) || {};
    const newSortField = {
      id: fieldId,
      desc: currentSortField.id !== fieldId || currentSortField.desc !== true,
    };
    const sortOptions: SortOption[] = [];
    if (ctrlKey) {
      // If the user holds shift while clicking on a header, multi-sort.
      // TODO(ecarrel): support macs.
      sortOptions.push(...sortFieldsById.values());
    } else {
      sortOptions.push(newSortField);
    }
    onSort && onSort({ sortOptions });
  };

  const sortField = sortFieldsById.get(sortFieldId) || {};
  const isSorted = onSort && !!sortField.id;
  const sortOrder = sortField.desc ? "desc" : "asc";

  return (
    <TableSortLabel
      className={`sort-${sortFieldId}`}
      data-testid={`sort-${sortFieldId}`}
      active={isSorted}
      direction={sortOrder}
      onClick={event => handleClickSort(event, sortFieldId)}
    >
      {children}
    </TableSortLabel>
  );
};
