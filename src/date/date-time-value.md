### Example

```js
import { ExampleWrapper } from "../test-utils";
import moment from "moment";
import { DateTimeValue } from "./";
<ExampleWrapper>
  <div>
    <DateTimeValue value="2019-03-12T16:00Z" />
  </div>
  <div>
    <DateTimeValue value="2019-03-13" />
  </div>
  <div>
    <DateTimeValue value={moment("2019-03-14T16:00Z")} />
  </div>
  <div>
    <DateTimeValue value={moment("2019-03-15")} />
  </div>
</ExampleWrapper>;
```
