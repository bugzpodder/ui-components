### Example

```js
import styles from "../test-utils/example-styles.module.scss";
import { ExampleWrapper } from "../test-utils";
import { MemoryRouter } from "react-router-dom";
import { LinkButton } from "./";

<ExampleWrapper>
  <div className={styles.container}>
    <MemoryRouter>
      <LinkButton href="some-page" color="primary">
        This link probably goes nowhere
      </LinkButton>
    </MemoryRouter>
  </div>
</ExampleWrapper>;
```
