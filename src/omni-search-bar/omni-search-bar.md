## Overview

`OmniSearchBar` is a fairly complex component - managing state from several sources - `props`, `url`, `localStorage`.

In order to keep things sane, we made a design decision to handle state changes via commands/events and callbacks.

Omnibar is the central manager of search options state - notifying apps via callbacks when a user makes a change, or when URL changes, or on load, based on `localStorage`. URL takes priority over `localStorage`.

If an external component needs to update state, `OmniSearchBar` processes a queue of commands. For example, you can use `OmniChip` to send a command to this queue, allowing the user to delete a search param. It can also be used to do other updates.

As an example, LIMS implementation wraps `OmniSearchBar` with redux to manage app state.

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
