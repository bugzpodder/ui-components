### Example

```js
const { ExampleWrapper } = require("../test-utils");
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid>yes</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
const { ExampleWrapper } = require("../test-utils");
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid={false}>no</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
const { ExampleWrapper } = require("../test-utils");
<ExampleWrapper>
  <ValidatedReadOnlyTextField isNA>N/A</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```
