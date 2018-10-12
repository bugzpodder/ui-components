### Example

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;
const EXAMPLE_TABLE_DATA = require("@grail/components/src/utils").EXAMPLE_TABLE_DATA;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const Button = require("@material-ui/core/Button").default;

class TestPagedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableOptions: {
        offset: 0,
        count: 25,
        sortOptions: [{ id: "name", desc: false }],
        selectedRowIds: [],
        highlightedRowId: null,
      },
      data: EXAMPLE_TABLE_DATA,
    };

    this.compare = this.compare.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
  }

  handlePageChange(params) {
    const { offset, count } = params;
    const tableOptions = {
      ...this.state.tableOptions,
      offset,
      count,
    };
    this.setState({ tableOptions });
  }

  handleSelection(selectedRowIds) {
    const tableOptions = { ...this.state.tableOptions, selectedRowIds };
    this.setState({ tableOptions });
  }

  handleSort(params) {
    const { sortOptions } = params;
    const tableOptions = {
      ...this.state.tableOptions,
      sortOptions,
    };
    this.setState({ tableOptions }, () => {
      const data = this.state.data.sort(this.compare);
      this.setState({ data });
    });
  }

  compare(a, b) {
    const desc = this.state.tableOptions.sortOptions[0].desc;
    const sortParam = this.state.tableOptions.sortOptions[0].id;
    const first = a[sortParam].toLowerCase();
    const second = b[sortParam].toLowerCase();
    if (first === second) {
      return 0;
    }
    if (desc) {
      return first > second ? -1 : 1;
    }
    return first < second ? -1 : 1;
  }
  
  handleHighlight(highlightedRowId) {
    const tableOptions = {
      ...this.state.tableOptions,
      highlightedRowId
    };
    this.setState({ tableOptions })
  }

  render() {
    const { data, tableOptions } = this.state;
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
        <Button variant="raised" color="primary">
          First Action
        </Button>
      </Fragment>
    );
    return (
      <div>
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
          onPageChange={this.handlePageChange}
          onSelect={this.handleSelection}
          selectedRows={tableOptions.selectedRowIds}
          onSort={this.handleSort}
          highlightedRowId={tableOptions.highlightedRowId}
          onHighlightRow={this.handleHighlight}
        />
        <ExampleBlock
          strongHeader="Selected Rows"
          helperText=" (using idKey) "
          content={this.state.tableOptions.selectedRowIds}
        />
      </div>
    );
  }
}

<ExampleWrapper>
  <TestPagedTable />
</ExampleWrapper>;
```
