### Example

```js
const { ExampleBlock, ExampleWrapper } = require("../test-utils");
const { wrapPickerUtilProvider } = require("@grail/components");
const { useState } = require("react");
const {
  OMNI_TEXT_SEARCH_TYPE,
  DATETIME_SEARCH_TYPE,
  FULL_TEXT_SEARCH_TYPE,
  LIKE_TEXT_SEARCH_TYPE,
  OMNI_KEY,
} = require("@grail/lib");

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

const ExampleApp = wrapPickerUtilProvider(() => {
  const [searchOptions, setSearchOptions] = useState([]);

  return (
    <div>
      <OmniSearchBar searchDefs={searchDefs} setSearchOptions={setSearchOptions}>
        Children here appear in the dropdown
      </OmniSearchBar>
      <ExampleBlock strongHeader="State" content={searchOptions} />
    </div>
  );
});

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```
