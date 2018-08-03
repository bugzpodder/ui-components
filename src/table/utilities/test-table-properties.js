// @flow
import React from "react";
import Typography from "@material-ui/core/Typography";

export const data = [
  {
    columnOne: "First Datum",
    columnTwo: "Second Datum",
  },
];

export const columns = [
  {
    Header: "Column One",
    accessor: "columnOne",
    Cell: ({ value }: { value: string }) => {
      // eslint-disable-next-line react/jsx-filename-extension
      return <span>{value}</span>;
    },
  },
  {
    Header: "Column Two",
    accessor: "columnThree",
    isSortable: false,
  },
];

export const invalidColumns = [
  {
    Header: "Column One",
  },
];

export const tableOptions: LegacyApiQueryOptions = {
  offset: 0,
  count: 5,
  searchOptions: new Map(),
  sortOptions: [{ id: "columnOne", desc: false }],
  isLoading: false,
  selectedRowIds: ["First Datum"],
};

export const invalidTableOptions = {
  count: 5,
};

export const headerActions = <Typography>Test Header Action</Typography>;
