### Example

```js
class TimelineGraphExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedRowIndex: 0 };
	}
	render() {
		return (
			<TimelineGraph
				rows={[
					{
						date: "2016-04-20T16:20:00+11:00",
						columns: [["Column 0, Field 0"], ["Column 1, Field 0", "Column 1, Field 1"]],
					},
					{
						date: "2017-04-20T16:20:00+11:00",
						columns: [["Tea time"]],
					},
					{
						date: "2018-04-20T16:20:00+11:00",
						columns: [["Party time"]],
					},
				]}
				dateFormat="YYYY-MM-DD"
				selectedRowIndex={this.state.selectedRowIndex}
				onSelectRow={selectedRowIndex => this.setState({ selectedRowIndex })}
				cardWidth="wide"
				cardHeight="tall"
			/>
		);
	}
}

<TimelineGraphExample />;
```
