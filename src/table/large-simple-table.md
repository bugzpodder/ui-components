### Example

```js
const ExampleBlock = require("../test-utils").ExampleBlock;
const ExampleWrapper = require("../test-utils").ExampleWrapper;
const LARGE_EXAMPLE_TABLE_DATA = require("../test-utils").LARGE_EXAMPLE_TABLE_DATA;
const EXTRA_LARGE_EXAMPLE_TABLE_DATA = require("../test-utils").EXTRA_LARGE_EXAMPLE_TABLE_DATA;
const Typography = require("@material-ui/core").Typography;

class TestLargeSimpleTable extends React.Component {
  constructor(props) {
    super(props);
    const data = [];
    this.state = {
      tableOptions: {
        selectedRowIds: [],
        highlightedRowId: null,
      },
      data: LARGE_EXAMPLE_TABLE_DATA,
      extraLargeData: EXTRA_LARGE_EXAMPLE_TABLE_DATA,
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
  }

  handleSelection(selectedRowIds) {
    const tableOptions = { ...this.state.tableOptions, selectedRowIds };
    this.setState({ tableOptions });
  }

  handleHighlight(highlightedRowId) {
    const tableOptions = {
      ...this.state.tableOptions,
      highlightedRowId,
    };
    this.setState({ tableOptions });
  }

  render() {
    const { data, extraLargeData, tableOptions } = this.state;
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
        <h4>Data count: {data.length}</h4>
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
          onSelect={this.handleSelection}
          selectedRows={tableOptions.selectedRowIds}
          highlightedRowId={tableOptions.highlightedRowId}
          onHighlightRow={this.handleHighlight}
        />
        <h4>Data count: {extraLargeData.length}</h4>
        <LargeSimpleTable
          // required
          data={extraLargeData}
          columns={columns}
          // optional
          tableOptions={tableOptions}
          classes={{
            root: "table-root",
            rows: (datum, index) => `${datum.word}-${index}-example`,
          }}
          highlightedRowId={tableOptions.highlightedRowId}
          onHighlightRow={this.handleHighlight}
        />
        <ExampleBlock strongHeader="Table Options " content={this.state.tableOptions} />
      </div>
    );
  }
}

<ExampleWrapper>
  <TestLargeSimpleTable />
</ExampleWrapper>;
```
