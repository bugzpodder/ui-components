### Example

```js
const Button = require("@material-ui/core/Button").default;
const styles = { mainCard: "mainCard", contentCard: "contentCard" };
<CommonCard
	title="New Instrument"
	subheader="This is a subheader"
	className={styles.mainCard}
	contentClass={styles.contentCard}
	headerActions={[<Button>First</Button>, <Button>Second</Button>]}
	footerActions={<Button>OK</Button>}
	cardActions={[<Button>Third</Button>]}
>
	Your Card's content goes here, ideally in a Grid for easier styling
</CommonCard>;
```
