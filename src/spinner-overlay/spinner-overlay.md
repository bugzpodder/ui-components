### Example

```js
const Fragment = require("react").Fragment;
const Button = require("@material-ui/core/Button").default;
const styles = require("@grail/components/src/utils/example-styles.module.scss");

class SpinnerOverlayExample extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				<CommonCard
					title="New Instrument"
					subheader="This is a subheader"
					className="main-container"
					contentClass="content-container"
					headerActions={
						<Fragment>
							<Button>First</Button>
							<Button color="primary" variant="raised">
								Second
							</Button>
						</Fragment>
					}
					footerActions={<Button>OK</Button>}
				>
					<Button color="primary" variant="raised" className={styles.spacing}>
						Try
					</Button>
					<Button color="secondary" variant="raised" className={styles.spacing}>
						Clicking
					</Button>
					<Button color="default" variant="raised" className={styles.spacing}>
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
