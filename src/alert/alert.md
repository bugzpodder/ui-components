## Examples

```js
const styles = require("@grail/components/src/utils/example-styles.module.scss");
<div className={styles.container}>
	<h2> Default </h2>
	<Alert className={styles.spacing} color="success" message="This is successful!" />
	<Alert className={styles.spacing} color="info" message="This is some info!" />
	<Alert className={styles.spacing} color="warning" message="This is a warning!" />
	<Alert className={styles.spacing} message="This is an error!" />
	<br />
	<h2> Flat </h2>
	<Alert className={styles.spacing} variant="flat" color="success" message="This is successful!" />
	<Alert className={styles.spacing} variant="flat" color="info" message="This is some info!" />
	<Alert className={styles.spacing} variant="flat" color="warning" message="This is a warning!" />
	<Alert className={styles.spacing} variant="flat" message="This is an error!" />
</div>;
```
