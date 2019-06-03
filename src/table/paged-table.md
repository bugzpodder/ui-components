### Example

```js
import { Fragment, useState } from "react";
import { ExampleBlock, ExampleWrapper, EXAMPLE_TABLE_DATA } from "../test-utils";
import Button from "@material-ui/core/Button";
import styles from "../test-utils/example-styles.module.scss";
import { PagedTable } from "./";

const TestPagedTable = () => {
  const [tableOptions, setTableOptions] = useState({
    offset: 0,
    count: 25,
    sortOptions: [{ id: "name", desc: false }],
    selectedRowIds: [],
    highlightedRowId: null,
  });
  const [data, setData] = useState(EXAMPLE_TABLE_DATA);
  const handlePageChange = params => {
    const { offset, count } = params;
    console.debug(params);
    setTableOptions(tableOptions => ({ ...tableOptions, offset, count }));
  };

  const handleSelection = selectedRowIds => {
    console.debug(selectedRowIds);
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
  const pagedData = data.slice(tableOptions.offset, tableOptions.offset + tableOptions.count);
  const headerActions = (
    <Fragment>
      <Button>Second Action</Button>
      <Button variant="contained" color="primary">
        First Action
      </Button>
    </Fragment>
  );
  return (
    <div className={styles.pagedTable}>
      <PagedTable
        // required
        data={pagedData}
        columns={columns}
        // optional
        title="Useful Everyday Words"
        idKey="word"
        classes={{
          root: "table-root",
          rows: (datum, index) => `${datum.word}-${index}-example`,
        }}
        headerActions={headerActions}
        tableOptions={tableOptions}
        onPageChange={handlePageChange}
        onSelect={handleSelection}
        selectedRows={tableOptions.selectedRowIds}
        onSort={handleSort}
        highlightedRowId={tableOptions.highlightedRowId}
        onHighlightRow={handleHighlight}
        isFullBleed
        hasTableMargin={false}
      />
      <ExampleBlock strongHeader="Table Options " content={tableOptions} />
    </div>
  );
};

<ExampleWrapper>
  <TestPagedTable />
</ExampleWrapper>;
```
