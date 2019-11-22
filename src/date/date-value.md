### Example

```js
import { ExampleWrapper } from "../test-utils";
import { DateValue } from "./";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";
const DateValueContainer = wrapPickerUtilProvider(DateValue);

<ExampleWrapper>
  <div>
    <DateValueContainer value="2019-03-12" />
  </div>
  <div>
    <DateValueContainer value="2019-03-13T16:00Z" />
  </div>
  <div>
    <DateValueContainer value={new Date("2019-03-14")} />
  </div>
  <div>
    <DateValueContainer value={new Date("2019-03-15T16:00Z")} />
  </div>
</ExampleWrapper>;
```
