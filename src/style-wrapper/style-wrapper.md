## Example

```js
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
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
      <Alert className={styles.spacing} severity="success">
        Success!
      </Alert>
      <Alert className={styles.spacing} severity="info">
        Info!
      </Alert>
      <Alert className={styles.spacing} severity="warning">
        Warning!
      </Alert>
      <Alert className={styles.spacing} severity="error">
        Error!
      </Alert>
    </div>
  </StyleWrapper>
);

<ExampleApp />;
```
