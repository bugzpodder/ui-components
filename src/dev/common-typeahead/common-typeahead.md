## Example

### Default

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;

// countries returns an array of { label: COUNTRY_NAME, value: COUNTRY_NAME } objects;
const countries = require("../../utils/constants").COUNTRIES;

class TypeaheadExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(suggestion) {
		this.setState({ value: suggestion.value });
	}

	render() {
		return (
			<Fragment>
				<CommonTypeahead placeholder="Choose A Country" suggestions={countries} onChange={this.handleChange} />
				<ExampleBlock strongHeader="value " content={this.state.value} />
			</Fragment>
		);
	}
}

<TypeaheadExample />;
```

### Creatable

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;

// countries returns an array of { label: COUNTRY_NAME, value: COUNTRY_NAME } objects;
const countries = require("../../utils/constants").COUNTRIES;

class TypeaheadExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(suggestion) {
		this.setState({ value: suggestion.value });
	}

	render() {
		return (
			<Fragment>
				<CommonTypeahead
					selectType="creatable"
					placeholder="Create or Choose"
					suggestions={countries}
					onChange={this.handleChange}
				/>
				<ExampleBlock strongHeader="value " content={this.state.value} />
			</Fragment>
		);
	}
}

<TypeaheadExample />;
```

### Asynchronous

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;

// countries returns an array of { label: COUNTRY_NAME, value: COUNTRY_NAME } objects;
const countries = require("../../utils/constants").COUNTRIES;

class TypeaheadExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(suggestion) {
		this.setState({ value: suggestion.value });
	}

	filterCountries(inputValue) {
		return countries.filter(country => country.label.toLowerCase().includes(inputValue.toLowerCase()));
	}

	render() {
		return (
			<Fragment>
				<CommonTypeahead
					placeholder="Choose A Country"
					selectType="async"
					loadOptions={(inputValue, callback) => callback(this.filterCountries(inputValue))}
					onChange={this.handleChange}
				/>
				<ExampleBlock strongHeader="value " content={this.state.value} />
			</Fragment>
		);
	}
}

<TypeaheadExample />;
```

### Multiselect

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;

// countries returns an array of { label: COUNTRY_NAME, value: COUNTRY_NAME } objects;
const countries = require("../../utils/constants").COUNTRIES;

class TypeaheadExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: [],
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(selections) {
		const values = selections.map(selection => selection.value);
		this.setState({ values });
	}

	render() {
		return (
			<Fragment>
				<CommonTypeahead
					isMulti={true}
					fullWidth={true}
					placeholder="Choose Some Countries"
					suggestions={countries}
					onChange={this.handleChange}
				/>
				<ExampleBlock strongHeader="values " content={this.state.values} />
			</Fragment>
		);
	}
}

<TypeaheadExample />;
```
