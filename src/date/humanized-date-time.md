### Example

```js
const { ExampleWrapper } = require("../test-utils");
const moment = require("moment");

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
