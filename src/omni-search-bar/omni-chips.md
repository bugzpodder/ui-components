### Example

```js
const { ExampleBlock, ExampleWrapper } = require("../test-utils");
const { useState } = require("react");
const {
  OMNI_TEXT_SEARCH_TYPE,
  DATETIME_SEARCH_TYPE,
  FULL_TEXT_SEARCH_TYPE,
  LIKE_TEXT_SEARCH_TYPE,
  OMNI_KEY,
  SET_OMNI_FIELD_COMMAND,
} = require("@grail/lib");

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

const OmniChipsContainer = () => {
  const [searchOptions, setSearchOptions] = useState(initialSearchOptions);

  const addOmniSearchCommand = ({ command, omniFieldName, omniValues }) => {
    console.log(command, omniFieldName, omniValues);
    if (command === SET_OMNI_FIELD_COMMAND) {
      setSearchOptions(searchOptions => {
        const newOptions = searchOptions
          .map(searchOption => {
            let { name, values } = searchOption;
            if (omniFieldName === name) {
              values = omniValues;
            }
            return { ...newOptions, values };
          })
          .filter(({ values }) => values && values.length);
        return newOptions;
      });
    }
  };

  return (
    <div>
      <OmniChips searchOptions={searchOptions} addOmniSearchCommand={addOmniSearchCommand} />
      <ExampleBlock strongHeader="State" content={searchOptions} />
    </div>
  );
};

<ExampleWrapper>
  <OmniChipsContainer />
</ExampleWrapper>;
```
