### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grail/components`;

```js
const Typography = require("@material-ui/core/Typography").default;
const styles = require("@grail/components/src/utils/example-styles.module.scss");

class ExampleAppComponents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateOne: "",
			dateTwo: "",
		};
		this.handleFirst = this.handleFirst.bind(this);
		this.handleSecond = this.handleSecond.bind(this);
	}

	handleFirst(dateOne) {
		this.setState({ dateOne });
	}

	handleSecond(dateTWo) {
		this.setState({ dateTWo });
	}

	render() {
		return (
			<div className={styles.container}>
				<Typography>
					Labels will persist above the input field, while placeholders will disappear upon selecting a value
				</Typography>
				<DateInput
					className={styles.spacing}
					value={this.state.dateOne}
					onChange={this.handleFirst}
					label="Release Date"
				/>
				<DateInput
					value={this.state.dateTwo}
					onChange={this.handleSecond}
					placeholder="Release Date"
					className={styles.spacing}
				/>
			</div>
		);
	}
}

const ExampleApp = require("./picker-util-provider-hoc").wrapPickerUtilProvider(ExampleAppComponents);

<ExampleApp />;
```
