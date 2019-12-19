### Example

```js
import MomentUtils from "@date-io/moment";
import { ExampleWrapper } from "../test-utils";
import { HumanizedDateTime } from "./";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";
const HumanizedDateTimeContainer = wrapPickerUtilProvider(
  HumanizedDateTime,
  MomentUtils,
);

<ExampleWrapper>
  <div>
    <HumanizedDateTimeContainer value="2019-03-12" />
  </div>
  <div>
    <HumanizedDateTimeContainer value="2019-03-13T16:00Z" />
  </div>
  <div>
    <HumanizedDateTimeContainer value={new Date("2019-03-14")} />
  </div>
  <div>
    <HumanizedDateTimeContainer value={new Date("2019-03-15T16:00Z")} />
  </div>
</ExampleWrapper>;
```
