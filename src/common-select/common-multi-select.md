## Example

### Default

```js
const ExampleBlock = require("@grail/components").ExampleBlock;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const Fragment = require("react").Fragment;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;
const styles = require("../utils/example-styles.module.scss");

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    this.setState({ values });
  }

  render() {
    return (
      <Fragment>
        <CommonMultiSelect
          placeholder="Choose A Country"
          values={this.state.values}
          options={countries}
          onChange={this.handleChange}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Creatable

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ExampleBlock = require("@grail/components").ExampleBlock;
const Fragment = require("react").Fragment;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;
const styles = require("../utils/example-styles.module.scss");

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    this.setState({ values });
  }

  render() {
    return (
      <Fragment>
        <CommonMultiSelect
          selectType="creatable"
          placeholder="Create or Choose"
          createMessage={inputValue => `Invent a new country called "${inputValue}"`}
          options={countries}
          values={this.state.values}
          onChange={this.handleChange}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Asynchronous

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ExampleBlock = require("@grail/components").ExampleBlock;
const Fragment = require("react").Fragment;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;
const styles = require("../utils/example-styles.module.scss");

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterCountries = this.filterCountries.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ values: countries.slice(4, 7) }), 1200);
  }

  handleChange(values) {
    this.setState({ values });
  }

  filterCountries(inputValue) {
    return new Promise(resolve => {
      const newCountries = countries
        .filter(country => country.label.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 5);
      setTimeout(() => resolve(newCountries), 500);
    });
  }

  render() {
    return (
      <Fragment>
        <CommonMultiSelect
          isFullWidth
          placeholder="Choose A Country"
          selectType="async"
          values={this.state.values}
          initialOptions={countries.slice(5, 10)}
          initialMessage="Think of a country between A and B..."
          loadOptions={this.filterCountries}
          onChange={this.handleChange}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Custom

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ExampleBlock = require("@grail/components").ExampleBlock;
const Chip = require("@material-ui/core/Chip").default;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;
const styles = require("../utils/example-styles.module.scss");

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    this.setState({ values });
  }

  render() {
    return (
      <div className={styles.selectContainer}>
        <CommonMultiSelect
          classes={{
            root: styles.commonSelect,
          }}
          isFullWidth
          placeholder="Choose A Country"
          values={this.state.values}
          options={countries.map(country => ({ ...country, info: ["country", "place", "region"] }))}
          onChange={this.handleChange}
          formatOption={item => (
            <div>
              <span>{item.label}</span>
              <div>{item.info.map(info => <Chip label={info} />)}</div>
            </div>
          )}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </div>
    );
  }
}

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```
