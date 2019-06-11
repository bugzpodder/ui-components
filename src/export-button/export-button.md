## Examples

```js
import { ExampleWrapper } from "../test-utils";
import { ExportButton } from "./";

const data = [
  {
    columnOne: "First Datum",
    columnTwo: "Second Datum",
    columnThree: "Third Datum",
  },
  {
    columnOne: "Fourth Datum",
    columnTwo: "Fifth Datum",
    columnThree: "Sixth Datum",
  },
  {
    columnOne: "Seventh Datum",
    columnTwo: "Eighth Datum",
    columnThree: "Ninth Datum",
  },
  {
    columnOne: "Tenth Datum",
    columnTwo: "Eleventh Datum",
    columnThree: "Twelfth Datum",
  },
  {
    columnOne: "Thirteenth Datum",
    columnTwo: "Fifteenth Datum",
    columnThree: "Sixteenth Datum",
  },
  {
    columnOne: "Seventeenth Datum",
    columnTwo: "Eighteenth Datum",
    columnThree: "Ninteenth Datum",
  },
];

const columns = [
  {
    exportHeaderName: "Column One",
    exportAccessor: "columnOne",
  },
  {
    exportHeaderName: "Column Two",
    exportAccessor: "columnTwo",
  },
  {
    exportHeaderName: "Column 3",
    exportAccessor: instance => instance.columnThree,
  },
];

<ExampleWrapper>
  <ExportButton columns={columns} visibleRows={data} filenamePrefix="example-data" />
</ExampleWrapper>;
```
