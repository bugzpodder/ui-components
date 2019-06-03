## Examples

```js
import { ExampleWrapper } from "../test-utils";
import styles from "../test-utils/example-styles.module.scss";
import { Alert } from "./";
<ExampleWrapper>
  <div className={styles.container}>
    <h2> Default </h2>
    <Alert className={styles.spacing} color="success" message="This is successful!" />
    <Alert className={styles.spacing} color="info" message="This is some info!" />
    <Alert className={styles.spacing} color="warning" message="This is a warning!" />
    <Alert className={styles.spacing} message="This is an error!" />
    <br />
    <h2> Flat </h2>
    <Alert className={styles.spacing} variant="text" color="success" message="This is successful!" />
    <Alert className={styles.spacing} variant="text" color="info" message="This is some info!" />
    <Alert className={styles.spacing} variant="text" color="warning" message="This is a warning!" />
    <Alert className={styles.spacing} variant="text" message="This is an error!" />
  </div>
</ExampleWrapper>;
```
