### Example

```js
import { ExampleWrapper } from "../test-utils";
import { ValidatedReadOnlyTextField } from "./";
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid>yes</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
import { ExampleWrapper } from "../test-utils";
import { ValidatedReadOnlyTextField } from "./";
<ExampleWrapper>
  <ValidatedReadOnlyTextField isValid={false}>no</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```

```js
import { ExampleWrapper } from "../test-utils";
import { ValidatedReadOnlyTextField } from "./";
<ExampleWrapper>
  <ValidatedReadOnlyTextField isNA>N/A</ValidatedReadOnlyTextField>
</ExampleWrapper>;
```
