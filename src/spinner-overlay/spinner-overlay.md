### Example

**NOTE**: `SpinnerOverlay` container must specify a non static position, e.g. `position: relative;`.

```js
const Fragment = require("react").Fragment;
const Button = require("@material-ui/core/Button").default;
const styles = require("../test-utils/example-styles.module.scss");

class SpinnerOverlayExample extends React.Component {
  render() {
    return (
      <div className={styles.spinnerContainer}>
        <CommonCard title="Spinning on a Sub Component" className="main-container" contentClass="content-container">
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
  }
}

<SpinnerOverlayExample />;
```

```js
const Fragment = require("react").Fragment;
const Button = require("@material-ui/core/Button").default;
const styles = require("../test-utils/example-styles.module.scss");

class SpinnerOverlayExample extends React.Component {
  render() {
    return (
      <div className={styles.spinnerContainer}>
        <CommonCard title="Spinning on the Whole Component" className="main-container" contentClass="content-container">
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
  }
}

<SpinnerOverlayExample />;
```
