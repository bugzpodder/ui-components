## Example

### Default

```js
import { ExampleBlock, ExampleWrapper, COUNTRY_NAMES } from "../test-utils";
import { useState } from "react";
import { CommonSuggest } from "./";

const SuggestExample = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <CommonSuggest
        id="country-chooser"
        placeholder="Suggest a country"
        suggestions={COUNTRY_NAMES}
        value={value}
        onChange={setValue}
      />
      <ExampleBlock strongHeader="state " content={value} />
    </>
  );
};

<ExampleWrapper>
  <SuggestExample />
</ExampleWrapper>;
```

### Actions

```js
import { ExampleBlock, ExampleWrapper, COUNTRY_NAMES } from "../test-utils";
import { useState } from "react";
import { CommonSuggest } from "./";
import Typography from "@material-ui/core/Typography";

const SuggestExample = () => {
  const [value, setValue] = useState("");
  const [showHidden, setShowHidden] = useState(false);

  const actions = [
    <Typography
      variant="caption"
      style={{ cursor: "pointer" }}
      onClick={() => {
        setShowHidden(true);
      }}
    >
      View All
    </Typography>,
  ];

  return (
    <>
      <CommonSuggest
        id="country-chooser-with-actions"
        placeholder="Suggest a country"
        suggestions={showHidden ? COUNTRY_NAMES : COUNTRY_NAMES.slice(0, 4)}
        value={value}
        onChange={c => {
          setValue(c);
          setShowHidden(false);
        }}
        actions={!showHidden && actions}
      />
      <ExampleBlock strongHeader="state " content={value} />
    </>
  );
};

<ExampleWrapper>
  <SuggestExample />
</ExampleWrapper>;
```
