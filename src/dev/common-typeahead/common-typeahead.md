## Example

### Default

```js
const { useState, Fragment } = require("react");
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");

const TypeaheadExample = () => {
  const [value, setValue] = useState("");

  const handleChange = (suggestion) => {
    setValue(suggestion.value);
  }

    return (
      <Fragment>
        <CommonTypeahead placeholder="Choose A Country" suggestions={COUNTRIES} onChange={handleChange} />
        <ExampleBlock strongHeader="value " content={value} />
      </Fragment>
    );
}

<ExampleWrapper>
  <TypeaheadExample>
</ExampleWrapper>;
```

### Creatable

```js
const { Fragment } = require("react");
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");

const TypeaheadExample = () => {
  const [value, setValue] = useState("");

  const handleChange = (suggestion) => {
    setValue(suggestion.value);
  }
    return (
      <Fragment>
        <CommonTypeahead
          selectType="creatable"
          placeholder="Create or Choose"
          suggestions={COUNTRIES}
          onChange={handleChange}
        />
        <ExampleBlock strongHeader="value " content={value} />
      </Fragment>
    );
}

<ExampleWrapper>
  <TypeaheadExample>
</ExampleWrapper>;
```

### Asynchronous

```js
const { useState, Fragment } = require("react");
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");

const TypeaheadExample = () => {
  const [value, setValue] = useState("");

  const handleChange = (suggestion) => {
    setValue(suggestion.value);
  }

const TypeaheadExample = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(COUNTRIES.slice(0, 5));

  const handleChange = (suggestion) => {
    setValue(suggestion.value);
  }

  const filterCountries = (inputValue) => {
    return new Promise(resolve => {
      const newCountries = COUNTRIES
        .filter(country => country.label.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 5);
      setTimeout(() => {
        setCountries(newCountries);
        resolve(newCountries);
      }, 500);
    });
  }

  render() {
    return (
      <Fragment>
        <CommonTypeahead
          placeholder="Choose A Country"
          selectType="async"
          suggestions={countries}
          updateSuggestions={filterCountries}
          onChange={handleChange}
        />
        <ExampleBlock strongHeader="value " content={{ value, countries }} />
      </Fragment>
    );
  }
}

<ExampleWrapper>
  <TypeaheadExample>
</ExampleWrapper>;
```

### Multiselect

```js
const { Fragment } = require("react");
const { COUNTRIES, ExampleBlock, ExampleWrapper } = require("../test-utils");

const TypeaheadExample = () => {
  const [values, setValues] = useState(["Bermuda"]);

  const handleChange = selections => {
    setValues(selections.map(selection => selection.value));
  };

  return (
    <Fragment>
      <CommonTypeahead
        isMulti={true}
        fullWidth={true}
        placeholder="Choose Some COUNTRIES"
        suggestions={COUNTRIES}
        onChange={handleChange}
        value={values}
      />
      <ExampleBlock strongHeader="values " content={values} />
    </Fragment>
  );
};

<TypeaheadExample />;
```

### Controlled Value

```js
const { Fragment } = require("react");
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");

const TypeaheadExample = () => {
  const [value, setValue] = useState("Bermuda");

  const onChange = (suggestion) => {
    setValue(suggestion.value);
  }

    return (
      <Fragment>
        <CommonTypeahead
          placeholder="Choose A Country"
          suggestions={COUNTRIES}
          value={value}
          onChange={onChange}
        />
        <ExampleBlock strongHeader="value " content={value} />
      </Fragment>
    );
}

<ExampleWrapper>
  <TypeaheadExample>
</ExampleWrapper>;
```
