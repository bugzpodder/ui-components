### Example

```js
import { ExampleWrapper } from "../test-utils";
import { DateTimeValue } from "./";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";
const DateTimeValueContainer = wrapPickerUtilProvider(DateTimeValue);

<ExampleWrapper>
  <div>
    <DateTimeValueContainer value="2019-03-12T16:00Z" />
  </div>
  <div>
    <DateTimeValueContainer value="2019-03-13" />
  </div>
  <div>
    <DateTimeValueContainer value={new Date("2019-03-14T16:00Z")} />
  </div>
  <div>
    <DateTimeValueContainer value={new Date("2019-03-15")} />
  </div>
</ExampleWrapper>;
```
