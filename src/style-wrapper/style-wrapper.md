## Example

```js
const StyleWrapper = require("@grail/components").StyleWrapper;
const Button = require("@material-ui/core/Button").default;
const Alert = require("@grail/components").Alert;
const styles = require("../utils/example-styles.module.scss");

class ExampleApp extends React.Component {
  render() {
    return (
      <StyleWrapper>
        <div className={styles.container}>
          <Button className={styles.spacing} variant="raised" color="primary">
            Primary
          </Button>
          <Button className={styles.spacing} variant="raised" color="secondary">
            Secondary
          </Button>
          <Button className={styles.spacing} variant="raised" color="default">
            Default
          </Button>
          <Alert className={styles.spacing} color="success" message="Success!" />
          <Alert className={styles.spacing} color="info" message="Info!" />
          <Alert className={styles.spacing} color="warning" message="Warning!" />
          <Alert className={styles.spacing} color="error" message="Error!" />
        </div>
      </StyleWrapper>
    );
  }
}

<ExampleApp />;
```
