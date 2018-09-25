### Example

```js
const ExampleBlock = require("@grail/components").ExampleBlock;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const EXAMPLE_TABLE_DATA = require("@grail/components/src/utils").EXAMPLE_TABLE_DATA;

class TestSimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableOptions: {
        sortOptions: [{ id: "name", desc: false }],
        selectedRowIds: [],
      },
      data: EXAMPLE_TABLE_DATA,
    };

    this.compare = this.compare.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSort = this.handleSort.bind(this);
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
          onSelect={this.handleSelection}
          selectedRows={tableOptions.selectedRowIds}
          onSort={this.handleSort}
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
  <TestSimpleTable />
</ExampleWrapper>;
```
