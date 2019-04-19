### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grail/components`;

```js
const Typography = require("@material-ui/core/Typography").default;
const styles = require("../test-utils/example-styles.module.scss");
const { ExampleWrapper } = require("../test-utils");
const { wrapPickerUtilProvider } = require("@grail/components");
const { useState } = require("react");

// You must wrap your app in the wrapPickerUtilProvider.
const ExampleApp = wrapPickerUtilProvider(() => {
  const [dateOne, setDateOne] = useState("");
  const [dateTwo, setDateTwo] = useState("");

  return (
    <div className={styles.container}>
      <Typography>
        Labels will persist above the input field, while placeholders will disappear upon selecting a value
      </Typography>
      <DateInput className={styles.spacing} value={dateOne} onChange={setDateOne} label="Release Date" />
      <DateInput value={dateTwo} onChange={setDateTwo} placeholder="Release Date" className={styles.spacing} />
    </div>
  );
});

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```
