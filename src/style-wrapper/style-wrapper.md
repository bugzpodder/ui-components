## Example

```js
import Button from "@material-ui/core/Button";
import { Alert } from "@grailbio/components";
import styles from "../test-utils/example-styles.module.scss";
import { StyleWrapper } from "./";

const ExampleApp = () => (
  <StyleWrapper>
    <div className={styles.container}>
      <Button className={styles.spacing} variant="contained" color="primary">
        Primary
      </Button>
      <Button className={styles.spacing} variant="contained" color="secondary">
        Secondary
      </Button>
      <Button className={styles.spacing} variant="contained" color="default">
        Default
      </Button>
      <Alert className={styles.spacing} color="success" message="Success!" />
      <Alert className={styles.spacing} color="info" message="Info!" />
      <Alert className={styles.spacing} color="warning" message="Warning!" />
      <Alert className={styles.spacing} color="error" message="Error!" />
    </div>
  </StyleWrapper>
);

<ExampleApp />;
```
