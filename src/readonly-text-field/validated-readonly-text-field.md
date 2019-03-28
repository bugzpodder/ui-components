### Example

```js
const ExampleWrapper = require("../test-utils").ExampleWrapper;
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid>yes</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
const ExampleWrapper = require("../test-utils").ExampleWrapper;
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid={false}>no</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
const ExampleWrapper = require("../test-utils").ExampleWrapper;
<ExampleWrapper>
  <ValidatedReadOnlyTextField isNA>N/A</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```
