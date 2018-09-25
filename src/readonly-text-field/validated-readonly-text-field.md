### Example

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid>yes</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid={false}>no</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
<ExampleWrapper>
  <ValidatedReadOnlyTextField isNA>N/A</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```
