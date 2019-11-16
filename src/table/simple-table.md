### Example

```js
import {
  EXAMPLE_TABLE_DATA,
  ExampleBlock,
  ExampleWrapper,
} from "../test-utils";
import { useState } from "react";
import { SimpleTable } from "./";

const TestSimpleTable = () => {
  const [tableOptions, setTableOptions] = useState({
    sortOptions: [{ id: "word", desc: false }],
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
      <SimpleTable
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
        idKey="word"
      />
      <ExampleBlock strongHeader="Table Options " content={tableOptions} />
    </div>
  );
};

<ExampleWrapper>
  <TestSimpleTable />
</ExampleWrapper>;
```
