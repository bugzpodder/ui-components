### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grailbio/components`;

```js
import Typography from "@material-ui/core/Typography";
import styles from "../test-utils/example-styles.module.scss";
import { ExampleWrapper, ExampleBlock } from "../test-utils";
import { wrapPickerUtilProvider } from "@grailbio/components";
import { useState } from "react";
import { TimeInput } from "./";

// You must wrap your app in the wrapPickerUtilProvider.
const ExampleApp = wrapPickerUtilProvider(() => {
  const [timeOne, setTimeOne] = useState("");
  const [timeTwo, setTimeTwo] = useState("");

  return (
    <div className={styles.container}>
      <Typography>
        Labels will persist above the input field, while placeholders will disappear upon selecting a value
      </Typography>
      <TimeInput className={styles.spacing} value={timeOne} onChange={setTimeOne} label="Release Time" />
      <ExampleBlock content={timeOne} />
      <TimeInput value={timeTwo} onChange={setTimeTwo} placeholder="Release Time" className={styles.spacing} />
      <ExampleBlock content={timeTwo} />
    </div>
  );
});

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```

Old Picker:

```js
import Typography from "@material-ui/core/Typography";
import styles from "../test-utils/example-styles.module.scss";
import { ExampleWrapper, ExampleBlock } from "../test-utils";
import { wrapPickerUtilProvider } from "@grailbio/components";
import { useState } from "react";
import { TimeInput } from "./";

// You must wrap your app in the wrapPickerUtilProvider.
const ExampleApp = wrapPickerUtilProvider(() => {
  const [timeOne, setTimeOne] = useState("");
  const [timeTwo, setTimeTwo] = useState("");

  return (
    <div className={styles.container}>
      <Typography>
        Labels will persist above the input field, while placeholders will disappear upon selecting a value
      </Typography>
      <TimeInput className={styles.spacing} value={timeOne} onChange={setTimeOne} label="Release Time" useOldPicker />
      <ExampleBlock content={timeOne} />
      <TimeInput
        value={timeTwo}
        onChange={setTimeTwo}
        placeholder="Release Time"
        className={styles.spacing}
        useOldPicker
        format="hh:mm A"
        ampm
      />
      <ExampleBlock content={timeTwo} />
    </div>
  );
}, true);

<ExampleWrapper>
  <ExampleApp />
</ExampleWrapper>;
```
