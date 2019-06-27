## Example

### Default

```js
import { ExampleBlock, ExampleWrapper, COUNTRY_NAMES } from "../test-utils";
import { Fragment, useState } from "react";
import { CommonSuggest } from "./";

const SuggestExample = () => {
  const [value, setValue] = useState("");
  return (
    <Fragment>
      <CommonSuggest
        id="country-chooser"
        placeholder="Suggest a country"
        suggestions={COUNTRY_NAMES}
        value={value}
        onChange={setValue}
      />
      <ExampleBlock strongHeader="state " content={value} />
    </Fragment>
  );
};

<ExampleWrapper>
  <SuggestExample />
</ExampleWrapper>;
```

```

```
