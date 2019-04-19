### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grail/components`;

```js
const { wrapPickerUtilProvider } = require("@grail/components");
const { ExampleWrapper } = require("../test-utils");
const { useState } = require("react");

// You must wrap your app in the wrapPickerUtilProvider below
const ExampleApp = wrapPickerUtilProvider(() => {
  const [value, setValue] = useState("");
  return (
    <div>
      <DateTimeInput value={value} onChange={setValue} label="Date & Time" />
    </div>
  );
});

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```
