### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grailbio/components`;

```js
import MomentUtils from "@date-io/moment";
import { wrapPickerUtilProvider } from "../";
import { ExampleWrapper, ExampleBlock } from "../test-utils";
import { useState } from "react";
import { DateTimeInput } from "./";

// You must wrap your app in the wrapPickerUtilProvider below
const ExampleApp = wrapPickerUtilProvider(() => {
  const [value, setValue] = useState("");
  return (
    <div>
      <DateTimeInput value={value} onChange={setValue} label="Date & Time" />
      <ExampleBlock content={value} />
    </div>
  );
}, MomentUtils);

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```

Old Picker:

```js
import MomentUtils from "@date-io/moment";
import { wrapPickerUtilProvider } from "../";
import { ExampleWrapper, ExampleBlock } from "../test-utils";
import { useState } from "react";
import { DateTimeInput } from "./";

// You must wrap your app in the wrapPickerUtilProvider below
const ExampleApp = wrapPickerUtilProvider(
  () => {
    const [value, setValue] = useState("");
    return (
      <div>
        <DateTimeInput
          useOldPicker
          value={value}
          onChange={setValue}
          label="Date & Time"
        />
        <ExampleBlock content={value} />
      </div>
    );
  },
  MomentUtils,
  true,
);

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```
