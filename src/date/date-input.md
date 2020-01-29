### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grailbio/components`;

```js
import MomentUtils from "@date-io/moment";
import Typography from "@material-ui/core/Typography";
import styles from "../test-utils/example-styles.module.scss";
import { ExampleWrapper, ExampleBlock } from "../test-utils";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";
import { useState } from "react";
import { DateInput } from "./";

// You must wrap your app in the wrapPickerUtilProvider.
const ExampleApp = wrapPickerUtilProvider(() => {
  const [dateOne, setDateOne] = useState("2018-08-23");
  const [dateTwo, setDateTwo] = useState("2018-10-03");

  return (
    <div className={styles.container}>
      <Typography>
        Labels will persist above the input field, while placeholders will
        disappear upon selecting a value
      </Typography>
      <DateInput
        format="DD-MM-YYYY"
        className={styles.spacing}
        value={dateOne}
        onChange={setDateOne}
        label="Release Date"
      />
      <ExampleBlock content={dateOne} />
      <DateInput
        value={dateTwo}
        onChange={setDateTwo}
        placeholder="Release Date"
        className={styles.spacing}
      />
      <ExampleBlock content={dateTwo} />
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
import Typography from "@material-ui/core/Typography";
import styles from "../test-utils/example-styles.module.scss";
import { ExampleWrapper, ExampleBlock } from "../test-utils";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";
import { useState } from "react";
import { DateInput } from "./";

// You must wrap your app in the wrapPickerUtilProvider.
const ExampleApp = wrapPickerUtilProvider(
  () => {
    const [dateOne, setDateOne] = useState("2019-09-28");
    const [dateTwo, setDateTwo] = useState("2017-10-29");

    return (
      <div className={styles.container}>
        <Typography>
          Labels will persist above the input field, while placeholders will
          disappear upon selecting a value
        </Typography>
        <DateInput
          className={styles.spacing}
          useOldPicker
          value={dateOne}
          onChange={setDateOne}
          label="Release Date"
          format="DD-MMM-YYYY"
          mask={[
            /\d/,
            /\d/,
            "-",
            /\w/,
            /\w/,
            /\w/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
        />
        <ExampleBlock content={dateOne} />
        <DateInput
          value={dateTwo}
          useOldPicker
          onChange={setDateTwo}
          placeholder="Release Date"
          className={styles.spacing}
        />
        <ExampleBlock content={dateTwo} />
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
