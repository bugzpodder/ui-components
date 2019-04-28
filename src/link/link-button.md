### Example

```js
const styles = require("../test-utils/example-styles.module.scss");
const { ExampleWrapper } = require("../test-utils");
const { MemoryRouter } = require("react-router-dom");
// TODO(ecarrel): remove this rename once styleguide is fixed. Its necessary because otherwise I get a
//  "SyntaxError: Identifier 'LinkButton' has already been declared" error.
const { LinkButton: LinkButton2 } = require("./");

const LinkButtonExample = () => (
  <div className={styles.container}>
    <MemoryRouter>
      <LinkButton2 href="some-page" color="primary">
        This link probably goes nowhere
      </LinkButton2>
    </MemoryRouter>
  </div>
);

<ExampleWrapper>
  <LinkButtonExample />
</ExampleWrapper>;
```
