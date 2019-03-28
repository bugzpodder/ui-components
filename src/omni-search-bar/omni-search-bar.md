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
} = require("@grail/lib");
const { OmniSearchBar } = require("./index");

const searchDefs = [
  {
    name: OMNI_KEY,
    type: OMNI_TEXT_SEARCH_TYPE,
    searchFields: ["label", "samples.label", "samples.previousLabel"],
  },
  {
    name: "Labels",
    type: LIKE_TEXT_SEARCH_TYPE,
    searchFields: ["label"],
  },
  {
    name: "Operation Time",
    type: DATETIME_SEARCH_TYPE,
    searchFields: ["operationTime"],
  },
  {
    name: "Status",
    type: FULL_TEXT_SEARCH_TYPE,
    searchFields: ["status"],
  },
];

class OmniSearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchOptions: [] };
    this.onChange = this.onChange.bind(this);
  }
  onChange({ searchOptions }) {
    console.log(searchOptions);
    this.setState({ searchOptions });
  }
  render() {
    return (
      <div>
        <OmniSearchBar searchDefs={searchDefs} setSearchOptions={this.onChange}>
          Children here appear in the dropdown
        </OmniSearchBar>
        <ExampleBlock strongHeader="State" content={this.state} />
      </div>
    );
  }
}
const ExampleApp = require("../date-input/picker-util-provider-hoc").wrapPickerUtilProvider(OmniSearchBarContainer);

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```
