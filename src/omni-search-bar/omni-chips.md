### Example

```js
const ExampleBlock = require("@grail/components").ExampleBlock;
const ExampleWrapper = require("@grail/components").ExampleWrapper;

const {
  OMNI_TEXT_SEARCH_TYPE,
  DATETIME_SEARCH_TYPE,
  FULL_TEXT_SEARCH_TYPE,
  MULTI_FIELD_TEXT_SEARCH_TYPE,
  OMNI_KEY,
  OMNI_DELETE_COMMAND,
} = require("@grail/lib");
const { OmniChips } = require("./index");

const initialSearchOptions = [
  {
    name: OMNI_KEY,
    type: OMNI_TEXT_SEARCH_TYPE,
    searchFields: ["label", "samples.label", "samples.previousLabel"],
    values: ["omni value"],
  },
  {
    name: "Labels",
    type: MULTI_FIELD_TEXT_SEARCH_TYPE,
    searchFields: ["label"],
    values: ["labels value"],
  },
  {
    name: "Operation Time",
    type: DATETIME_SEARCH_TYPE,
    searchFields: ["operationTime"],
    values: ["2018-04-20", "2019-04-20"],
  },
  {
    name: "Status",
    type: FULL_TEXT_SEARCH_TYPE,
    searchFields: ["status"],
    values: ["status value"],
  },
];

class OmniChipsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchOptions: initialSearchOptions };
    this.addOmniSearchCommand = this.addOmniSearchCommand.bind(this);
  }
  addOmniSearchCommand({ command, omniFieldName }) {
    console.log(command, omniFieldName);
    if (command === OMNI_DELETE_COMMAND) {
      this.setState(({ searchOptions }) => {
        searchOptions = searchOptions.filter(({ name }) => omniFieldName !== name);
        return { searchOptions };
      });
    }
  }
  render() {
    return (
      <div>
        <OmniChips searchOptions={this.state.searchOptions} addOmniSearchCommand={this.addOmniSearchCommand} />
        <ExampleBlock strongHeader="State" content={this.state} />
      </div>
    );
  }
}

<ExampleWrapper>
  <OmniChipsContainer />
</ExampleWrapper>;
```
