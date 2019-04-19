### Example

```js
const { ExampleWrapper } = require("../test-utils");
const moment = require("moment");

<ExampleWrapper>
  <div>
    <DateValue value="2019-03-12" />
  </div>
  <div>
    <DateValue value="2019-03-13T16:00Z" />
  </div>
  <div>
    <DateValue value={moment("2019-03-14")} />
  </div>
  <div>
    <DateValue value={moment("2019-03-15T16:00Z")} />
  </div> 
</ExampleWrapper>;
```
