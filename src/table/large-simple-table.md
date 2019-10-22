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

  const wideTableColumns = [
    {
      Header: "Index",
      accessor: "index",
      className: "index-class",
      Cell: ({ rowIndex }) => <Typography>{rowIndex}</Typography>,
      width: 50,
    },
    {
      Header: "Word",
      accessor: "word", // this can also be a function, and takes the datum for the row
      className: "word-class", // className applied to cell
      headerClassName: "main-header", // className applied to header
      width: 200,
    },
    {
      Header: "Origin",
      accessor: "origin",
      className: "origin-class",
      Cell: ({ value }) => <Typography>{value}</Typography>,
      width: 400,
    },
    {
      Header: "Small column",
      accessor: () => "1 + 1 = 2",
      className: "column-d",
      width: 100,
    },
    {
      Header: "Medium column",
      accessor: () => "1000 + 1000 = 2000.",
      className: "column-e",
      width: 250,
    },
    {
      Header: "Long column",
      accessor: ({ word }) =>
        `Rumpelstiltskin put a ${word} in the stew she cooked for the king. The king was not pleased.`,
      className: "column-f",
      width: 700,
    },
  ];
  return (
    <div>
      <h3>Without isWide prop</h3>
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
      <h3>With isWide prop</h3>
      <h4>Data count: {LARGE_EXAMPLE_TABLE_DATA.length}</h4>
      <LargeSimpleTable
        // required
        data={LARGE_EXAMPLE_TABLE_DATA}
        columns={wideTableColumns}
        // optional
        isWide
        tableOptions={tableOptions}
        classes={{
          root: "table-root",
          rows: (datum, index) => `${datum.word}-${index}-example`,
        }}
        onSelect={handleSelection}
        selectedRows={tableOptions.selectedRowIds}
        highlightedRowId={tableOptions.highlightedRowId}
        onHighlightRow={handleHighlight}
        numFrozenColumns={2}
      />
      <h4>Data count: {EXTRA_LARGE_EXAMPLE_TABLE_DATA.length}</h4>
      <LargeSimpleTable
        // required
        data={EXTRA_LARGE_EXAMPLE_TABLE_DATA}
        columns={wideTableColumns}
        // optional
        isWide
        tableOptions={tableOptions}
        classes={{
          root: "table-root",
          rows: (datum, index) => `${datum.word}-${index}-example`,
        }}
        highlightedRowId={tableOptions.highlightedRowId}
        onHighlightRow={handleHighlight}
        numFrozenColumns={2}
      />
      <ExampleBlock strongHeader="Table Options " content={tableOptions} />
    </div>
  );
};

<ExampleWrapper>
  <TestLargeSimpleTable />
</ExampleWrapper>;
```

```js
import { EXAMPLE_TABLE_DATA, ExampleBlock, ExampleWrapper } from "../test-utils";
import { useState } from "react";
import { SimpleTable } from "./";

const TestSimpleTable = props => {
  const { isWide } = props;
  const [tableOptions, setTableOptions] = useState({
    sortOptions: [{ id: "name", desc: false }],
    selectedRowIds: [],
    highlightedRowId: null,
  });
  const [data, setData] = useState(EXAMPLE_TABLE_DATA);

  const handleSelection = selectedRowIds => {
    setTableOptions(tableOptions => ({ ...tableOptions, selectedRowIds }));
  };

  const handleSort = params => {
    const { sortOptions } = params;

    const compare = (a, b) => {
      const desc = sortOptions[0].desc;
      const sortParam = sortOptions[0].id;
      const first = a[sortParam].toLowerCase();
      const second = b[sortParam].toLowerCase();
      if (first === second) {
        return 0;
      }
      if (desc) {
        return first > second ? -1 : 1;
      }
      return first < second ? -1 : 1;
    };

    setTableOptions(tableOptions => ({ ...tableOptions, sortOptions }));
    setData(data.sort(compare));
  };

  const handleHighlight = highlightedRowId => {
    setTableOptions(tableOptions => ({ ...tableOptions, highlightedRowId }));
  };

  const columns = [
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
      Cell: ({ value }) => <div>{value}</div>,
    },
  ];
  return (
    <div>
      <LargeSimpleTable
        // required
        data={data}
        columns={columns}
        // optional
        tableOptions={tableOptions}
        classes={{
          root: "table-root",
          rows: (datum, index) => `${datum.word}-${index}-example`,
        }}
        onSelect={handleSelection}
        selectedRows={tableOptions.selectedRowIds}
        onSort={handleSort}
        shadeOnHover
        highlightedRowId={tableOptions.highlightedRowId}
        onHighlightRow={handleHighlight}
        isWide={isWide}
      />
      <ExampleBlock strongHeader="Table Options " content={tableOptions} />
    </div>
  );
};

<ExampleWrapper>
  <h4>Large Simple Table With Sorting:</h4>
  <TestSimpleTable />
  <h4>Wide Large Simple Table With Sorting:</h4>
  <TestSimpleTable isWide />
</ExampleWrapper>;
```
