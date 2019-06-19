### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grail/components`;

```js
import { wrapPickerUtilProvider } from "@grail/components";
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
});

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```

Old Picker:

```js
import { wrapPickerUtilProvider } from "@grail/components";
import { ExampleWrapper, ExampleBlock } from "../test-utils";
import { useState } from "react";
import { DateTimeInput } from "./";

// You must wrap your app in the wrapPickerUtilProvider below
const ExampleApp = wrapPickerUtilProvider(() => {
  const [value, setValue] = useState("");
  return (
    <div>
      <DateTimeInput useOldPicker value={value} onChange={setValue} label="Date & Time" />
      <ExampleBlock content={value} />
    </div>
  );
}, true);

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```
