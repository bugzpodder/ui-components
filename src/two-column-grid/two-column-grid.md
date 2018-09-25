### Example

```js
const Typography = require("@material-ui/core/Typography").default;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
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
];

<ExampleWrapper>
  <TwoColumnGrid labelWidth={2} rows={rows} />
</ExampleWrapper>;
```

```js
const Typography = require("@material-ui/core/Typography").default;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const rows = [
  {
    label: "Label 4",
    value: <Typography>Value 4</Typography>,
  },
  {
    label: "Label 5",
    value: <Typography>Value 5</Typography>,
  },
  {
    label: "Label 6",
    value: <Typography>Value 6</Typography>,
  },
];

<ExampleWrapper>
  <TwoColumnGrid textAlign={["left", "right"]} rows={rows} />
</ExampleWrapper>;
```

```js
const Typography = require("@material-ui/core/Typography").default;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const rows = [
  {
    label: "Label 7",
    value: <Typography>Value 7</Typography>,
  },
  {
    label: "Label 8",
    value: <Typography>Value 8</Typography>,
  },
  {
    label: "Label 9",
    value: <Typography>Value 9</Typography>,
  },
];

<ExampleWrapper>
  <TwoColumnGrid textAlign={[null, "center"]} rows={rows} />
</ExampleWrapper>;
```
