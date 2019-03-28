###### Optional

- Any props for a Material UI Button will take, such as `className`

### Example

```js
const ExampleWrapper = require("../test-utils").ExampleWrapper;
const ExternalLinkButton = require("./external-link-button");

<ExampleWrapper>
  <ExternalLinkButton variant="contained" color="primary" href="https://www.grail.com">
    GRAIL Link in new tab
  </ExternalLinkButton>
</ExampleWrapper>;
```
