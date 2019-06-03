### Example

```js
import { ExampleBlock, ExampleWrapper, LARGE_EXAMPLE_TABLE_DATA, EXTRA_LARGE_EXAMPLE_TABLE_DATA } from "../test-utils";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { LargeSimpleTable } from "./";

const TestLargeSimpleTable = () => {
  const [tableOptions, setTableOptions] = useState({
    selectedRowIds: [],
    highlightedRowId: null,
  });

  const handleSelection = selectedRowIds => {
    setTableOptions(tableOptions => ({ ...tableOptions, selectedRowIds }));
  };

  const handleHighlight = highlightedRowId => {
    setTableOptions(tableOptions => ({ ...tableOptions, highlightedRowId }));
  };

  const columns = [
    {
      Header: <Typography>Index</Typography>,
      accessor: "index",
      className: "index-class",
      Cell: ({ rowIndex }) => <Typography>{rowIndex}</Typography>,
    },
    {
      Header: "Word",
      accessor: "word", // this can also be a function, and takes the datum for the row
      className: "word-class", // className applied to cell
      headerClassName: "main-header", // className applied to header
    },
    {
      Header: "Origin",
      accessor: "origin",
      className: "origin-class",
      Cell: ({ value }) => <Typography>{value}</Typography>,
    },
  ];
  return (
    <div>
      <h4>Data count: {LARGE_EXAMPLE_TABLE_DATA.length}</h4>
      <LargeSimpleTable
        // required
        data={LARGE_EXAMPLE_TABLE_DATA}
        columns={columns}
        // optional
        tableOptions={tableOptions}
        classes={{
          root: "table-root",
          rows: (datum, index) => `${datum.word}-${index}-example`,
        }}
        onSelect={handleSelection}
        selectedRows={tableOptions.selectedRowIds}
        highlightedRowId={tableOptions.highlightedRowId}
        onHighlightRow={handleHighlight}
      />
      <h4>Data count: {EXTRA_LARGE_EXAMPLE_TABLE_DATA.length}</h4>
      <LargeSimpleTable
        // required
        data={EXTRA_LARGE_EXAMPLE_TABLE_DATA}
        columns={columns}
        // optional
        tableOptions={tableOptions}
        classes={{
          root: "table-root",
          rows: (datum, index) => `${datum.word}-${index}-example`,
        }}
        highlightedRowId={tableOptions.highlightedRowId}
        onHighlightRow={handleHighlight}
      />
      <ExampleBlock strongHeader="Table Options " content={tableOptions} />
    </div>
  );
};

<ExampleWrapper>
  <TestLargeSimpleTable />
</ExampleWrapper>;
```
