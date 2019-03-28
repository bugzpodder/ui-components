### Example

```js
const ExampleBlock = require("../test-utils").ExampleBlock;
const ExampleWrapper = require("../test-utils").ExampleWrapper;

const {
  OMNI_TEXT_SEARCH_TYPE,
  DATETIME_SEARCH_TYPE,
  FULL_TEXT_SEARCH_TYPE,
  LIKE_TEXT_SEARCH_TYPE,
  OMNI_KEY,
  SET_OMNI_FIELD_COMMAND,
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
    type: LIKE_TEXT_SEARCH_TYPE,
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
    values: ["status value", "Another Value"],
  },
];

class OmniChipsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchOptions: initialSearchOptions };
    this.addOmniSearchCommand = this.addOmniSearchCommand.bind(this);
  }
  addOmniSearchCommand({ command, omniFieldName, omniValues }) {
    console.log(command, omniFieldName, omniValues);
    if (command === SET_OMNI_FIELD_COMMAND) {
      this.setState(({ searchOptions }) => {
        searchOptions = searchOptions
          .map(searchOption => {
            let { name, values } = searchOption;
            if (omniFieldName === name) {
              values = omniValues;
            }
            return { ...searchOption, values };
          })
          .filter(({ values }) => values && values.length);
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
