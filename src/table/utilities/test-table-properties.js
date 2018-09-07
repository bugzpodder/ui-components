// @flow
import React from "react";
import Typography from "@material-ui/core/Typography";

export const data = [
  {
    columnOne: "First Datum",
    columnTwo: "Second Datum",
    columnThree: "Third Datum",
  },
  {
    columnOne: "Fourth Datum",
    columnTwo: "Fifth Datum",
    columnThree: "Sixth Datum",
  },
  {
    columnOne: "Seventh Datum",
    columnTwo: "Eighth Datum",
    columnThree: "Ninth Datum",
  },
  {
    columnOne: "Tenth Datum",
    columnTwo: "Eleventh Datum",
    columnThree: "Twelfth Datum",
  },
  {
    columnOne: "Thirteenth Datum",
    columnTwo: "Fifteenth Datum",
    columnThree: "Sixteenth Datum",
  },
  {
    columnOne: "Seventeenth Datum",
    columnTwo: "Eighteenth Datum",
    columnThree: "Ninteenth Datum",
  },
];

export const columns = [
  {
    Header: "Column One",
    accessor: "columnOne",
    isSortable: true,
    Cell: ({ value }: { value: string }) => {
      // eslint-disable-next-line react/jsx-filename-extension
      return <span>{value}</span>;
    },
  },
  {
    Header: "Column Two",
    accessor: "columnTwo",
    isSortable: false,
  },
  {
    accessor: (instance: Object) => instance.columnThree,
    className: (value: string) => `test-${value.toLowerCase().replace(" ", "-")}-className`,
    Cell: ({ value }: { value: string }) => {
      // eslint-disable-next-line react/jsx-filename-extension
      return <span>{value}</span>;
    },
  },
];

export const invalidColumns = [
  {
    Header: "Column One",
  },
];

export const someSelectedRows = ["First Datum", "Fourth Datum"];
export const allSelectedRows = [
  "First Datum",
  "Fourth Datum",
  "Seventh Datum",
  "Tenth Datum",
  "Thirteenth Datum",
  "Seventeenth Datum",
];

export const tableOptions: LegacyApiQueryOptions = {
  offset: 0,
  count: 5,
  searchOptions: new Map(),
  sortOptions: [{ id: "columnOne", desc: false }],
  isLoading: false,
  selectedRowIds: someSelectedRows,
};

export const invalidTableOptions = {
  count: 5,
};

export const headerActions = <Typography>Test Header Action</Typography>;
