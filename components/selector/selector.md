### Example

```js
class SelectorDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "" };
	}

	render() {
		const { value } = this.state;
		const data = [{ key: "key1", text: "Hello" }, { key: "key2", text: "World" }];
		const onSelect = value => {
			this.setState({ value });
		};
		return <Selector data={data} name="selector" value={value} onSelect={onSelect} defaultDisplayText="Choose" />;
	}
}

<SelectorDemo />;
```

```js
class SelectorDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "key1" };
	}

	render() {
		const { value } = this.state;
		const data = [{ key: "key1", text: "Hello" }, { key: "key2", text: "World" }];
		const onSelect = value => {
			this.setState({ value });
		};
		return <Selector data={data} name="selector" value="key1" defaultDisplayText="Choose" />;
	}
}

<SelectorDemo />;
```

```js
class SelectorDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "key1" };
	}

	render() {
		const { value } = this.state;
		const data = [];
		const onSelect = value => {
			this.setState({ value });
		};
		return <Selector data={data} name="selector" value={value} onSelect={onSelect} defaultDisplayText="Choose" />;
	}
}

<SelectorDemo />;
```
