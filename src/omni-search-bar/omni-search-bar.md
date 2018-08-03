### Example

```js
const {
  setSearchOptionsFromOmni,
  setOmniFromSearchOptions,
  DATETIME_SEARCH_TYPE,
  FULL_TEXT_SEARCH_TYPE,
  MULTI_FIELD_TEXT_SEARCH_TYPE,
} = require("@grail/lib");
const { OmniSearchBar } = require("./index");

const searchOptions = new Map()
  .set("labels", {
    type: MULTI_FIELD_TEXT_SEARCH_TYPE,
    value: "",
    searchFields: ["label", "samples.label", "samples.previousLabel"],
  })
  .set("operationTime", {
    type: DATETIME_SEARCH_TYPE,
    values: [],
  })
  .set("status", {
    type: FULL_TEXT_SEARCH_TYPE,
    values: [],
    isCustomRendered: true,
  });
const omniSearch = {
  text: "",
  key: "omni",
  defaultField: "labels",
  excludedFields: new Set(["status"]),
  placeholder: "Search or specify a field",
  aliases: new Map().set("labels", new Set(["label"])).set("operationTime", new Set(["from", "to"])),
};
const state = { searchOptions, omniSearch };
const onChange = (id, values) => {
  if (id === omniSearch.key) {
    state.omniSearch.text = values;
    setSearchOptionsFromOmni(state.omniSearch.state.searchOptions);
  } else {
    const searchOption = state.searchOptions.get(id);
    if (searchOption) {
      const optionValue = searchOption.value;
      const optionValues = searchOption.values;
      if (optionValue) {
        searchOption.value = values;
      } else if (optionValues) {
        searchOption.values = values;
      }
      setOmniFromSearchOptions(omniSearch, searchOptions);
    }
  }
};

<OmniSearchBar searchOptions={searchOptions} omniSearch={omniSearch} onChange={onChange}>
  Children here appear in the dropdown
</OmniSearchBar>;
```
