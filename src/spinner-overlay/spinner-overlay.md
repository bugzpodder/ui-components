### Example

**NOTE**: `SpinnerOverlay` container must specify a non static position, e.g. `position: relative;`.

```js
import Button from "@material-ui/core/Button";
import styles from "../test-utils/example-styles.module.scss";
import { SpinnerOverlay } from "./";
import { CommonCard } from "../";

const SpinnerOverlayExample = () => (
  <div className={styles.spinnerContainer}>
    <CommonCard title="Spinning on a Sub Component" className="main-container">
      <div className={styles.buttonContainer}>
        <Button color="primary" variant="contained" className={styles.spacing}>
          Try
        </Button>
        <SpinnerOverlay />
      </div>
      <Button color="secondary" variant="contained" className={styles.spacing}>
        Clicking
      </Button>
      <Button color="default" variant="contained" className={styles.spacing}>
        These
      </Button>
    </CommonCard>
  </div>
);

<SpinnerOverlayExample />;
```

```js
import Button from "@material-ui/core/Button";
import styles from "../test-utils/example-styles.module.scss";
import { SpinnerOverlay } from "./";
import { CommonCard } from "../";

const SpinnerOverlayExample = () => (
  <div className={styles.spinnerContainer}>
    <CommonCard
      title="Spinning on the Whole Component"
      className="main-container"
    >
      <Button color="primary" variant="contained" className={styles.spacing}>
        Try
      </Button>
      <Button color="secondary" variant="contained" className={styles.spacing}>
        Clicking
      </Button>
      <Button color="default" variant="contained" className={styles.spacing}>
        These
      </Button>
    </CommonCard>
    <SpinnerOverlay />
  </div>
);

<SpinnerOverlayExample />;
```
