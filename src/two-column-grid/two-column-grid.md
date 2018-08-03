### Example

```js
const Typography = require("@material-ui/core/Typography").default;
const rows = [
  {
    label: "Label 1",
    value: <Typography>Value 1</Typography>,
  },
  {
    label: "Label 2",
    value: <Typography>Value 2</Typography>,
  },
  {
    label: "Label 3",
    value: <Typography>Value 3</Typography>,
  },
  {
    label: "Label 4",
    value: <Typography>Value 4</Typography>,
  },
];

<TwoColumnGrid labelWidth={2} rows={rows} />;
```
