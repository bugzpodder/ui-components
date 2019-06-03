### Example

```js
import { ExampleWrapper } from "../test-utils";
import moment from "moment";
import { HumanizedDateTime } from "./";
<ExampleWrapper>
  <div>
    <HumanizedDateTime value="2019-03-12" />
  </div>
  <div>
    <HumanizedDateTime value="2019-03-13T16:00Z" />
  </div>
  <div>
    <HumanizedDateTime value={moment("2019-03-14")} />
  </div>
  <div>
    <HumanizedDateTime value={moment("2019-03-15T16:00Z")} />
  </div>
</ExampleWrapper>;
```
